import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { ALL_AUTHORS } from './Authors';

const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
        }
    }
`;

const BirthYear = props => {
    const defaultAuthor = props.authors.data.allAuthors[0].name;
    const [name, setName] = useState(defaultAuthor);
    const [bornOn, setBornOn] = useState('');
    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    });

    const handleSubmit = async event => {
        event.preventDefault();
        await editAuthor({ variables: { name, setBornTo: +bornOn } });
        setName(defaultAuthor)
        setBornOn('')
    };

    return (
        <div>
            <h3>Set BirthYear</h3>
            <form onSubmit={(event) => handleSubmit(event)}>
                <select onChange={({ target }) => setName(target.value)}>
                    {
                        props.authors.data.allAuthors.map(author => {
                            return (
                                <option key={author.id} value={author.name}>{author.name}</option>
                            )
                        })
                    }
                </select>
                <label htmlFor="bornOn">Born on:</label>
                <input type="number" name="bornOn" onChange={({ target }) => setBornOn(target.value)} value={bornOn} required />
                <button>Update Author</button>
            </form>
        </div>
    );
};

export default BirthYear



