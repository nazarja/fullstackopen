import React from 'react';

const Anecdote = ({ anecdote }) => {
    return (
        <div>
            <p>{anecdote.content}</p>
            <p>Has {anecdote.votes} votes</p>
            <p>Author: {anecdote.author}</p>
            <p>For more info see: {anecdote.info}</p>
        </div>
    )
};

export default Anecdote;