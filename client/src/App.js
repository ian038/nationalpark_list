import React from 'react';
import Router from './router'
import States from './components/States/States'

import styles from './App.module.css'

function App() {
  return (
    <div className={styles.container}>
      <Router />
      <States />
    </div>
  );
}

export default App;
