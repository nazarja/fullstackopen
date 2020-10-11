import React from 'react';

const Persons = ({ persons, onClick }) => {

    const renderPersons = () =>
        persons.map(
            person =>
                <p key={person.id} className="person">
                    {person.name} {person.number} &nbsp;
                    <button onClick={() => onClick(person)}>delete</button>
                </p>
        );

    return (
        <div>
            {renderPersons()}
        </div>
    );
};

export default Persons;