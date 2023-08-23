import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import OptiStepLogo from '../images/os-logo.png';
import "../styles/components/NavBarComp.css"
import {Link} from "react-router-dom";

export default function NavBarComp() {
  return (
      <article className="navbar-container">
        <Navbar expand="lg" variant="dark">
            <Link to="/">
              <img className="navbar-logo" src={OptiStepLogo} alt="OptiStep-Logo"/>
            </Link>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="navbar-options">
                <Link to="/" className="os-txt os-txt-md">Inicio</Link>

                <Link to="/about" className="os-txt os-txt-md">Acerca de</Link>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
      </article>
  );
}