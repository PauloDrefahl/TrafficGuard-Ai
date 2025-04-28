// Navigation Bar

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function CollapsibleExample() {

  return (
    
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">

      <Container>


        {/* Nav Title */}
        <Navbar.Brand href="#home"> <h9>FrED IoT Home System</h9></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

          {/* Nav Options */}
          <Nav className="me-auto">
            <Nav.Link href="#iot-devices">IoT Devices</Nav.Link>

            <Nav.Link href="#network-status">Network Status</Nav.Link>

            <NavDropdown title="More Options" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
              <NavDropdown.Item href="#activity-logs">Activity Logs</NavDropdown.Item>
              <NavDropdown.Item href="#alerts">Alerts</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#support">Support</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Right-side Options */}
          <Nav>
          
            <Nav.Link href="#notifications">Notifications</Nav.Link>

            <Nav.Link eventKey={2} href="#account">Exit ↪</Nav.Link>

          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
