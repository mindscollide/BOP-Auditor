import { Nav, Dropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import BOPLogo from "../../../assets/images/logo-white.png";
import "./header.css";
import { useState } from "react";
import SettingsModal from "../../../container/Modals/SettingsModal";

const Header = () => {
  const [SettingModalState, setSettingModalState] = useState(false);

  const onClickSetting = () => {
    setSettingModalState(true);
  };

  const handleLogout = () => {
    //Call Logout API
    // dispatch(LogOutAPI(navigate));
  };
  return (
    <>
      <section className="container-header-2">
        <Navbar>
          <Navbar.Brand>
            <img src={BOPLogo} width={200} alt="" />
          </Navbar.Brand>
          <Dropdown>
            <Dropdown.Toggle className="dropdown-toggle-header2">
              <p className="user-name-header2">
                {localStorage.getItem("ldapAccount")}
              </p>
              <i className="icon-arrow-down dropdown-style"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown_menu-Header2">
              <Dropdown.Item
                className="dropdown_menu-Item"
                onClick={onClickSetting}
              >
                <Nav.Link>
                  <i className="icon-settings me-1 header-icon-style"></i>
                  <label className="dropdown-select-labels">Setting</label>
                </Nav.Link>
              </Dropdown.Item>

              <Dropdown.Item
                className="dropdown_menu-Item"
                onClick={handleLogout}
              >
                <i className="icon-logout me-1 header-icon-style"></i>
                <label className="dropdown-select-labels">Logout</label>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar>
        {SettingModalState ? (
          <SettingsModal
            SettingModalState={SettingModalState}
            setSettingModalState={setSettingModalState}
          />
        ) : null}
      </section>
    </>
  );
};

export default Header;
