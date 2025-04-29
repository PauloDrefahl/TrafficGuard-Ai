// Light/Mode Box - NEEDS IMPLEMENTATION WITH CSS
// Found on the Settings PAGE

// Router Detail Card Found on the Home page

import React from 'react';
import moonIcon from '../assets/icons/moon-solid.svg';

//Change the sun-solid to sun bright on FontAwesome
import sunIcon from '../assets/icons/sun-solid.svg';

const ThemeCard = () => {

  return(

    <div className="card mb-2"
    
      style={{

          /* Box CSS */
          maxWidth: '100%',
          minWidth: '80%', /* Prevents the box from collapsing */
          width: '100px',
          height: 'auto',

      }}> {/* className = "card mb-2" */}

      <div className="card-body" 
      
          style = {{

              /* Text CSS */
              marginLeft: '10px',
              display: 'flex', /* This and flexDir and gap allow for a vertical stack */
              flexDirection: 'row',
              gap: '5px'

          }}>

        <div className='theme-button'>
          Light Mode 
          <img src={sunIcon} alt="Sun Icon" style={{ width: '28px', height: '28px', marginLeft: '8px' }}/>
        </div>

        <div className='theme-button'>
          Dark Mode 
          <img src={moonIcon} alt="Moon Icon" style={{ width: '43px', height: '33px' }}/>
        </div>

      </div>    
    </div>

  );
};

export default ThemeCard;