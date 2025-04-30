// Responsible for continuousl loading the NavBar on each page

import NavBar from './components/Navbar';
import {Outlet} from 'react-router-dom';

function Layout(){

    return(

        <>

            <NavBar/>
            <main>
                <Outlet/>
            </main>

        </>

    );


}

export default Layout;