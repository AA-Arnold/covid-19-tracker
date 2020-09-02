import React from 'react';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import InfoBox from './infoBox'
import Map from './Map'
import './App.css';

function App() {
  const [countries, setCountries] = React.useState([])
  const [country, setCountry] = React.useState('Worldwide')
  const [countryInfo, setCountryInfo] = React.useState({})

  React.useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => { setCountryInfo(data) })
  }, [])

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



  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    console.log('YOOOOO>>>>>', countryCode)
    setCountry(countryCode)

    const url = countryCode === 'Worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
      .then(response => response.json())
      .then(data => { setCountry(countryCode); setCountryInfo(data) })


  }

  console.log(countryInfo)
  return (

    <div className="app">
      <div className='app__left'>
        <div className='app__header'>
          <h1>COVDI-19 TRACKER</h1>
          <FormControl className='app__dropdown'>
            <Select value={country} variant='outlined' onChange={onCountryChange}>
              <MenuItem value='Worldwide'>Wordwide</MenuItem>
              {
                countries.map(countries => <MenuItem value={countries.value}>{countries.name}</MenuItem>)
              }
            </Select>

          </FormControl>
        </div>

        <div className='app__stats'>
          <InfoBox title='Coronavarius Cases' cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title='Recover' cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title='Deaths' cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>
        <Map />
      </div>

      <Card className='app-right'>
        <CardContent>
          <h3>Live cases by country</h3>
          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>

    </div>
  );
}

export default App;
