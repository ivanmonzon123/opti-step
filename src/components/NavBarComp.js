import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import OptiStepLogo from '../images/os-logo.png';
import "../styles/components/NavBarComp.css"
import {Link} from "react-router-dom";

export default function NavBarComp() {
  return (
      <article className="nav-bar-container">
        <Navbar expand="lg" bg="dark" variant="dark">
            <Link to="/">
              <img className="nav-bar-logo" src={OptiStepLogo} alt="OptiStep-Logo"/>
            </Link>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="nav-bar-options">
                <Link to="/">Inicio</Link>

                <Link to="/about">Acerca de</Link>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
      </article>
  );
}