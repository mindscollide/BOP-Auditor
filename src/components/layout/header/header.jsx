import { Nav, Dropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import BOPLogo from "../../../assets/images/logo-white.png";
import "./header.css";

const Header = () => {
  const onClickSetting = () => {};

  const handleLogout = () => {};
  return (
    <>
      <section fluid className="container-header-2">
        <Navbar>
          <Navbar.Brand>
            <img src={BOPLogo} width={200} alt="" />
          </Navbar.Brand>
          <Dropdown className="headerDropdown">
            <Dropdown.Toggle className="dropdown-toggle-header2">
              <p className="user-name-header2">
                {"Michel Jawn"}

                {/* {localStorage.getItem("userName")} */}
              </p>
              <i className="icon-arrow-down"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown_menu-Header2">
              <Dropdown.Item>
                <Nav.Link>
                  <i className="icon-settings me-1"></i>
                  <label
                    className="dropdown-select-labels"
                    onClick={onClickSetting}
                  >
                    Setting
                  </label>
                </Nav.Link>
              </Dropdown.Item>

              <Dropdown.Item onClick={handleLogout}>
                <i className="icon-logout me-1"></i>
                <label className="dropdown-select-labels">Logout</label>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar>
      </section>
    </>
  );
};

export default Header;
