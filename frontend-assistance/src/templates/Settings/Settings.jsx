import React, { useCallback, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Header from "../../components/header/Header";
import NavDrawer from "../../components/navDrawer/NavDrawer";
import maleImage from "../../assets/images/male-logo.png";
import femaleImage from "../../assets/images/female-logo.png";

import "./Settings.css";
import { useDispatch, useSelector } from "react-redux";
import { isObjectEmpty } from "../../utils/ObjectUtil";
import { COMPANION_TYPE, VOICES } from "../../constants/AppConstant";
import { chatService } from "../../services";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(voice, selectedVoice, theme) {
  return {
    fontWeight:
      selectedVoice.indexOf(voice) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Settings() {
  const [selectedCompanion, setselectedCompanion] = useState("Male");
  const [selectedVoice, setSelectedVoice] = React.useState(VOICES[0].name);
  const userProfile = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();
  const SYNTH = window.speechSynthesis;

  const theme = useTheme();
  const changeCompanion = (companion) => {
    setselectedCompanion(companion);
  };

  const handleChange = (event) => {
    setSelectedVoice(event.target.value);
  };

  const saveChanges = () => {
    const selectedVoiceObj = VOICES.filter(
      (voice) => voice.name === selectedVoice
    );
    const preferencePayload = { ...userProfile?.data };
    if (selectedVoiceObj.length) {
      preferencePayload.avatarPreference = selectedVoiceObj[0];
      dispatch(chatService.saveAvatarPreferences(preferencePayload));
    }
  };

  const testVoiceHandler = () => {
    VOICES.filter((voice) => voice.name === selectedVoice).map((voice) => {
      const text =
        "Hi " +
        (!isObjectEmpty(userProfile.data)
          ? userProfile?.data?.firstName
          : "there") +
        "! My name is " +
        voice.name +
        "";
      var utterance = new SpeechSynthesisUtterance(text);
      if (SYNTH.getVoices().length) {
        utterance.voice = SYNTH.getVoices()[voice.key];
        SYNTH.speak(utterance);
      } else {
        SYNTH.onvoiceschanged = () => {
          utterance.voice = SYNTH.getVoices()[voice.key];
          SYNTH.speak(utterance);
        };
      }
    });
  };
  return (
    <>
      <Header />
      <NavDrawer />
      <div className="settings__container">
        <div className="settings__title">
          <span>Choose your Companion's Persona</span>
        </div>
        <div className="settings__characters_block">
          <div
            className={`settings__characters_item ${
              selectedCompanion === COMPANION_TYPE.MALE && "settings__characters_selected"
            }`}
            onClick={() => changeCompanion(COMPANION_TYPE.MALE)}
          >
            <img src={maleImage} alt="logo" height={250} />
          </div>
          <div
            className={`settings__characters_item ${
              selectedCompanion === COMPANION_TYPE.FEMALE && "settings__characters_selected"
            }`}
            onClick={() => changeCompanion(COMPANION_TYPE.FEMALE)}
          >
            <img src={femaleImage} alt="logo" height={250} />
          </div>
        </div>
        <div className="generic__flexbox_center_div">
          <FormControl sx={{ m: 1, width: 600, marginTop: 5 }}>
            <InputLabel
              id="demo-multiple-name-label"
              sx={{ fontSize: 24, lineHeight: "1em" }}
            >
              Select a voice for your Companion
            </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={selectedVoice}
              onChange={handleChange}
              input={
                <OutlinedInput label="Select a voice for your Companion" />
              }
              MenuProps={MenuProps}
              sx={{ background: "white", fontSize: 24 }}
            >
              {VOICES.filter(
                (voice) => voice.companionType === selectedCompanion
              ).map((voice) => (
                <MenuItem
                  key={voice.key}
                  value={voice.name}
                  style={getStyles(voice.name, selectedVoice, theme)}
                >
                  {voice.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="generic__flexbox_center_div settings__btn_gap">
          <button
            className="settings__btn_testVoice"
            onClick={testVoiceHandler}
          >
            Test voice
          </button>
          <button className="settings__btn_saveVoice" onClick={saveChanges}>
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}

export default Settings;
