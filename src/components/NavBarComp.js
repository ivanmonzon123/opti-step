import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import OptiStepLogo from "../images/os-logo.png";
import "../styles/components/NavBarComp.css";
import { Link } from "react-router-dom";
import AboutMeComp from "./AboutMeComp";
import { useEffect, useState, useRef } from "react";

export default function NavBarComp() {
  const [showAboutModal$, setShowAboutModal$] = useState(false);

  const navbarCollapsedRef = useRef(null);
  const navbarTogglerRef = useRef(null);
  const navbarContainerRef = useRef(null);

  const openAboutMeModal = () => {
    setShowAboutModal$(true);
  };

  const handleClickOutside = (e) => {
    const navbarContainer = navbarContainerRef.current;
    const navbarCollapsed = navbarCollapsedRef.current;
    if (
      !navbarContainer.contains(e.target) &&
      navbarCollapsed.classList.contains("show")
    ) {
      navbarTogglerRef.current.click();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <article ref={navbarContainerRef} className="navbar-container">
      <Navbar expand="lg" variant="dark">
        <Link to="/">
          <img className="navbar-logo" src={OptiStepLogo} alt="OptiStep-Logo" />
        </Link>

        <Navbar.Toggle
          ref={navbarTogglerRef}
          aria-controls="basic-navbar-nav"
        />

        <Navbar.Collapse id="basic-navbar-nav" ref={navbarCollapsedRef}>
          <Nav className="navbar-options os-hide-on-print">
            <Link to="/" className="os-txt os-txt-md px-1">
              Inicio
            </Link>

            <button className="px-1 os-btn" onClick={openAboutMeModal}>
              <label className="os-txt os-txt-md">Acerca de</label>
            </button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <AboutMeComp show$={showAboutModal$} setShow$={setShowAboutModal$} />
    </article>
  );
}
