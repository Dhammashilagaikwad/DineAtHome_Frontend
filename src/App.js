import './App.css';
import React from 'react';
import Body from './Body.jsx';
import { NotificationProvider } from './components/NotificationContext.js';
import Notify from './components/Notification.js';

function App(){
  return(
    <div className="App">
      <NotificationProvider>
      <Notify />
      <Body/>
      </NotificationProvider>
    </div>
  )
}

export default App;