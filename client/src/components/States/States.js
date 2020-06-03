import React, { useState, useEffect } from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'
import { usStates } from '../../config'

import styles from './states.module.css'

export default function States() {
    const [states, setState] = useState([])

    const getUsStates = () => {
        setState(Object.keys(usStates))
    }

    useEffect(() => {
        getUsStates()
    }, [])

    return (
        <FormControl className={styles.FormControl}>
            <NativeSelect defaultValue=''>
                <option value=''></option>
                {states.map((state, index) => <option value={state} key={index}>{state}</option>)}
            </NativeSelect>
        </FormControl>
    )
}
