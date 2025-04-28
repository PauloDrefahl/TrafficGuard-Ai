// "HOME" PAGE 
// App.js is the starting point for the application. This is where buttons and cards are organized on screen 


import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './styles/styles.css'; // Import your custom CSS
import Navbar from './components/Navbar';
import SecurityCard from './components/SecurityCard';
import DeviceList from './components/DeviceList';
import TrafficMonitoring from './components/TrafficMonitoring';
import DevicesAtRisk from './components/BandwidthUsage';
import ConsoleOutput from './components/console';
import FetchDataButton from "./components/fetchData";
import SystemData from './components/systemData';
import CardHeader from './components/CardHeader';


function App() {

  return (
    <div>


      <Navbar />

      <div className="container mt-1"> <h7>Home</h7> </div>
      

      <div>

        <div className="row">

          <div className="col-auto ms-4"> {/* Grid 1/3 of Screen; margin start at */}

            <CardHeader HeaderText={"Network Security Status"} />
            <SecurityCard />
                
            <CardHeader HeaderText={"Router"} />

          </div>


          <div className="col-auto me-4"> {/* Grid 2/3 of Screen; margin end at */}

            <CardHeader HeaderText={"Network Usage"} />
            <TrafficMonitoring />
            <DeviceList />

          </div>

          {/* CPU/Memory Usage, Wireless Clients, Firewall Rules, etc. */}
          <SystemData />

          
          
        </div>
        
      </div>

    </div>
  );
}

export default App;
