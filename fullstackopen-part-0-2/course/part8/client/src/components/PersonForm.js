import React, { useState } from 'react';

const PersonForm = (props) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');

    const submit = async event => {
        event.preventDefault();
        await props.addUser({
            variables: {
                name, phone: phone.length > 0 ? phone : null, street, city
            }
        });
        setName('');
        setPhone('');
        setStreet('');
        setCity('');
    };

    return (
        <form onSubmit={submit}>
            <div>
                name 
                <input
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                />
            </div>
            <div>
                phone 
                <input
                    value={phone}
                    onChange={({ target }) => setPhone(target.value)}
                />
            </div>
            <div>
                street 
                <input
                    value={street}
                    onChange={({ target }) => setStreet(target.value)}
                />
            </div>
            <div>
                city 
                <input
                    value={city}
                    onChange={({ target }) => setCity(target.value)}
                />
            </div>
            <button type='submit'>Add Person</button>
        </form>
    );
};

export default PersonForm;