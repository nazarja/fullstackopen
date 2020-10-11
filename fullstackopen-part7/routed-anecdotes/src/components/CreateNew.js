import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

let CreateNew = ({ anecdotes, setAnecdotes, history, setNotification }) => {
	
	const [anecdote, setAnecdote] = useState({
		id: 0,
		author: '',
		content: '',
		info: ''
	});

	let handleSubmit = event => {
		event.preventDefault();
		const id = (Math.random() * 10000).toFixed(0);
		setAnecdotes(anecdotes.concat({ ...anecdote, id, votes: 0 }));
		setNotification(`A new anecdote: ${anecdote.content}`)
		setTimeout(() => setNotification(''), 1000);
		history.push('/');
	};

	return (
		<div>
			<h2>Create A New Anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="content">content</label>
					<input
						name="content"
						value={ anecdote.content }
						onChange={({target}) => setAnecdote({...anecdote, content: target.value})}
					/>
					</div>
					<div>
					<label htmlFor="author">author</label>
					<input
						name="author"
						value={ anecdote.author }
						onChange={({target}) => setAnecdote({...anecdote, author: target.value})}
					/>
					</div>
					<div>
					<label htmlFor="info">url</label>
					<input
						name="info"
						value={ anecdote.info }
						onChange={({target}) => setAnecdote({...anecdote, info: target.value})}
					/>
				</div>
				<button>create</button>
			</form>
		</div>
    );
};

CreateNew = withRouter(CreateNew);
export default CreateNew;