import React from 'react'
import numeral from 'numeral'
import './table.css'

const Table = ({ countries }) => (
    <div className='table'>
        {countries.map(({ country, cases }) => (
            <tr>
                <td>{country}</td>
                <td><strong>{numeral(cases).format("0,0")}</strong></td>
            </tr>
        ))}
    </div>
)
export default Table