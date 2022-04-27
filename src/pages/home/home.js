import React, { useState, useEffect } from "react";
import "./home.css";
import Navbar from "../../Components/navbar/navbar";
import ImagesCarousel from "../../Components/carousel/carousel";

let selectedOptions = [];
export default function Home() {
  const [options, setOptions] = useState([]);

  const handleClick = (resp) => {
    selectedOptions.push(resp);
    setOptions([...selectedOptions]);
  };

  useEffect(() => {}, [options]);

  const deleteOption = (element) => {
    let filtered = [...selectedOptions];
    const index = filtered.findIndex((el) => {
      return el.label === element.label;
    });
    if (index !== -1) {
      filtered.splice(index, 1);
      document.getElementById(`${element.label}`).style.pointerEvents = "auto";
      if (element.type === "designStyle")
        document.getElementById(`${element.label}`).style.backgroundColor =
          "#EEEEEE";
      else
        document.getElementById(`${element.label}`).style.backgroundColor =
          "white";
    }
    selectedOptions = [...filtered];
    setOptions([...selectedOptions]);
  };

  const buttonClear = () => {
    selectedOptions.forEach((el) => {
      document.getElementById(`${el.label}`).style.pointerEvents = "auto";
      if (el.type === "designStyle")
        document.getElementById(`${el.label}`).style.backgroundColor =
          "#EEEEEE";
      else
        document.getElementById(`${el.label}`).style.backgroundColor = "white";
    });
    const clearArray = [];
    clearArray.length = 0;
    setOptions(clearArray);
    selectedOptions = clearArray;
  };

  return (
    <div>
      <header className="filter-houses">
        <h5>Filter by:</h5>
        <Navbar onHandle={handleClick} />
        <div className="filter-results">
          {options.map((el) => {
            return (
              <div className="filter-options" key={el.label}>
                <span className="options-label">{el.label}</span>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    deleteOption(el);
                  }}
                >
                  <i className="fas fa-times-circle icon-cancel"></i>
                </a>
              </div>
            );
          })}
        </div>
        <button className="button-clear" onClick={buttonClear}>
          Clear all
        </button>
      </header>
      <section className="">
        <ImagesCarousel params={options} />
      </section>
    </div>
  );
}
