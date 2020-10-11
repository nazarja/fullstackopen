import React, { useState } from 'react';
import { useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { ALL_BOOKS } from './Books';
import { ALL_AUTHORS } from './Authors';

const CREATE_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author {
          name
          born
      }
    }
  }
`;

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        author {
            name
            born
        } 
        published
        genres
    }
`;

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  
${BOOK_DETAILS}
`;

const NewBook = props => {
    const client = useApolloClient();
    const [errorMessage, setErrorMessage] = useState(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [published, setPublished] = useState('');
    const [genres, setGenres] = useState([]);

    const notify = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 10000);
    };
    
    const handleError = (error) => {
        setErrorMessage(error.message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 10000)
    }

    const [addBook] = useMutation(CREATE_BOOK, {
        refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
        onError: handleError,
        update: (store, response) => {
            updateCacheWith(response.data.addBook);
        }
    });

    const updateCacheWith = (addedBook) => {
        const includedIn = (set, object) => {
            console.log(object, addedBook)
            return set.map(p => p.id).includes(object.id);
        }
        const dataInStore = client.readQuery({ query: ALL_BOOKS })
        if (!includedIn(dataInStore.allBooks, addedBook)) {
            dataInStore.allBooks.push(addedBook);
            client.writeQuery({
                query: ALL_BOOKS,
                data: dataInStore
            });
        };
    };

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const addedBook = subscriptionData.data.bookAdded
            notify(`${addedBook.title} added`);
            updateCacheWith(addedBook);
        }
    });

    const errorNotification = () => errorMessage &&
        <div style={{ color: 'red' }}>
            {errorMessage}
        </div>

    if (!props.show) return null;

    const handleSubmit = async (event) => {
        event.preventDefault();
        await addBook({ variables: { title, author, published, genres } });
        setTitle('');
        setAuthor('');
        setPublished('');
        setGenres([]);
    };

    const addGenre = (target) => {
        const genre = target.previousElementSibling;
        setGenres(genres.concat(genre.value));
    };

    return (
        <>
            {errorNotification()}
            <h3>NewBook</h3>
            <form onSubmit={(event) => handleSubmit(event)}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" value={title} onChange={({ target }) => setTitle(target.value)} required />
                <label htmlFor="author">Author</label>
                <input type="text" name="author" value={author} onChange={({ target }) => setAuthor(target.value)} required />
                <label htmlFor="published">Published</label>
                <input type="number" name="published" value={published} onChange={({ target }) => setPublished(+target.value)} required />
                <label htmlFor="genre">Add Genre</label>
                <input name="genre" type="text" required />
                <span id="genreButton" htmlFor="addGenre" onClick={({ target }) => addGenre(target)}>Add</span>
                <p>{genres.map(g => `${g}, `)}</p>
                <button type="submit">Create Book</button>
            </form>
        </>
    );
};

export default NewBook;