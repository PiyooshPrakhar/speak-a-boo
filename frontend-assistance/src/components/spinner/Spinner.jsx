import React from "react";
import './Spinner.css';

function Spinner() {
  return (
    <div className="spinner__container">
      <div className="spinner__square">
        <div className="spinner__square-1 spinner__square"></div>
        <div className="spinner__square-2 spinner__square"></div>
        <div className="spinner__square-3 spinner__square"></div>
      </div>
    </div>
  );
}

export default Spinner;
