// Network Security Status CARD

import React from 'react';


const SecurityCard = () => {

  return(
    
    <div className="card mb-2"
    
      style={{

        maxWidth: '100%',
        minWidth: '80%', /* Prevents the box from collapsing */
        width: 'auto',
        height: 'auto',

      }}> {/* className = "card mb-2" */}

      <div className="card-body" 
      
        style={{

          display: 'flex',          
          alignItems: 'center',     
          justifyContent: 'start',  
          marginLeft: '10px',
          gap: '10px' /* Space between text and nested box*/            

        }}> {/* className = "card-body" */}


        <h10>Detected Threats: <span> 0 </span> </h10>

        {/* Nested Secure Box */}
        <div

          style = {{

            /* Box CSS */
            backgroundColor: '#FFFFFF',
            border: '3px solid #18CE00',
            borderRadius: '10px',
            display: 'inline-block',
            width: '170px',
            marginLeft: '60px',

            /* Text CSS */
            color: '#18CE00',
            fontSize: '24px',
            fontFamily: 'Inter',
            fontWeight: 400, /* Regular */
            display: 'flex',             // Center vertically
            justifyContent: 'center',    // Center horizontally 
            alignItems: 'center',        // Center vertically

          }}>
          
          Secure

        </div>

      </div>
    </div>
    
  );
};

export default SecurityCard;
