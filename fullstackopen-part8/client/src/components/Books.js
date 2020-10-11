import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            author {
                name
            }
            published
            genres
        }
    }
`;

const Books = props => {
    const books = useQuery(ALL_BOOKS);
    const [genres, setGenres] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState(null);

    useEffect(() => {
        if (books.data) {
            setFilteredBooks(books.data.allBooks.map(book => {
                book.genres.forEach(genre => {
                    if (!genres.includes(genre)) setGenres(genres.concat(genre))
                });
                return book;
            }))
        }
    }, [books.data, genres])

    if (!props.show) return null;
    else if (books.loading) return <div>loading ...</div>;

    const filterBooksByGenre = filter => {
        setFilteredBooks(books.data.allBooks.filter(book => book.genres.includes(filter)));
    }

    const allBooks = () => {
        setFilteredBooks(books.data.allBooks.map(book => book))
    };

    return (
        <>
            <h3>Books</h3>
            <table>
                <thead>
                    <tr>
                        <th>title</th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredBooks.map((book, i) => {
                            return (
                                <tr key={`book-${i}`}>
                                    <td>{book.title}</td>
                                    <td>{book.author.name}</td>
                                    <td>{book.published}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <br />
            <div>
                <h3>Genres</h3>
                {
                    genres.map(g => <button key={g} onClick={() => filterBooksByGenre(g)}>{g}</button>)
                }
                <button onClick={() => allBooks()}>All Genres</button>
            </div>
        </>
    );
};

export default Books;