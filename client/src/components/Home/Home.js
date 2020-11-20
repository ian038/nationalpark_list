import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import background from '../../Assets/hendrik-cornelissen--qrcOR33ErA-unsplash.jpg'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    overlay: {
        position: 'absolute',
        top: '10%',
        left: '65%',
        color: 'black',
     }
  }))

export default function Home() {
    const classes = useStyles()

    return (
        <div style={{width: '100%', margin: 'auto'}}>
            <Grid container>              
                <img 
                src={background}
                />
                <div className={classes.overlay}>
                    <Typography variant="h4" gutterBottom>
                        Welcome to National Parks List!
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        See how many national parks each state has to offer! Register today for free!
                    </Typography>
                </div>
            </Grid>
        </div>
    )
}
