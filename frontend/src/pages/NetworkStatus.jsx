// Network Status Page

import SecurityCard from '../components/SecurityCard';
import CardHeader from '../components/CardHeader';
import RouterDetails from '../components/RouterDetails';
import CPUMemory from '../components/CPUMemory';
import NetworkUsage from '../components/NetworkUsage';
import BandwidthUsage from '../components/BandwidthUsage';
import TrafficMonitoring from '../components/NetworkMonitoring';
import SystemData from '../components/systemData';


function NetworkStatus() {

    return(

        <div>
    
          <div className="container mt-2"> <h7>Network Status</h7> </div>
          
          <div>
    
            <div className="row">
    
              <div className="col-auto ms-4"> {/* Grid 1/3 of Screen; margin start at */}
    
                <CardHeader HeaderText={"Network Security Status"} />
                <SecurityCard />
    
                <div className="mt-6"> {/* mt-6 located in styles.css */}
                  <CardHeader HeaderText={"Bandwidth Usage"} />
                </div>     
                <BandwidthUsage />   
    
                <div className="mt-6"> {/* mt-6 located in styles.css */}
                  <CardHeader HeaderText={"System Load"} />
                </div>    
                <CPUMemory />
    
              </div>
    
    
              <div className="col-md-8 ms-4"> {/* Grid 2/3 of Screen; margin end at */}
    
                <CardHeader HeaderText={"Network Trafficking"} />
                <TrafficMonitoring />
    
              </div>
    
              
              
    
              {/* CPU/Memory Usage, Wireless Clients, Firewall Rules, etc. */}
              {/* <SystemData /> */}
    
              
              
            </div>
            
          </div>
    
        </div>

    )

}

export default NetworkStatus;