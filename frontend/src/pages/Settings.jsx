// Settings PAGE

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../styles/styles.css'; // Import your custom CSS
import CardHeader from '../components/CardHeader';
import UserLogin from '../components/UserLogin';
import ThemeCard from '../components/ThemeCard';

function Settings(){

    return (
    
        <div>
    
          <div className="container mt-2"> <h7>Settings</h7> </div>
          
          <div>
    
            <div className="row">
    
              <div className="col-md-4 ms-4"> {/* Grid 1/3; margin start at 1.5rem */}
    
                <CardHeader HeaderText={"User Login"} />
                <UserLogin/>
    
                <div className="mt-4"> 
                  <CardHeader HeaderText={"Theme"} />
                </div>     
                <ThemeCard/>              
    
              </div>
    
    
              <div className="col-md-4"> {/* Grid 1/3 of Screen; margin start at 1.5rem */}
    
                <CardHeader HeaderText={"Change Router"} />
    
    
              </div>


              <div className="col-md-4 ms-4"> {/* Grid 1/3 of Screen; margin start at 1.5rem */}
    
                <CardHeader HeaderText={"Accessibility"} />
                
    
              </div>
    
    
              
              
            </div>
            
          </div>
    
        </div>
    );


}

export default Settings;