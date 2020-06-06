import React, { useState, useEffect } from 'react'
import { NativeSelect, FormControl, InputLabel, makeStyles } from '@material-ui/core'
import { usStates } from '../../config'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        marginTop: '6%',
        minWidth: 120,
      }
}))

export default function States({ handleStateChange }) {
    const classes = useStyles()
    const [states, setState] = useState([])

    const getUsStates = () => {
        setState(Object.keys(usStates))
    }

    useEffect(() => {
        getUsStates()
    }, [])

    return (
        <FormControl className={classes.formControl}>
            <InputLabel>State</InputLabel>
            <NativeSelect defaultValue='' onChange={e => handleStateChange(e.target.value)}>
                <option value=''></option>
                {states.map((state, index) => <option value={state} key={index}>{state}</option>)}
            </NativeSelect>
        </FormControl>
    )
}
