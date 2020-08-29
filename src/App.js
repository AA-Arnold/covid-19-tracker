import React from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import './App.css';

function App() {
  const [countries, setCountries] = React.useState([])

  React.useEffect(() => {

    const getCountriesAndIso = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
        .then(data => {
          const countries = data.map(({ country, countryInfo: { iso2, _id } }) => ({ name: country, value: iso2, id: _id }))
          // console.log(countries)
          setCountries(countries)
        })


    }

    // const getCountriesAndIso = fetch('https://disease.sh/v3/covid-19/countries')
    //   .then(response => response.json())
    //   .then(data => data.map(({ country, countryInfo: { iso2 } }) => {
    //     return country, iso2
    //   }))



    // setCountries(country)
    getCountriesAndIso()
  }, [])

  return (
    <div className="app">
      <div className='app__header'>
        <h1>COVDI-19 TRACKER</h1>
        <FormControl className='app__dropdown'>

          <MenuItem value='worldwide'>WORLD WIDE</MenuItem>
          <Select value='' variant='outline'>
            {
              countries.map(countries => <MenuItem key={countries.id} value={countries.values}>{countries.name}</MenuItem>)
            }
          </Select>

        </FormControl>
      </div>

    </div>
  );
}

export default App;
