import React, { useState, useEffect } from 'react';
import personService from './services/personService';
import Heading from './components/Heading';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';


const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterInput, setFilterInput] = useState('');
    const [filteredPersons, setFilteredPersons] = useState([]);
    const [message, setMessage] = useState(null);

    // get
    useEffect(() => {
        personService
            .getAll()
            .then(res => setPersons(res));
    }, []);

    // post
    const createUpdatePerson = (event) => {
        event.preventDefault();

        const newObject = { name: newName, number: newNumber };
        const personExists = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase());

        const create = () => {
            personService
                .create(newObject)
                .then(res => {
                    setPersons(persons.concat(res));
                    handleMessage({ text: `Added ${newName}`, type: 'success' });
                })
                .catch(err => handleMessage({ text: err.response.data.err, type: 'error' }));
        };

        const update = () => {
            return window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
                ? personService
                    .update(personExists[0].id, newObject)
                    .then(res => {
                        setPersons(
                            persons.map(person =>
                                person.name.toLowerCase() !== newName.toLowerCase()
                                    ? person
                                    : res
                            ));
                        handleMessage({ text: `Updated ${newName}`, type: 'success' });
                    })
                    .catch(err => {
                        setPersons(persons.filter(person => person.name !== newName));
                        handleMessage({ text: `Information of ${newName} has already been removed from the server`, type: 'error' });
                    })
                : false
        };

        !personExists.length
            ? create()
            : update()

        handleReset();
    };

    // delete
    const removePerson = () => {
        return (contact) => {
            return window.confirm(`Delete ${contact.name} ?`)
                ? personService
                    .remove(contact.id)
                    .then(() => {
                        setPersons(persons.filter(person => person.id !== contact.id));
                        handleReset();
                    })
                    .catch(err => {
                        setPersons(persons.filter(person => person.id !== contact.id));
                        handleMessage({ text: `Information of ${newName} has already been removed from the server`, type: 'error' });
                    })
                : false
        };
    };

    const handleReset = () => {
        setNewName('');
        setNewNumber('');
        setFilterInput('');
        setFilteredPersons([]);
    }

    const handlePersonsChange = (event) => {
        setFilterInput(event.target.value)
        setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())));
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const handleMessage = (message) => {
        setMessage(message);
        setTimeout(() => setMessage(null), 5000);
    };

    return (
        <div>
            <Notification message={message} />

            <Heading type={'h2'} text={'Phonebook'} />
            <Filter onChange={handlePersonsChange} value={filterInput} />
            <Heading type={'h3'} text={'Add a New'} />
            <PersonForm
                handleSubmit={createUpdatePerson}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                newName={newName}
                newNumber={newNumber}
            />
            <Heading type={'h3'} text={'Numbers'} />
            {
                !filteredPersons.length
                    ? <Persons persons={persons} onClick={removePerson()} />
                    : <Persons persons={filteredPersons} onClick={removePerson()} />
            }
        </div>
    );
};

export default App;
