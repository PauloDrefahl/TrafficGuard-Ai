// Home page

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../styles/styles.css'; // Import your custom CSS
import SecurityCard from '../components/SecurityCard';
import CardHeader from '../components/CardHeader';
import RouterDetails from '../components/RouterDetails';
import CPUMemory from '../components/CPUMemoryCard';
import NetworkUsage from '../components/NetworkUsage';

import { ThemeProvider } from 'styled-components';


function Home() {

    return (
    
        <div>
    
          <div className="container mt-2"> <h7>Home</h7> </div>
          
          <div>
    
            <div className="row">
    
              <div className="col-auto ms-4"> {/* margin start at 1.5rem */}
    
                <CardHeader HeaderText={"Network Security Status"} />
                <SecurityCard />
    
                <div className="mt-6"> {/* mt-6 located in styles.css */}
                  <CardHeader HeaderText={"Router Details"} />
                </div>     
                <RouterDetails />   
    
                <div className="mt-6"> {/* mt-6 located in styles.css */}
                  <CardHeader HeaderText={"System Load"} />
                </div>    
                <CPUMemory />
    
              </div>
    
    
              <div className="col-md-8 ms-4"> {/* Grid 2/3 of Screen; margin start at 1.5rem */}
    
                <CardHeader HeaderText={"Network Usage"} />
                <NetworkUsage />
    
              </div>
    
              
              
    
              {/* CPU/Memory Usage, Wireless Clients, Firewall Rules, etc. */}
              {/* <SystemData /> */}
    
              
              
            </div>
            
          </div>
    
        </div>
    );

}

export default Home;