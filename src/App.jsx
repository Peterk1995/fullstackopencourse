import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null); // New enchantment for selected country details

  useEffect(() => {
    if (query) {
      axios
        .get(`https://restcountries.com/v3.1/name/${query}`)
        .then(response => {
          setCountries(response.data);
          setSelectedCountry(null); // Reset the selected country upon new search
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [query]);

  // New spell to reveal the details of a country
  const handleShowDetails = (country) => {
    setSelectedCountry(country);
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  // Modified renderResults to include buttons for each country
  const renderResults = () => {
    if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (selectedCountry) {
      // Render the detailed view for the selected country
      return renderCountryDetails(selectedCountry);
    } else if (countries.length > 1) {
      return (
        <div>
          {countries.map((country, index) => (
            <p key={index}>
              {country.name.common}
              <button onClick={() => handleShowDetails(country)}>show</button>
            </p>
          ))}
        </div>
      );
    } else if (countries.length === 1) {
      // Directly show the detailed view if there's only one country
      return renderCountryDetails(countries[0]);
    }
    return null;
  };

  // Separate function to render the details of a country
  const renderCountryDetails = (country) => (
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
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} style={{ width: '100px', height: 'auto' }} />
    </div>
  );

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
