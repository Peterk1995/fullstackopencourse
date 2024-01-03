import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState(''); // The user's search query
  const [countries, setCountries] = useState([]); // The list of countries fetched

  useEffect(() => {
    if (query) {
      axios
        .get(`https://restcountries.com/v3.1/name/${query}`)
        .then(response => {
          setCountries(response.data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [query]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const renderResults = () => {
    if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (countries.length > 1) {
      return countries.map((country, index) => <p key={index}>{country.name.common}</p>);
    } else if (countries.length === 1) {
      const country = countries[0];
      return (
        <div>
          <h1>{country.name.common}</h1>
          <p>capital {country.capital}</p>
          <p>area {country.area}</p>
          <div>
            <h3>languages:</h3>
            <ul>
              {Object.values(country.languages).map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
          </div>
          <img src={country.flags.png} alt={`Flag of ${country.name.common}`} style={{width: '100px', height: 'auto'}} />
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div>
        find countries <input value={query} onChange={handleChange} />
      </div>
      {renderResults()}
    </div>
  );
};

export default App;
