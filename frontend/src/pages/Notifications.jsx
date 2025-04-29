// Notifications PAGE
import NotificationCards from '../components/NotificationCards';

function Notifications(){

    return(
        <div>
        
            {/* Page Title */}
            <div className="container mt-2"> <h7>Notifications</h7> </div>

            <div className="row">

                <div 
                    style={{

                        /* Box CSS */
                        backgroundColor: '#3775F1',
                        borderRadius: '10px',
                        display: 'inline-block',
                        width: '94%',
                        height: '55px',
                        margin: '20px 0px 0px 60px',
                        boxShadow: '0px 4px 4px rgb(0, 0, 0, .25)',

                        /* Text CSS */
                        color: 'white',
                        fontSize: '28px',
                        fontFamily: 'Inter',
                        fontWeight: 400, /* Regular */
                        display: 'flex',             // Center vertically
                        padding: '0px 60px',    // top, left padding 
                        alignItems: 'center',        // Center vertically

                    }}>

                    <span style={{marginRight: '250px'}}> ID </span>
                    <span style={{ marginRight: '250px'}}> IP </span>
                    <span style={{ marginRight: '200px'}}> Date </span>
                    <span style={{ marginRight: '225px'}}> Time </span>
                    <span> Message </span>

                </div>
                    
                <div className="overflow-auto custom-scroll"
                    style={{

                        backgroundColor: '#F9F8F8',
                        height: '500px',
                        width: '94%',
                        marginLeft: '60px',
                        marginTop: '20px',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
                        padding: '20px',

                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                    }}
                >

                    <NotificationCards />
                    <NotificationCards />
                    <NotificationCards />
                    <NotificationCards />
                    <NotificationCards />
                    <NotificationCards />
                    <NotificationCards />
                    <NotificationCards />
                    <NotificationCards />
                    <NotificationCards />
                    <NotificationCards />
                    <NotificationCards />



                </div>


                </div> 
            </div>
    );

}

export default Notifications;