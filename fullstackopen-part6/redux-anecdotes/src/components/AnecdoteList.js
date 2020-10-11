import React from 'react';
import { connect } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { voteNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {

    const vote = (object) => {
        props.voteAnecdote(object);
        props.voteNotification(object.content, 5000);
    };

    return (
        <div>
            <h1>Anecdotes</h1>
            {
                props.anecdotesToShow.map(anecdote =>                
                    <div key={anecdote.id}>
                        <p>{anecdote.content}</p>
                        <p>
                            {anecdote.votes} votes -- &nbsp;
                            <button onClick={() => vote(anecdote)}>vote</button>
                        </p>
                        <hr />
                    </div>
                )
            }
        </div>
    );
};

const anecdotesToShow = ({anecdotes, filter}) => 
    anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())
);

const mapStateToProps = state => {
    return {
        anecdotesToShow: anecdotesToShow(state) 
    };
}

const mapDispatchToProps = {
    voteAnecdote,
    voteNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
