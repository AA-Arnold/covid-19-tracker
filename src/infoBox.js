import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

const InfoBox = ({ title, cases, total }) => (
    <Card className="infoBox">
        <CardContent>
            <Typography className="infoBox__title" color='textSecondary'>{title}</Typography>
            <h2>{cases}</h2>
            <Typography className="infoBox__total" color='textSecondary'>{total}</Typography>
        </CardContent>
    </Card>
)

export default InfoBox 