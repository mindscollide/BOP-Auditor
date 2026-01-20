import React, { useEffect, useState } from "react";
import { Checkbox, Switch } from "antd";
import "./SettingsModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "../../components/elements";
import { Col, Row } from "react-bootstrap";
import {
  GetUserSettingsAuditorAPI,
  SaveUserSettingsAuditorAPI,
} from "../../store/SlicerAction/SlicerAction";
const SettingsModal = ({ SettingModalState, setSettingModalState }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Extracting the Get User Settings data from UseSelector
  const GetUserSettings = useSelector(
    (state) => state.SettingReducer.getUserSettingsData
  );

  console.log(GetUserSettings, "GetUserSettingsGetUserSettings");
  const [settingUser, setSettingUser] = useState(true);
  const [passcodeSetting, setPasscodeSetting] = useState(false);
  const [settingsRecord, setSettingRecords] = useState({
    BD_Enable2FA: false,
    BD_SoundOnEveryMessage: false,
    BD_EmailOnEveryMessage: false,
  });

  // Make An API Call for Settings
  useEffect(() => {
    dispatch(GetUserSettingsAuditorAPI({ navigate }));
  }, []);

  //Extract Settings Data
  useEffect(() => {
    if (GetUserSettings !== null) {
      try {
        const { userSettingsList } = GetUserSettings;
        if (userSettingsList.length > 0) {
          const newSettings = {};

          userSettingsList.forEach((settingData) => {
            newSettings[settingData.configKey] = JSON.parse(
              settingData.configValue
            );
          });

          setSettingRecords((prevSettings) => ({
            ...prevSettings,
            ...newSettings,
          }));
        }
      } catch (error) {
        console.error("Error setting user settings:", error);
      }
    }
  }, [GetUserSettings]);

  const onCloseButton = () => {
    setSettingModalState(false);
  };

  const onClickSettingUser = () => {
    setSettingUser(true);
    setPasscodeSetting(false);
  };

  const onClickPasscodeSetting = () => {
    setSettingUser(false);
    setPasscodeSetting(true);
  };

  // Checkbox for Chat Panal Overlap and Sound on every personal message
  const onChangeCheckbox = (e) => {
    console.log("e.target.checked,", e.target.checked);
    if (e.target.name === "chatPannal") {
      setSettingRecords({
        ...settingsRecord,
        BD_EmailOnEveryMessage: e.target.checked,
      });
    } else if (e.target.name === "soundOnEveryMessage") {
      setSettingRecords({
        ...settingsRecord,
        BD_SoundOnEveryMessage: e.target.checked,
      });
    }
  };

  // radio button for Two factor authentication
  const onChangeSwitch = (e) => {
    setSettingRecords({
      ...settingsRecord,
      BD_Enable2FA: e,
    });
    console.log(`switch to ${e}`);
  };

  const UpdateButtonOnClick = () => {
    try {
      let updateData = {
        Settings: [
          {
            Key: "BD_EmailOnEveryMessage",
            Value: String(settingsRecord.BD_EmailOnEveryMessage),
          },
          {
            Key: "BD_SoundOnEveryMessage",
            Value: String(settingsRecord.BD_SoundOnEveryMessage),
          },
          {
            Key: "BD_Enable2FA",
            Value: String(settingsRecord.BD_Enable2FA),
          },
        ],
      };
      // Make An API Call for Update Settings
      dispatch(SaveUserSettingsAuditorAPI({ navigate, updateData }));
    } catch (error) {
      console.log(error, "errorerror");
    }
  };
  return (
    <>
      <Modal
        show={SettingModalState}
        setShow={setSettingModalState}
        className="modaldialog modal-setting-styles"
        modalHeaderClassName={"header-setting-Modal-close-btn"}
        modalFooterClassName={"modal-footer-setting"}
        size="lg"
        onHide={onCloseButton}
        ModalBody={
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-start gap-1"
              >
                <Button
                  value="User Setting"
                  onClick={onClickSettingUser}
                  className={
                    settingUser
                      ? `${"setting-button-modal"}`
                      : `${"setting-button-disabled"}`
                  }
                />
                <Button
                  value="Passcode Setting"
                  onClick={onClickPasscodeSetting}
                  className={
                    passcodeSetting
                      ? `${"setting-button-modal"}`
                      : `${"setting-button-disabled"}`
                  }
                />
              </Col>
            </Row>

            {settingUser ? (
              <>
                <Row className="mt-4">
                  <Col className="checkbox-border">
                    <Checkbox
                      name="chatPannal"
                      checked={settingsRecord.BD_EmailOnEveryMessage}
                      onChange={onChangeCheckbox}
                    >
                      Chat Panel Overlap
                    </Checkbox>
                  </Col>
                </Row>
                <Row>
                  <Col className="checkbox-border">
                    <Checkbox
                      name="soundOnEveryMessage"
                      checked={settingsRecord.BD_SoundOnEveryMessage}
                      onChange={onChangeCheckbox}
                    >
                      Sound on every personal message
                    </Checkbox>
                  </Col>
                </Row>
              </>
            ) : passcodeSetting ? (
              <>
                <div className="border-line-passcode">
                  <Row>
                    <Col
                      lg={6}
                      md={6}
                      sm={12}
                      className="d-flex justify-content-start"
                    >
                      <p className="two-factor-text">
                        Two Factor Authentication
                      </p>
                    </Col>
                    <Col
                      lg={6}
                      md={6}
                      sm={12}
                      className="d-flex justify-content-end"
                    >
                      <Switch
                        name="twoFactorAuth"
                        checked={settingsRecord.BD_Enable2FA}
                        value={settingsRecord.BD_Enable2FA}
                        onChange={onChangeSwitch}
                      />
                    </Col>
                  </Row>
                </div>
              </>
            ) : null}
          </>
        }
        ModalFooter={
          <>
            <Row className="mb-3">
              <Col lg={12} md={12} sm={12} className="footer-btn-col">
                <Button
                  value="Save"
                  className="update-btn-editModal"
                  onClick={UpdateButtonOnClick}
                />
              </Col>
            </Row>
          </>
        }
      />
    </>
  );
};

export default SettingsModal;
