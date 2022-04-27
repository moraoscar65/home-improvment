import React, { useState } from "react";
import "./navbar.css";
import JSONDATA from "../../data.json";

export default function Navbar({ onHandle }) {
  const { designStyle, qualityStandard } = JSONDATA;

  const checkedItem = (res) => {
    document.getElementById(`${res.label}`).style.pointerEvents = "none";
    document.getElementById(`${res.label}`).style.backgroundColor = "#8b8b8b";
    onHandle(res);
  };

  return (
    <div className="menu">
      <button className="dropbtn">
        <i className="fas fa-sliders-h icon-slider"></i>
      </button>
      <div className="content-menu">
        <div className="rows">
          <div className="columns column1">
            <h5>Style</h5>
            {designStyle.map((singleStyle) => {
              return (
                <a
                  key={singleStyle.label}
                  id={singleStyle.label}
                  onClick={(e) => {
                    e.preventDefault();
                    e.target.classList.add("checked-option");
                    Object.defineProperty(singleStyle, "type", {
                      value: "designStyle",
                    });
                    checkedItem(singleStyle);
                  }}
                >
                  {singleStyle.label}
                </a>
              );
            })}
          </div>
          <div className="columns column2">
            <h5>Quality</h5>
            {qualityStandard.map((singleQuality) => {
              return (
                <a
                  key={singleQuality.label}
                  id={singleQuality.label}
                  onClick={(e) => {
                    e.preventDefault();
                    Object.defineProperty(singleQuality, "type", {
                      value: "qualityStandard",
                    });
                    //singleQuality[type]="qualityStandard"
                    checkedItem(singleQuality);
                  }}
                >
                  {singleQuality.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
