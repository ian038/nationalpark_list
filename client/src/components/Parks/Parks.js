import React, { useState, useEffect } from 'react'
import { Grid, Card, CardMedia, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
      },
      card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      cardMedia: {
        paddingTop: '56.25%', // 16:9
      },
      cardContent: {
        flexGrow: 1,
      }
}))

export default function Parks({ parks }) {
    const classes = useStyles()

    return (
        <Grid container spacing={5} style={{ marginTop: '2%' }}>
            {parks.map((park, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                        <CardMedia 
                        className={classes.cardMedia} 
                        image={park.images.length > 0 ? park.images[0].url : null} title="National Park" />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {park.fullName}
                            </Typography>
                            <Typography>
                                {park.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}
