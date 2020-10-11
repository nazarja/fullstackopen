import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import noteService from './services/notes';
import loginService from './services/login';
import Notification from './components/Notification';
import Footer from './components/Footer';


const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('a new note ...');
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        noteService
            .getAll()
            .then(res => setNotes(res));
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            noteService.setToken(user.token);
        }
    }, []);


    const addNote = (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
            id: notes.length + 1
        }

        noteService
            .create(noteObject)
            .then(res => {
                setNotes(notes.concat(noteObject));
                setNewNote('');
            });
    };

    const toggleImportance = id => {
        const note = notes.find(n => n.id === id);
        const changedNote = { ...note, important: !note.important };

        noteService
            .update(id, changedNote)
            .then(res => {
                setNotes(
                    notes.map(
                        note => note.id !== id
                            ? note
                            : res
                    )
                );
            })
            .catch(error => {
                setErrorMessage(`Note ${note.content} was already removed from the server`);
                setTimeout(() => setErrorMessage(null), 5000);
                setNotes(notes.filter(n => n.id !== id));
            });
    };

    const removeNote = id => {
        noteService
            .remove(id)
            .then(res => {
                setNotes(notes.filter(note => note.id !== id))
            });
    };

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important);

    const handleNoteChange = (event) => setNewNote(event.target.value);

    const rows = () => {
        return notesToShow.map(note =>
            <Note
                key={note.id}
                note={note}
                toggleImportance={() => toggleImportance(note.id)}
                removeNote={() => removeNote(note.id)}
            />);
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({ username, password });

            window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user));

            noteService.setToken(user.token)
            setUser(user);
            setUsername('');
            setPassword('');
        }
        catch (err) {
            setErrorMessage('Wrong Credentials');
            setTimeout(() => { setErrorMessage(null) }, 5000);
        }
    };

    const loginForm = () => (
        <>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username-input">username</label> &nbsp;
                    <input
                        id="username-input"
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                    <br />
                    <label htmlFor="password-input">password</label> &nbsp;
                    <input
                        id="password-input"
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    );

    const noteForm = () => (
        <>
            <h2>Create New Note</h2>
            <form onSubmit={addNote}>
                <input type="text" value={newNote} onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>
        </>
    );

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            {user === null
                ? loginForm()
                :
                <div>
                    <p>{user.name} logged in</p>
                    {noteForm()}
                </div>
            }
            <br />
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    {showAll ? 'show important' : 'show all'}
                </button>
            </div>
            <ul>
                {rows()}
            </ul>
            <Footer />
        </div>
    )
}

export default App;