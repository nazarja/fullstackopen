import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { ALL_BOOKS } from './Books';

export const ME = gql`
    query {
        me {
            username
            favouriteGenre
        }
    }
`;

const Recommended = props => {
    const me = useQuery(ME);
    const books = useQuery(ALL_BOOKS);
    const [filteredBooks, setFilteredBooks] = useState(null);

    useEffect(() => {
        if (books.data && me.data) {
            setFilteredBooks(books.data.allBooks.filter(book => book.genres.includes(me.data.me.favouriteGenre)));
        }
    }, [books.data, me.data])

    if (!props.show) return null;
    else if (me.loading) return <div>loading ...</div>;

    return (
        <>
            <h4>Books from my favoutite genre</h4>
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
        </>
    );
};

export default Recommended;