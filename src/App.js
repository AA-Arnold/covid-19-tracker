import React from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import InfoBox from './infoBox'
import Map from './Map'
import './App.css';

function App() {
  const [countries, setCountries] = React.useState([])
  const [country, setCountry] = React.useState('Worldwide')

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
    getCountriesAndIso()
  }, [])

  const onCountryChange = (e) => {
    const countryCode = e.target.value;

    console.log('YOOOOO>>>>>', countryCode)
    setCountry(countryCode)
  }

  return (
    <div className="app">
      <div className='app__left'>
        <div className='app__header'>
          <h1>COVDI-19 TRACKER</h1>
          <FormControl className='app__dropdown'>
            <Select value={country} variant='outlined' onChange={onCountryChange}>
              <MenuItem value='worldwide'>Wordwide</MenuItem>
              {
                countries.map(countries => <MenuItem value={countries.value}>{countries.name}</MenuItem>)
              }
            </Select>

          </FormControl>
        </div>

        <div className='app__stats'>
          <InfoBox title='Coronavarius Cases' cases={222} total={700} />
          <InfoBox title='Recover' cases={321} total={9000} />
          <InfoBox title='Deaths' cases={111} total={8999} />
        </div>
        <Map />
      </div>

      <div className='app-right'>

      </div>

    </div>
  );
}

export default App;
