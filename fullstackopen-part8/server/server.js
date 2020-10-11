const config = require('./config/config');
const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server');
const uuid = require('uuid/v1');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Book = require('./models/bookModel');
const Author = require('./models/authorModel');
const User = require('./models/userModel');
const pubsub = new PubSub();

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.info('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err.message));

const typeDefs = gql`
    type User {
        username: String!
        favouriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Author {
        name: String!
        born: Int
        bookCount: Int!
        id: ID!
        books: [Book!]!
    }  

    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ) : Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ) : Author
        createUser(
            username: String!
            favouriteGenre: String!
        ) : User
        login(
            username: String!
            password: String!
        ) : Token
    }

    type Subscription {
        bookAdded : Book!
    }
`;

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            let books = await Book.find({});

            if (args.genre && args.author) {
                books = books.filter(book => book.genres.includes(args.genre));
                const author = await Author.findOne({ name: args.author });
                books = books.filter(book => {
                    return book.author.equals(author._id);
                });
            }
            else if (args.genre) {
                books = books.filter(book => book.genres.includes(args.genre));
            }
            else if (args.author) {
                const author = await Author.findOne({ name: args.author });
                books = books.filter(book => {
                    return book.author.equals(author._id);
                });
            };

            return books.map(async book => {
                return {
                    title: book.title,
                    published: book.published,
                    genres: book.genres,
                    author: await Author.findById(book.author)
                }
            });
        },
        allAuthors: async () => {
            const authors = await Author.find({}).populate('books');
            return authors.map(async author => {
                return {
                    name: author.name,
                    born: author.born,
                    id: author.id,
                    bookCount: await Book.find({ author: author.id }).countDocuments()
                };
            });
        },
        me: (root, args, context) => {
            return context.currentUser;
        },
    },
    Mutation: {
        addBook: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            };

            let author = await Author.findOne({ name: args.author });
            if (!author) {
                author = await new Author({ name: args.author });
                await author.save();
            }

            const book = new Book({ ...args, author });
            try {
                await book.save();
            }
            catch (err) {
                throw new AuthenticationError(err.message);
            }

            pubsub.publish('BOOK_ADDED', { bookAdded: book });
            return book;
        },
        editAuthor: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            };
            
            let author = await Author.findOne({ name: args.name })
            if (!author) throw new AuthenticationError('Author not found');
            author.born = args.setBornTo;
            await author.save();
            return author;
        },
        createUser: (root, args) => {
            const user = new User({ username: args.username, favouriteGenre: args.favouriteGenre });
            return user.save()
                .catch(err => {
                    throw new UserInputError(error.message, {invalidArgs: args,});
                });            
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username });
            if (!user || args.password !== 'password') {
                throw new UserInputError("wrong credentials");
            };
            const userForToken = {
                username: user.username,
                id: user._id,
            };

            return { value: jwt.sign(userForToken, config.JWT_SECRET )};
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET);
            const currentUser = await User.findById(decodedToken.id);
            return { currentUser };
        };

    }
});

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`);
    console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});