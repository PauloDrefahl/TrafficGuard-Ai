import React from 'react';

const NotificationCards = () => {

    return(

        <div>
        
            <div className="card"
                    style={{

                        /* Box CSS */
                        borderRadius: '10px',
                        display: 'inline-block',
                        width: '100%',
                        height: '55px',  
                        margin: '7px 0px',                  

                        /* Text CSS */
                        color: 'black',
                        fontSize: '26px',
                        fontFamily: 'Inter',
                        fontWeight: 400, /* Regular */
                        padding: '5px 30px',    // top, left padding 
                    
                    }}>

                    {/* FILL WITH YOUR OWN DATA */}
                    <span style={{marginRight: '183px'}}> 8d37s0 </span>
                    <span style={{ marginRight: '76px'}}> 192.177.833.075 </span>
                    <span style={{ marginRight: '164px'}}> 4/28/25 </span>
                    <span style={{ marginRight: '176px'}}> 9:35AM </span>
                    <span> Suspicious Activity Detected </span>

                </div>
                    
                 
            </div>

    );

};

export default NotificationCards;