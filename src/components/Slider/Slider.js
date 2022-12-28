/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import sliderStyles from "./Slider.module.css";
import OwlCarousel from "@ntegral/react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api_url, image_base } from "../../utilities/constants";
import { Link } from "react-router-dom";
import {
  is_client,
  is_logged_in,
  loginCheck,
  setCookies,
} from "../../utilities/auth";
const Slider = ({ heading, slug, category = "media", moveCount, data }) => {
  // console.log("Language/Generes", props);

  const [islogg, setIsLogg] = useState(loginCheck);

  // console.log("play_data", data);

  // useEffect(async () => {
  //   setIsLogg(await loginCheck());

  // }, []);
  //add to watchlist
  const addtoWatch = async (row) => {
    if (loginCheck()) {
      const datas = {
        slug: row.slug,
        content_type: row.type,
      };

      const cookies = parseCookies();
      const tok = JSON.parse(cookies.muktiprimeToken);
      const res = await fetch(`${api_url}/content/watchlist/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tok.access}`,
        },
        body: JSON.stringify(datas),
      });
      const response = await res.json();

      toast.dark(response.message);
    } else {
      toast.error("Please Login to continue");
    }
  };

  return (
    <div>
      {/* === New Carousel ===*/}
      <ToastContainer
        position={islogg ? "top-center" : "top-right"}
        hideProgressBar="false"
      />
      <div className={sliderStyles.headingBanner}>
        <div>
          {heading}&nbsp;
          <Link style={{ color: "blue" }} to={`/category/${category}/${slug}`}>
            <span className={sliderStyles.moreButton}>See more</span>
          </Link>
        </div>
      </div>

      <div style={{ marginLeft: "3%" }}>
        <OwlCarousel
          className="owl-theme"
          loop={false}
          margin={5}
          autoWidth={true}
          dots={false}
          nav
          items={4}
        >
          {data.map((item, id) => {
            return (
              <div key={id} className={sliderStyles.carou}>
                <div key={item.slug}>
                  <div className={sliderStyles.card1} id={item.id}>
                    <div>
                      <Link
                        to={`/content/${item.type}/${item.slug}`}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        {item.poster === "" ? (
                          <img
                            className={sliderStyles.image}
                            style={{ objectFit: "contain" }}
                            src={require("../../assets/img/logo.png")}
                            alt={item.name}
                          />
                        ) : (
                          <img
                            className={sliderStyles.image}
                            src={`${item.poster}`}
                            alt={item.name}
                          />
                        )}
                      </Link>
                    </div>
                    <div className={sliderStyles.displayhoverScreen}>
                      <div className={sliderStyles.hoverHeading}>
                        <Link to={`/content/${item.type}/${item.slug}`}>
                          <div className={sliderStyles.playDiv}>
                            <div className={sliderStyles.playIcon}>
                              <PlayCircleFilledWhiteOutlinedIcon
                                className={sliderStyles.playButton}
                              />
                            </div>
                            <div className={sliderStyles.playtext}>Play</div>
                          </div>{" "}
                        </Link>
                        <div
                          className={sliderStyles.addIcon1}
                          onClick={() => addtoWatch(item)}
                        >
                          <AddOutlinedIcon
                            className={sliderStyles.addIcon}
                          ></AddOutlinedIcon>
                          <span className={sliderStyles.tooltiptext}>
                            {islogg ? "Add to watchlist" : "Login to continue"}
                          </span>
                        </div>
                      </div>
                      <div>
                        <Link
                          to={`/content/${item.type}/${item.slug}`}
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          <h4 className={sliderStyles.title}>
                            {item.title.length > 29
                              ? item.title.substr(0, 28) + "..."
                              : item.title}

                            {/* {item.title ? item.title : item.original_name}{" "} */}
                          </h4>
                          <p className={sliderStyles.overview}>
                            {item.description.length > 90
                              ? item.description.substr(0, 89) + "..."
                              : item.description}
                          </p>
                          <div className={sliderStyles.footerScreen}>
                            {/* <div className={sliderStyles.runTime}>
                            
                            {item.length}{" "}
                          </div> */}
                            <div className={sliderStyles.releaseYear}>
                              {item.released}{" "}
                            </div>
                            {/* <div className={sliderStyles.messageIcon}>
                            <ChatBubbleIcon
                              className={sliderStyles.messageIcon}
                            />
                          </div> */}
                            <div className={sliderStyles.rated}>
                              {item.age_limit}+
                            </div>
                            <div>
                              <p
                                style={{
                                  fontSize: "13px",
                                  textAlign: "center",
                                }}
                              >
                                {" "}
                                {item.lang === "" ? null : (
                                  <>
                                    {" "}
                                    <span>{item.lang}</span>{" "}
                                  </>
                                )}
                              </p>{" "}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </OwlCarousel>
      </div>
    </div>
  );
};

export default Slider;
