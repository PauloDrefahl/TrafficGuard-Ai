import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { RouterProvider } from './context/RouterContext';

import Layout from './Layout';
import Home from './pages/Home';
import NetworkStatus from './pages/NetworkStatus';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';

function App() {
  return (
    <RouterProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/NetworkStatus" element={<NetworkStatus />} />
            <Route path="/Notifications" element={<Notifications />} />
            <Route path="/Settings" element={<Settings />} />
          </Route>
        </Routes>
      </HashRouter>
    </RouterProvider>
  );
}

export default App;
