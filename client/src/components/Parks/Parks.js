import React, { useState, useEffect } from 'react'
import { Grid, Card, CardMedia, CardContent, Typography } from '@material-ui/core'

export default function Parks({ parks }) {


    return (
        <Grid container>
            {parks.map((park, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>

                </Grid>
            ))}
        </Grid>
    )
}
