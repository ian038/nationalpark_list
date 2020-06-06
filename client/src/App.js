import React, { useState, Fragment } from 'react';
import Router from './router'
import States from './components/States/States'
import Parks from './components/Parks/Parks'
import { isAuthenticated } from './auth'
import { fetchData } from './api'
import { CircularProgress } from '@material-ui/core'

import styles from './App.module.css'

function App() {
  const [ parks, setPark ] = useState([])
  const [ loading, setLoading ] = useState(false)

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
    <div className={styles.container}>
      <Router />
      {isAuthenticated() ? 
      <Fragment>
        <States handleStateChange={handleStateChange} />
        <Parks parks={parks} />
      </Fragment>
      : ''
      }
      {showLoading()}
    </div>
  );
}

export default App;
