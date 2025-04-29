// Change Router Card on the Settings PAGE

import ScrollBoxRouter from './ScrollBoxRouter';

const ChangeRouter = () => {

    return(

        <div className="card "
            style={{

                /* Box CSS */
                maxWidth: '100%',
                minWidth: '80%', /* Prevents the box from collapsing */
                width: '90%',
                height: 'auto',

            }}>

            <div className="card-body" 
    
                style = {{

                    /* Text CSS */
                    marginLeft: '10px',
                    display: 'flex', /* This and flexDir and gap allow for a vertical stack */
                    flexDirection: 'column',
                    gap: '10px'

                }}>

                  {/* Select Router Section */}
                <h11>Select Router</h11>
                <div 
                    style={{ 
                        
                        height: '200px', 
                        backgroundColor: '#F0F0F0',
                        borderRadius: '15px',
                    
                    }}>

                    <ScrollBoxRouter height="100%" width="100%">
                       
                       <div>

                       </div>
                    
                    </ScrollBoxRouter> {/* Scroll Router Menu */}

                </div>


                {/* Add Router Section */}
                <h11>Add Router</h11>
                <h10 style={{ marginLeft: '25px'}}>Router Brand </h10>


                <h10 style={{ marginLeft: '25px'}}>Router Model </h10>


                
                <div 
                    style={{
                        display: 'flex', 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        gap: '55px'
                    }}>
                    
                    <h10 style={{ marginLeft: '25px'}}>IP Address </h10>
                    {/* User Ip Textbox */}
                    <div class="text-box"

                        style={{

                            height: '50px',
                            width: '45%',

                        }}>

                    <input type="text" class="custom-input" placeholder="e.g. 192.103.577.901"/>

                    </div>

                    <div className="button">Add</div>

                </div>
                

            </div>

            
        </div>

    );

};

export default ChangeRouter;