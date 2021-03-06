import React from 'react';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import InfoBox from './infoBox'
import Map from './Map'
import Table from './Table'
import { sortData, prettyPrintStat } from './util'
import LineGraph from './LineGraph'
import "leaflet/dist/leaflet.css"
import './App.css';

function App() {
  const [countries, setCountries] = React.useState([])
  const [country, setCountry] = React.useState('Worldwide')
  const [countryInfo, setCountryInfo] = React.useState({})
  const [tableData, setTableDate] = React.useState([])
  const [mapCenter, setMapCenter] = React.useState({ lat: 34.80746, lng: -40.4796 })
  const [mapZoom, setMapZoom] = React.useState(3)
  const [mapCountries, setMapCountries] = React.useState([])
  const [casesType, setCasesType] = React.useState('cases')

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
          const sortedData = sortData(data)
          setTableDate(sortedData)
          setMapCountries(data)
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
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long])
        setMapZoom(4)
      })


  }

  console.log(countryInfo)
  console.log('lat and log', mapCenter)
  return (

    <div className="app">
      <div className='app__left'>
        <div className='app__header'>
          <h1>COVID-19 TRACKER</h1>
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
          <InfoBox
            isRed
            active={casesType === 'cases'}
            onClick={e => setCasesType('cases')}
            title='Coronavarius Cases'
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)} />

          <InfoBox
            active={casesType === 'recovered'}
            onClick={e => setCasesType('recovered')}
            title='Recover'
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)} />

          <InfoBox
            isRed
            active={casesType === 'deaths'}
            onClick={e => setCasesType('deaths')}
            title='Deaths'
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)} />

        </div>

        <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
      </div>

      <Card className='app-right'>
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData} />
          <h3 className="app__graphTitle">Worldwide new {casesType}</h3>
          <LineGraph className='app__graph' casesType={casesType} />
        </CardContent>
      </Card>

    </div>
  );
}

export default App;
