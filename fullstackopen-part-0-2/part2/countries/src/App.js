import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Country from './components/Country';
import CountryList from './components/CountryList';

const App = () => {
  const [value, setValue] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(res => setCountries([...res.data]));
  }, []);

  const handleEffect = (event) => {
    setValue(event.target.value.toLowerCase());
  }

  const renderHTML = () => {
    const data = countries.filter(country => country.name.toLowerCase().startsWith(value));

    return !data.length || data.length > 10
      ? <p>Too many matches, specify another filter</p>
      : data.length === 1
        ? <Country data={data[0]} />
        : <CountryList onClick={handleEffect} data={data} />;
  };

  return (
    <div>
      <Filter onChange={handleEffect} value={value} />
      {renderHTML()}
    </div>
  );
}

export default App;
