// Navigation Bar

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Burger } from './Burger';
import { Link } from 'react-router-dom';

function NavBar() {

  return (
    
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">

      <Container>

        {/* Nav Title */}
        <Burger />
        <h9>FrED IoT Home System</h9>
             
        <Link to="/">Home</Link>
        <Link to="/NetworkStatus">Network Status</Link>
        <Link to="/Notifications">Notifications</Link>
        <Link to="/Settings">Settings</Link>


          {/* Right-side Options */}
          <Nav>
          
            <Nav.Link eventKey={2} href="#account">Exit ↪</Nav.Link>

          </Nav>

        
      </Container>
    </Navbar>
  );
}

export default NavBar;
