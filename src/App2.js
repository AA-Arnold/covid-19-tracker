import React from 'react';


export const App2 = () => {
    const [countries, setCountries] = React.useState([])

    //fetch content parse response get data save data and return to be used
    React.useEffect(() => {

        fetch("https://jsonplaceholder.typicode.com/users")
            .then((Response) => Response.json())
            .then(data => {
                const finalD = data.map(({ name, id }) => ({ name: name, id: id }))
                setCountries(finalD)
            })

    }, [])

    console.log('state', countries)

    return (

        < React.Fragment >
            {countries.map(country => <h1 key={country.id}>{country.name}</h1>)}
        </React.Fragment >
    )
}
