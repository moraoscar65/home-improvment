import React, { useState, useEffect, useCallback } from "react";
import { Carousel } from "react-bootstrap";
import "./carousel.css";
import JSONDATA from "../../data.json";

export default function ImagesCarousel({ params }) {
  let start = -3;
  let finish = 3;
  const [dataFiltered, setDataFiltered] = useState([]);
  const [pages, setPages] = useState([]);
  const { data } = JSONDATA;
  let designSelected = false;

  const filterData = useCallback(
    (params) => {
      if (Array.isArray(params) && params.length) {
        const filtered = [...data];
        let dataSearch = filtered.filter((el) => {
          for (let f in params) {
            if (params[f].type === "designStyle") {
              for (let i in el.metaData.designStyle) {
                if (el.metaData.designStyle[i] === params[f].id)
                  return el.metaData.designStyle[i] === params[f].id;
              }
            } else designSelected = true;
          }
        });
        if (
          Array.isArray(dataSearch) &&
          dataSearch.length &&
          designSelected === true
        ) {
          dataSearch = dataSearch.filter((el) => {
            for (let f in params) {
              if (params[f].type === "qualityStandard") {
                for (let i in el.metaData.qualityStandard) {
                  if (el.metaData.qualityStandard[i] === params[f].id)
                    return el.metaData.qualityStandard[i] === params[f].id;
                }
              }
            }
          });
        } else {
          if (designSelected === true) {
            dataSearch = filtered.filter((el) => {
              for (let f in params) {
                if (params[f].type === "qualityStandard") {
                  for (let i in el.metaData.qualityStandard) {
                    if (el.metaData.qualityStandard[i] === params[f].id)
                      return el.metaData.qualityStandard[i] === params[f].id;
                  }
                }
              }
            });
          }
        }
        designSelected = false;
        start = -3;
        finish = 3;
        const totalPages = new Array(Math.ceil(dataSearch.length / 6)).fill(1);
        setPages(totalPages);
        return dataSearch;
      }
    },
    [data]
  );

  useEffect(() => {
    setDataFiltered(filterData(params));
  }, [filterData, params]);

  return (
    <div>
      {Array.isArray(dataFiltered) && dataFiltered.length && (
        <Carousel
          prevIcon={
            <div className="icon-size">
              <i className="fas fa-chevron-left fa-10x prev-icon"></i>
            </div>
          }
          nextIcon={
            <div className="icon-size">
              <i className="fas fa-chevron-right fa-10x next-icon"></i>
            </div>
          }
          interval={null}
          className="w-90 carousel-container"
        >
          {pages.map((element, Pages) => {
            start += 3;
            finish += 3;
            return (
              <Carousel.Item className="item-carousel" key={Math.random()}>
                <div className="image-below w-100">
                  {dataFiltered.slice(start, finish).map((el, position) => {
                    let classImg = "";
                    position === 0 || position === 5
                      ? (classImg = "w-50")
                      : (classImg = "w-25");
                    return (
                      <span key={el._id}>
                        <img
                          className={`${classImg} single-image`}
                          src={`../../../public/${el.imageKey}`}
                          alt="image"
                        />
                      </span>
                    );
                  })}
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      )}
    </div>
  );
}
