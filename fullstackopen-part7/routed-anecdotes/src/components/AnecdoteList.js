import React from 'react';
import { Link } from 'react-router-dom';

const AnecdoteList = ({ anecdotes, setAnecdotes, anecdoteById }) => {

    const vote = id => {
		const anecdote = anecdoteById(id);
		const voted = { ...anecdote, votes: anecdote.votes + 1 };
		setAnecdotes(anecdotes.map(a => a.id === id ? voted : a));
    };
    
    return (
        <div>
            <h2>Anecdotes</h2>
            <ul> 
                { 
                    anecdotes.map(anecdote => 
                        <Link key={anecdote.id} to={`/anecdotes/${anecdote.id}`}>
                            <li>{anecdote.content}</li>
                        </Link>
                    ) 
                } 
            </ul>
        </div>
    )
};

export default AnecdoteList;