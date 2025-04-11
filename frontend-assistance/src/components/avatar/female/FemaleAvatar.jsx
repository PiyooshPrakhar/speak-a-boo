import React from "react";
import "./FemaleAvatar.css";

const FemaleAvatar = ({ displayNotes = true }) => (
  <div className="avatar-container">
    <div id="circlecon-outer">
      <div id="circlecon">
        <div id="head">
          <div id="hairpiece-back1"></div>
          <div id="hairpiece-back2"></div>
          <div id="hairpiece-back3"></div>
          <div id="hairpiece-back4"></div>
          <div id="hairpiece-back5"></div>
          <div id="hairpiece-back6"></div>
          <div id="hairpiece-back7"></div>
          <div id="hairpiece-back8"></div>
          <div id="hairpiece-back9"></div>
          <div id="hairpiece-back10"></div>
          <div id="hairpiece-back11"></div>
          <div id="hairpiece-back12"></div>
          <div id="hairpiece-back13"></div>
          <div id="hairpiece-back14"></div>
          <div id="facecontainer">
            <div id="earring-left"></div>
            <div id="earring-right"></div>
            <div id="nose"></div>
            <div id="mouth">
              <div id="tongue"></div>
            </div>
            <div id="eyeleft"></div>
            <div id="eyeright"></div>
            <div id="glasseslens-left"></div>
            <div id="glasseslens-right"></div>
            <div id="glasses-bridge"></div>
            <div id="hairpiece-front1"></div>
            <div id="hairpiece-front2"></div>
            <div id="hairpiece-front3"></div>
            <div id="hairpiece-front4"></div>
            <div id="hairpiece-front5"></div>
          </div>
        </div>
        <div id="shoulderouter">
          <div id="shouldershirt"></div>
        </div>
        <div id="neck"></div>
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

export default FemaleAvatar;
