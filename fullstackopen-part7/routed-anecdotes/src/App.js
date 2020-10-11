import React, { useState } from 'react';
import  { BrowserRouter, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Anecdote from './components/Anecdote';
import AnecdoteList from './components/AnecdoteList';
import About from './components/About';
import CreateNew from './components/CreateNew';
import Footer from './components/Footer';
import Notification from './components/Notification';

const App = (props) => {
	const [notification, setNotification] = useState('');
	const [anecdotes, setAnecdotes] = useState(props.anecdotes);
	const anecdoteById = id => anecdotes.find(a => a.id === id);
	
	return (
		<div>
			<h1>Software Anecdotes</h1>
			<BrowserRouter>
				<Menu />
				<Notification notification={notification} />
				<Route exact path="/" render={() => <AnecdoteList anecdotes={anecdotes} setAnecdotes={setAnecdotes} anecdoteById={anecdoteById}/>} />
				<Route path="/create" render={() => <CreateNew anecdotes={anecdotes} setAnecdotes={setAnecdotes} setNotification={setNotification} /> } />
				<Route path="/about" render={() => <About /> } />
				<Route path="/anecdotes/:id" render={({ match }) => <Anecdote anecdote={anecdoteById(match.params.id)}/>} />
			</BrowserRouter>
			<Footer />
		</div>
	);
};

export default App;