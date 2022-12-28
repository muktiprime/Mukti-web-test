/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import lanStyles from "../LanguageSlider/languageSlider.module.css";
import sliderStyles from "../Slider/Slider.module.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import RemoveIcon from "@mui/icons-material/Remove";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "@ntegral/react-owl-carousel";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { GiCancel } from "react-icons/gi";
import { image_base } from "../../utilities/constants";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Link } from "react-router-dom";
import { getRequest, postRequest } from "../../utilities/ApiCall";
import Context from "../../context_api/global";

const RecentContinue = (props) => {
  const { contentContinue } = useContext(Context);

  const deleteFunc = async (id) => {
    const body = {
      id: id,
    };
    try {
      const response = await postRequest(
        `/content/continue/`,
        JSON.stringify(body),
        "DELETE",
        true
      );
      contentContinue();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <div className={sliderStyles.mediaScreen}>
          <div className={sliderStyles.bannerContinueCard}>
            <OwlCarousel
              className="owl-theme"
              margin={5}
              autoWidth={true}
              dots={false}
              nav
              items={5}
            >
              {props.data.map((item, index) => (
                <div key={index} className={sliderStyles.carouSearchCard}>
                  <div key={item.slug}>
                    <div className={sliderStyles.card1} id={item.id}>
                      <div>
                        <Link
                          to={`/player/${item.content.type}/${item.video.slug}`}
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          {item.poster_url ? (
                            <img
                              className={sliderStyles.image}
                              src={item.content.poster_url}
                              alt={item.name}
                            />
                          ) : (
                            <img
                              className={sliderStyles.image}
                              src={`${item.content.poster_url}`}
                              alt={item.name}
                            />
                          )}
                        </Link>
                      </div>

                      <div
                        className={sliderStyles.displayhoverScreenSearchCard}
                      >
                        <div className={sliderStyles.hoverHeading}>
                          <div className={sliderStyles.playDiv}>
                            <Link
                              to={`/player/${item.content.type}/${item.video.slug}`}
                            >
                              <div className={sliderStyles.playIcon}>
                                <PlayCircleFilledWhiteOutlinedIcon
                                  className={sliderStyles.playButton}
                                />
                              </div>
                            </Link>
                            <div className={sliderStyles.playtext}>Play</div>
                          </div>
                          <div
                            className={sliderStyles.addIcon2}
                            onClick={() => deleteFunc(item.id)}
                          >
                            <RemoveCircleIcon
                              className={sliderStyles.addIcon}
                            ></RemoveCircleIcon>
                          </div>
                        </div>
                        <div>
                          <Link
                            to={`/player/${item.content.type}/${item.video.slug}`}
                            style={{ textDecoration: "none", color: "white" }}
                          >
                            <h4 className={sliderStyles.title}>
                              {item.content.title}
                            </h4>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={sliderStyles.mediaSection}
                    onClick={() => deleteFunc(item.id)}
                  >
                    <RemoveIcon className={sliderStyles.iconRemove} />
                  </div>
                </div>
              ))}

              {/* {props.data.map((item, index) => (
            <div key={index} className={lanStyles.carouCont}>
              <div className={lanStyles.content}>
                <div>
                  <img
                    src={`${image_base}/${item.content.poster_url}`}
                    className={lanStyles.imagCont}
                  />

                  <div className={lanStyles.cutAction} onClick={() => (deleteFunc(item.id))}>
                    <GiCancel />
                  </div>
                  <Link to={`/player/${item.content.type}/${item.video.slug}`} style={{ padding: 30, }} className={lanStyles.contentSec}></Link>
                  {
                    <div className={lanStyles.contentSec}>
                      {item.content.title}
                    </div>
                  }{" "}
                </div>
              </div>
            </div>
          ))} */}
            </OwlCarousel>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentContinue;
