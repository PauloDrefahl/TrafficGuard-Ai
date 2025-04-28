// Router Detail Card Found on the Home page

import React from 'react';


const RouterDetails = () => (

  <div className="card mb-2"
  
    style={{

        maxWidth: '100%',
        minWidth: '80%', /* Prevents the box from collapsing */
        width: '100px',
        height: 'auto',

    }}> {/* className = "card mb-2" */}

    <div className="card-body" 
    
        style = {{

            marginLeft: '10px',
            display: 'flex', /* This and flexDir and gap allow for a vertical stack */
            flexDirection: 'column',
            gap: '10px'

        }}>


      <h11>Network Name: </h11>
      <h11>Brand: </h11>
      <h11>Model: </h11>
      <h11>IP Address: </h11>


    </div>

      
</div>

);

export default RouterDetails;