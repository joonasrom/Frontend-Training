import Traininglist from './Components/Traininglist';
import Customerlist from './Components/Customerlist';
import CustomerCalendar from './Components/CustomerCalendar';
import AppBar from '@material-ui/core/AppBar';
import './App.css';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import React, { useState } from 'react';

function App() {

  const [value, setValue] = useState('one');

  const handleChange = (event, value) => {
    setValue(value);
  };
  return (
    <div className="App">
      <AppBar position="static" style={{ background: '#bf360c' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab value="one" label="Customers" />
          <Tab value="two" label="Trainings" />
          <Tab value="three" label="Calendar" />
        </Tabs>
      </AppBar>
      
      {value === 'one' && <div><Customerlist /></div>}
      {value === 'two' && <div><Traininglist /></div>}
      {value === 'three' && <div><CustomerCalendar /></div>}

    </div>
  );
}

export default App;
