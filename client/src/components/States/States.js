import React, { useState, useEffect, Fragment } from 'react'
import { NativeSelect, FormControl, InputLabel, makeStyles, CircularProgress } from '@material-ui/core'
import { usStates } from '../../config'
import { isAuthenticated } from '../../auth'
import { fetchData } from '../../api'
import Parks from '../Parks/Parks'


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        marginTop: '6%',
        minWidth: 120,
      }
}))

export default function States() {
    const classes = useStyles()
    const [states, setState] = useState([])
    const [ parks, setPark ] = useState([])
    const [ loading, setLoading ] = useState(false)

    const getUsStates = () => {
        setState(Object.keys(usStates))
    }

    useEffect(() => {
        getUsStates()
    }, [])

    const handleStateChange = async (usState) => {
        setLoading(true)
        fetchData(usState).then(parks => {
          setPark(parks)
          setLoading(false)
        })
      }

    const showLoading = () => (
        <CircularProgress style={{ display: loading ? '' : 'none', marginTop: '1%' }} size={30} />
      )


    return (
        <Fragment>
            <FormControl className={classes.formControl}>
            <InputLabel>State</InputLabel>
            <NativeSelect defaultValue='' onChange={e => handleStateChange(e.target.value)}>
                <option value=''></option>
                {states.map((state, index) => <option value={state} key={index}>{state}</option>)}
            </NativeSelect>
            </FormControl>
            {showLoading()}
            <Parks parks={parks} />
        </Fragment>
    )
}
