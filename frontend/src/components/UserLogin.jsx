// Found on the Settings PAGE

const UserLogin = () => {

    return(

        <div className="card mb-2"
            style={{

                /* Box CSS */
                maxWidth: '100%',
                minWidth: '80%', /* Prevents the box from collapsing */
                width: '100px',
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


                <h11>Username: </h11>
                <div class="text-box"

                    style={{

                        height: '50px',
                        width: '70%',

                    }}>

                    <input type="text" class="custom-input" placeholder="e.g. User01"/>
                    
                </div>


                <h11>Password: </h11>
                <div 
                    style={{
                        display: 'flex', 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        gap: '30px'
                    }}>

                    <div class="text-box"

                        style={{

                            height: '50px',
                            width: '70%',

                        }}>

                    <input type="text" class="custom-input" placeholder="e.g. Password"/>

                    </div>

                    <div className="button">Login</div>

                </div>
                

            </div>

            
        </div>

    );

};

export default UserLogin;