import React , { useEffect } from 'react';
import { connect } from 'react-redux';
import { initialiseAnecdotes } from './reducers/anecdoteReducer';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import Filter from './components/Filter';

const App = (props) => {

    useEffect(() => {
        props.initialiseAnecdotes()
    }, [props]);

    return (
        <>  
            <h1>Programming Anecdotes</h1>
            <Notification />
            <Filter />
            <AnecdoteList />
            <AnecdoteForm />
        </>
    );
};

const mapDispatchToProps = {
    initialiseAnecdotes
}

export default connect(null, mapDispatchToProps)(App);