import React from 'react';
import { connect } from 'react-redux';
import { newAnecdote } from '../reducers/anecdoteReducer';
import { newNotification } from '../reducers/notificationReducer';

const AnecdoteForm = props => {

    const handleSubmit = async event => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        props.newAnecdote(content);
        props.newNotification(content, 5000);
    };

    return (
        <div>
            <h2>Create New Anecdote</h2>
            <form onSubmit={event => handleSubmit(event)}>
                <input type="text" name="anecdote" />
                <br />
                <button type="submit" >Submit</button>
            </form>
        </div>
    );
};

const mapDispatchToProps = {
    newAnecdote,
    newNotification
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);