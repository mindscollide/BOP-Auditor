import { useState } from "react";
import { Container, Nav, Dropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import BOPLogo from "../../../assets/images/BOPLogo-white.png";
import "./Header.css";

const Header = () => {
  return (
    <>
      <Container fluid className="container-header-2">
        <Navbar>
          <Container fluid>
            <Navbar.Brand>
              <img src={BOPLogo} width={200} alt="" />
            </Navbar.Brand>
            <Dropdown>
              <Dropdown.Toggle className="dropdown-toggle-header2">
                <p className="user-name-header2">Owais Wajid</p>
                <i className="icon-arrow-down"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown_menu-Header2">
                <Dropdown.Item>
                  <Nav.Link>
                    <i className="icon-settings me-1"></i>
                    <label className="dropdown-select-labels">Setting</label>
                  </Nav.Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <i class="icon-logout me-1"></i>
                  <label className="dropdown-select-labels">Logout</label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Navbar>
      </Container>
    </>
  );
};

export default Header;
