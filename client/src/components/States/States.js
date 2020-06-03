import React, { useState, useEffect } from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'
import { usStates } from '../../config'

export default function States() {
    const [states, setState] = useState([])

    const getUsStates = () => {
        setState(Object.keys(usStates))
    }

    useEffect(() => {
        getUsStates()
    }, [])

    return (
        <FormControl style={{ marginTop: '5%' }}>
            <NativeSelect defaultValue=''>
                <option value=''></option>
                {states.map((state, index) => <option value={state} key={index}>{state}</option>)}
            </NativeSelect>
        </FormControl>
    )
}
