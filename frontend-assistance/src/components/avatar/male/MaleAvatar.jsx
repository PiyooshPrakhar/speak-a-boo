import React from "react";
import "./MaleAvatar.css";

const MaleAvatar = ({ displayNotes=true }) => (
  <div className="avatar-container">
    <div className="background-circle">
      <div className="body"></div>
    </div>
    <div className="head">
      <div className="ear" id="left"></div>
      <div className="ear" id="right"></div>
      <div className="hair-main">
        <div className="sideburn" id="left"></div>
        <div className="sideburn" id="right"></div>
        <div className="hair-top"></div>
      </div>
      <div className="face">
        <div className="hair-bottom"></div>
        <div className="nose"></div>
        <div className="eye-shadow" id="left">
          <div className="eyebrow"></div>
          <div className="eye"></div>
        </div>
        <div className="eye-shadow" id="right">
          <div className="eyebrow"></div>
          <div className="eye"></div>
        </div>
        <div className="mouth"></div>
        <div className="shadow-wrapper">
          <div className="shadow"></div>
        </div>
      </div>
    </div>
    {displayNotes && (
      <>
        <span className="music-note-male" id="one">
          &#128172;
        </span>
        <span className="music-note-male" id="two">
          &#128172;
        </span>
      </>
    )}
  </div>
);

export default MaleAvatar;
