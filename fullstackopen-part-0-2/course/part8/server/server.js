const config = require('./config/config');
const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server');
const uuid = require('uuid/v1');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Person = require('./models/personModel');
const User = require('./models/userModel');
const { PubSub } = require('apollo-server');
const pubsub = new PubSub();

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.info('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err.message));

const typeDefs = gql`

    type Mutation {
        addPerson(
            name: String!
            phone: String
            street: String!
            city: String!
        ) : Person
        editNumber(
            name: String!
            phone: String!
        ) : Person
        createUser(
            username: String!
        ) : User
        login(
            username: String!
            password: String!
        ) : Token
        addAsFriend(
            name: String!
        ) : User
    }

    type User {
        username: String!
        friends: [Person!]!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Address {
        street: String!
        city: String! 
    }

    type Person {
        name: String!
        phone: String
        address: Address!
        id: ID!
    }

    enum YesNo {
        YES
        NO
    }

    type Query {
        personCount: Int!
        allPersons(phone: YesNo): [Person!]!
        findPerson(name: String!) : Person
        me: User
    }

    type Subscription {
        personAdded : Person!
    }
`;

const resolvers = {
    Query: {
        personCount: () => Person.collection.countDocuments(),
        allPersons: (root, args) => {
            if (!args.phone) {
                return Person.find({})
            }

            return Person.find({ phone: { $exists: args.phone === 'YES' } });
        },
        findPerson: (root, args) => Person.findOne({ name: args.name }),
        me: (root, args, context) => {
            return context.currentUser;
        }
    },
    Person: {
        address: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        }
    },
    Mutation: {
        addPerson: async (root, args, context) => {
            const person = new Person({ ...args });
            const currentUser = context.currentUser;
            if (!currentUser) {
                throw new AuthenticationError("not authenticated");
            };

            try {
                await person.save();
                currentUser.friends = currentUser.friends.concat(person);
                await currentUser.save();
            }
            catch (err) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            };
            pubsub.publish('PERSON_ADDED', { personAdded: person });

            return person;
        },
        editNumber: async (root, args) => {
            const person = await Person.findOne({ name: args.name });
            person.phone = args.phone;
            try {
                await person.save();
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            };
            return person;
        },
        createUser: (root, args) => {
            const user = new User({ username: args.username });

            return user.save()
                .catch(err => {
                    throw new UserInputError(error.message, {invalidArgs: args,});
                });
        },
        login: async (root, args) => { 
            const user = await User.findOne({ username: args.username });
            if (!user || args.password !== 'secret') {
                throw new UserInputError("wrong credentials");
            };

            const userForToken = {
                username: user.username,
                id: user._id
            };

            return { value: jwt.sign(userForToken, config.JWT_SECRET)}
        },
        addAsFriend: async (root, args, { currentUser }) => {
            const nonFriendAlready = (person) => {
                return !currentUser.friends.map(f => f._id).includes(person._id);
            };

            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            };

            const person = await Person.findOne({name: args.name});
            if ( nonFriendAlready(person) ) {
                currentUser.friends = currentUser.friends.concat(person);
            };

            await currentUser.save();
            return currentUser;
        }
    },
    Subscription: {
        personAdded: {
            subscribe: () => pubsub.asyncIterator(['PERSON_ADDED'])
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        const auth = req ? req.headers.authorization : null;
        if  (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken  =jwt.verify(auth.substring(7), config.JWT_SECRET);
            console.log(decodedToken)
            const currentUser = await User.findById(decodedToken.id).populate('friends');
            return { currentUser };
        };

    }
});

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`);
    console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});