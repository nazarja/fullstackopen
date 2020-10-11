import React from 'react';

const Countries = ({ data, onClick }) => {
    const countries = data.map(country => <p key={country.name}>{country.name} <button onClick={onClick} value={country.name}>Show</button></p>)

    return (
        <div>
            {countries}
        </div>
    );
};

export default Countries;