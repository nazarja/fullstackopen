import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Form, Container, Menu, Message } from 'semantic-ui-react';
import styled from 'styled-components';

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`
const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`

const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`

const Home = () => {
	return (
		<div>
			<h2>TKTL notes app</h2>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
		</div>
	);
};

const Note = ({ note }) => {
	return (
		<div>
			<h2>{note.content}</h2>
			<p>{note.user}</p>
			<p><strong>{note.important ? 'important' : 'not important'}</strong></p>
		</div>
	)
};

const Notes = (props) => {
	return (
		<div>
			<h2>Notes</h2>
			<Table striped>
				<tbody>
					{
						props.notes.map(note =>
							<tr key={note.id}>
								<td>
									<Link to={`/notes/${note.id}`}>{note.content}</Link>
								</td>
								<td>
									{note.user}
								</td>
							</tr>
						)
					}
				</tbody>
			</Table>
		</div>
	);
};

const Users = () => {
	return (
		<div>
			<h2>Users</h2>
			<ul>
				<li>Matti Luukkainen</li>
				<li>Juha Tauriainen</li>
				<li>Arto Hellas</li>
			</ul>
		</div>
	);
};

let Login = (props) => {

	const onSubmit = event => {
		event.preventDefault();
		props.onLogin('mluukkai');
		props.history.push('/')
	};

	return (
		<Form onSubmit={onSubmit}>
			<Form.Field>
				<label>username</label>
				<input name="username" />
			</Form.Field>
			<Form.Field>
				<label>password</label>
				<input type="password" />
			</Form.Field>
			<Button type="submit">login</Button>
		</Form>
	);
};

Login = withRouter(Login)

function App() {
	const [notes, setNotes] = useState([
		{
			id: 1,
			content: 'HTML on helppoa',
			important: true,
			user: 'Matti Luukkainen'
		},
		{
			id: 2,
			content: 'Selain pystyy suorittamaan vain javascriptiä',
			important: false,
			user: 'Matti Luukkainen'
		},
		{
			id: 3,
			content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
			important: true,
			user: 'Arto Hellas'
		}
	]);

	const [user, setUser] = useState(null);
	const [message, setMessage] = useState(null)

	const login = user => {
		setUser(user);
		setMessage(`welcome ${user}`);
		setTimeout(() => {
			setMessage(null);
		}, 10000);
	};

	const noteById = id => notes.find(note => note.id === +id);

	const padding = { padding: 5 };

	return (
		<Page>
			<Router>
				<div>
					<Navigation>
						<Link style={padding} to="/">home</Link>
						<Link style={padding} to="/notes">notes</Link>
						<Link style={padding} to="/users">users</Link>
						{user
							? <em>{user} logged in</em>
							: <Link to="/login">login</Link>
						}
					</Navigation>

					<Route exact path="/" render={() => <Home />} />
					<Route exact path="/notes" render={() =>
						<Notes notes={notes} />}
					/>
					<Route exact path="/notes/:id" render={({ match }) =>
						<Note note={noteById(match.params.id)} />}
					/>
					<Route path="/users" render={() =>
						user ? <Users /> : <Redirect to="/login" />
					} />
					<Route path="/login" render={() =>
						<Login onLogin={login} />}
					/>
				</div>
			</Router>
			<Footer>
				<em>Note app, Department of Computer Science 2019</em>
			</Footer>
		</Page>
	);
}

export default App;
