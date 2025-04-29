// "HOME" PAGE 
// App.js is the starting point for the application. This is where buttons and cards are organized on screen 


import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NetworkStatus from './pages/NetworkStatus';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Layout from './Layout';



function App() {

  return (
    
    <HashRouter>
      <Routes>
        <Route element={<Layout/>}> 
          <Route path="/" element={<Home/>}/>
          <Route path="/NetworkStatus" element={<NetworkStatus/>}/>
          <Route path="/Notifications" element={<Notifications/>}/>
          <Route path="/Settings" element={<Settings/>}/>
        </Route>
        
      </Routes>
    </HashRouter>

  );
}

export default App;
