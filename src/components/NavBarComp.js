import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import OptiStepLogo from '../images/os-logo.png';
import "../styles/components/NavBarComp.css"
import {Link} from "react-router-dom";
import AboutMeComp from "./AboutMeComp";
import {useState} from "react";

export default function NavBarComp() {
    const [showAboutModal$, setShowAboutModal$] = useState(false);

    function openAboutMeModal() {
        setShowAboutModal$(true);
    }

    return (
      <article className="navbar-container">
        <Navbar expand="lg" variant="dark">
            <Link to="/">
              <img className="navbar-logo" src={OptiStepLogo} alt="OptiStep-Logo"/>
            </Link>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="navbar-options">
                <Link to="/" className="os-txt os-txt-md px-1">Inicio</Link>

                <button className="px-1 os-btn" onClick={openAboutMeModal}>
                    <label className="os-txt os-txt-md">Acerca de</label>
                </button>
              </Nav>
            </Navbar.Collapse>
        </Navbar>

        <AboutMeComp show$={showAboutModal$} setShow$={setShowAboutModal$}/>
      </article>
  );
}