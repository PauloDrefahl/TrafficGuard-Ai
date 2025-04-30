// Accessibility Card on Settings page

import React, { useState } from 'react';

const AccessibilityCard = () => {

  const [textSize, setTextSize] = useState(16);

  const handleSliderChange = (e) => {

    setTextSize(e.target.value);
    document.documentElement.style.setProperty('--text-size', `${e.target.value}px`);

  };


  return (

    <div className="card"

      style={{

        maxWidth: '100%',
        minWidth: '80%',
        width: '100px',
        height: 'auto',

      }}>

      <div className="card-body">

      <h11>Text Scale</h11>

        <div className="slider-container"

          style={{

            display: 'flex',
            flexDirection: 'column',
            
        }}>
            
          <div

            style={{

              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '5px',

            }}>

            <input

              type="range"
              min="20"
              max="35"
              value={textSize}
              className="slider"
              id="textSize"
              onChange={handleSliderChange}

            />

            <span>{textSize}px</span>

          </div>

          <div className="text-preview"

            style={{

              fontSize: `${textSize}px`,
              fontFamily: 'Inter',
              textAlign: 'center',
              marginTop: '10px',
              width: '100%',

            }}>

            This is a preview of how the text will look.

          </div>
        </div>
      </div>
    </div>
    
  );
};

export default AccessibilityCard;
