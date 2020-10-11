import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import noteService from './services/notes';
import loginService from './services/login';
import Notification from './components/Notification';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import NoteForm from './components/NoteForm';
import Togglable from './components/Togglable';


const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('a new note ...');
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const noteFormRef = React.createRef();

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
        noteFormRef.current.toggleVisibility();
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: false
        };

        noteService
            .create(noteObject)
            .then(res => {
                noteObject.id = res.id;
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
            .catch(() => {
                setErrorMessage(`Note ${note.content} was already removed from the server`);
                setTimeout(() => setErrorMessage(null), 5000);
                setNotes(notes.filter(n => n.id !== id));
            });
    };

    const removeNote = id => {
        noteService
            .remove(id)
            .then(() => {
                setNotes(notes.filter(note => note.id !== id));
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

            noteService.setToken(user.token);
            setUser(user);
            setUsername('');
            setPassword('');
        }
        catch (err) {
            setErrorMessage('Wrong Credentials');
            setTimeout(() => { setErrorMessage(null); }, 5000);
        }
    };

    const handleLogout = () => {
        window.localStorage.clear();
        setUser(null);
    };

    const loginForm = () => {
        return (
            <Togglable buttonLabel='Login'>
                <LoginForm
                    handleLogin={handleLogin}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    username={username}
                    password={password}
                />
            </Togglable>
        );
    };

    const noteForm = () => (
        <Togglable buttonLabel='Create New Note' ref={noteFormRef}>
            <NoteForm
                addNote={addNote}
                newNote={newNote}
                handleNoteChange={handleNoteChange}
            />
        </Togglable>
    );

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            {user === null
                ? loginForm()
                :
                <div>
                    <p>{user.name} logged in <button onClick={handleLogout}>Log out</button></p>
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
    );
};

export default App;