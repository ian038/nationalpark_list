import React, { useState, useEffect } from 'react';
import Router from './router'
import States from './components/States/States'
import Parks from './components/Parks/Parks'
import { fetchData } from './api'

import styles from './App.module.css'

function App() {
  const [ parks, setPark ] = useState([])

  const handleStateChange = async (usState) => {
    const parks = await fetchData(usState)
    console.log(parks)
    setPark(parks)
  }

  return (
    <div className={styles.container}>
      <Router />
      <States handleStateChange={handleStateChange} />
      <Parks parks={parks} />
    </div>
  );
}

export default App;
