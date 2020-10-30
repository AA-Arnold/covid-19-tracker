import React from 'react'
import './infobox.css'
import { Card, CardContent, Typography } from '@material-ui/core'

const InfoBox = ({ title, cases, active, isRed, total, ...props }) => (
    <Card
        className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`}
        onClick={props.onClick}>
        <CardContent>
            <Typography className="infoBox__title" color='textSecondary'>{title}</Typography>
            <h2 className={`infoBox__cases ${!isRed && "infoBox_cases--green"}`}>{cases}</h2>
            <Typography className="infoBox__total" color='textSecondary'>{total}</Typography>
        </CardContent>
    </Card>
)

export default InfoBox 