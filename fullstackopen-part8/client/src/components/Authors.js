import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import BirthYear from './BirthYear';

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
            id
            books {
                title
            }
        }
    }
`;

const Authors = props => {
    const authors = useQuery(ALL_AUTHORS);

    if (!props.show) return null;
    else if (authors.loading) return <div>loading ...</div>;

    return (
        <>
            <h3>Authors</h3>
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        authors.data.allAuthors.map(author =>
                            <tr key={author.id}>
                                <td>{author.name}</td>
                                <td>{author.born}</td>
                                <td>{author.bookCount}</td>
                            </tr>
                    )}
                </tbody>
            </table>
            {
                props.token === null
                    ? null
                    : <BirthYear authors={authors} />

            }
        </>
    );
};

export default Authors;