import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const initalAnecdotes = [
    {
        content: 'If it hurts, do it more often',
        author: 'Jez Humble',
        info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
        votes: 0,
        id: '1'
    },
    {
        content: 'Premature optimization is the root of all evil',
        author: 'Donald Knuth',
        info: 'http://wiki.c2.com/?PrematureOptimization',
        votes: 0,
        id: '2'
    }
];

ReactDOM.render(<App anecdotes={initalAnecdotes}/>, document.querySelector('#root'));
