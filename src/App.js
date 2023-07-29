import React, { useEffect } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCode, faBookOpen, faBriefcase, faL, faHouse, faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import MeAsAPerson from './MeAsAPerson';
import MyEducation from './MyEducation';
import Blog from './Blog';
import Guestbook from './Guestbook';
import SnakeGame from './SnakeGame';

function App() {
  useEffect(() => {
    var background = document.querySelector('.background');
    var scrollPosition = window.scrollY;

    function zoomBackground() {
      var newScale = 1 + scrollPosition * 0.0005; // Adjust the scaling factor as needed
      background.style.transform = 'scale(' + newScale + ')';
    }

    window.addEventListener('scroll', function () {
      scrollPosition = window.scrollY;
      zoomBackground();
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="background"></div>
        <Navbar bg="transparent" variant="light" expand="lg" className="menubar-top">
          <div className="navbar-brand" style={{ pointerEvents: 'none' }}>
            <FontAwesomeIcon icon={faCode} className="logo" />
            kimaasen.no
          </div>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="ml-auto custom-nav">
              <Nav className="ml-auto">
                <Link to="/" className="nav-link">
                  <FontAwesomeIcon icon={faHouse} className="mr-2" />
                  Home
                </Link>
                <NavDropdown
                  title={
                    <span>
                      <FontAwesomeIcon icon={faUser} className="mr-2" />
                      About Me
                    </span>
                  }
                  id="aboutMeDropdown"
                  className="custom-dropdown"
                >
                  <NavDropdown.ItemText className="dropdown-header">Personal</NavDropdown.ItemText>
                  <NavDropdown.Item as={Link} to="/measaperson">
                    <div className="dropdown-item-wrapper">
                      <FontAwesomeIcon icon={faUser} className="mr-2" />
                      <span>Me as a person</span>
                    </div>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.ItemText className="dropdown-header">Professional</NavDropdown.ItemText>
                  <NavDropdown.Item as={Link} to="/myeducation">
                    <div className="dropdown-item-wrapper">
                      <FontAwesomeIcon icon={faBuildingColumns} className="mr-2" />
                      <span>My education</span>
                    </div>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="https://www.linkedin.com/in/kaaasen/" target="_self" rel="noopener noreferrer">
                    <div className="dropdown-item-wrapper">
                      <FontAwesomeIcon icon={faL} className="mr-2" />
                      <span className="ml-auto">LinkedIn</span>
                    </div>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.ItemText className="dropdown-header">Get in touch</NavDropdown.ItemText>
                  <NavDropdown.Item as={Link} to="/guestbook">
                    <div className="dropdown-item-wrapper">
                      <FontAwesomeIcon icon={faBookOpen} className="mr-2" />
                      <span>Guestbook</span>
                    </div>
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title={
                    <span>
                      <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                      My Projects
                    </span>
                  }
                  id="projectsDropdown"
                  className="custom-dropdown"
                >
                  <NavDropdown.ItemText className="dropdown-header">Frontend</NavDropdown.ItemText>
                  <NavDropdown.Item
                    href="https://github.com/kaaasen/JavaScript"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faCode} className="mr-2" />
                    JavaScript
                  </NavDropdown.Item>
                  <NavDropdown.Divider />

                  <NavDropdown.ItemText className="dropdown-header">Backend</NavDropdown.ItemText>
                  <NavDropdown.Item
                    href="https://github.com/kaaasen/Python"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faCode} className="mr-2" />
                    Python
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="https://github.com/kaaasen/Java"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faCode} className="mr-2" />
                    Java
                  </NavDropdown.Item>
                  <NavDropdown.Divider />

                  <NavDropdown.ItemText className="dropdown-header">Fullstack</NavDropdown.ItemText>
                  <NavDropdown.Item
                    href="https://github.com/kaaasen/React"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faCode} className="mr-2" />
                    React
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Blog />} exact />
            <Route path="/measaperson" element={<MeAsAPerson />} />
            <Route path="/myeducation" element={<MyEducation />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/guestbook" element={<Guestbook />} />
            <Route path="/snakegame" element={<SnakeGame />} />
            {/* Define your other routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
