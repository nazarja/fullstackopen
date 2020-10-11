import React from 'react';
import Weather from './Weather';

const Country = ({ data }) => {
    const languages = data.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)

    return (
        <div>
            <h2>{data.name}</h2>
            <p>Capital: {data.capital}</p>
            <p>Population: {data.population}</p>
            <h3>Languages</h3>
            <ul>{languages}</ul>
            <img src={data.flag} height="50" width="80" alt={data.name + ' flag'} />
            <Weather capital={data.capital} />
        </div >
    );
};

export default Country;