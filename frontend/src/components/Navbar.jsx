import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        {/* Brand / Title */}
        <Navbar.Brand as={Link} to="/">
          <strong>FrED IoT Home System</strong>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

          {/* Left-side Navigation Links */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/NetworkStatus">Network Status</Nav.Link>
            <Nav.Link as={Link} to="/Notifications">Notifications</Nav.Link>
            <Nav.Link as={Link} to="/Pcap">PCAP</Nav.Link>
            <Nav.Link as={Link} to="/Settings">Settings</Nav.Link>
          </Nav>

          {/* Right-side Options */}
          <Nav>
            <Nav.Link href="#account">Exit ↪</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
