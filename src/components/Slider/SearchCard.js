/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import sliderStyles from "./Slider.module.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { api_url, image_base } from "../../utilities/constants";
import { Link } from "react-router-dom";
import {
  is_client,
  is_logged_in,
  loginCheck,
  setCookies,
} from "../../utilities/auth";

const SearchCard = ({ heading, slug, category = "media", moveCount, data }) => {
  // console.log("Language/Generes", props);
  // console.log("slider_data", data);
  const [islogg, setIsLogg] = useState(loginCheck);

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
      <ToastContainer
        position={islogg ? "top-center" : "top-right"}
        hideProgressBar="false"
      />

      <div className={sliderStyles.mediaScreen}>
        <div className={sliderStyles.banner}>
          {data.map((item, id) => {
            return (
              <div key={id} className={sliderStyles.carouSearchCard}>
                <div key={item.slug}>
                  <div className={sliderStyles.card1} id={item.id}>
                    <div>
                      <Link
                        to={`/content/${item.type}/${item.slug}`}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        {item.PosterUrl ? (
                          <img
                            className={sliderStyles.image}
                            src={`${item.PosterUrl}`}
                            alt={item.name}
                          />
                        ) : (
                          <img
                            className={sliderStyles.image}
                            src={item.poster}
                            alt={item.name}
                          />
                        )}
                      </Link>
                    </div>
                    <div className={sliderStyles.displayhoverScreenSearchCard}>
                      <div className={sliderStyles.hoverHeading}>
                        <div className={sliderStyles.playDiv}>
                          <div className={sliderStyles.playIcon}>
                            <PlayCircleFilledWhiteOutlinedIcon
                              className={sliderStyles.playButton}
                            />
                          </div>
                          <div className={sliderStyles.playtext}>Play</div>
                        </div>
                        <div
                          className={sliderStyles.addIcon2}
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
                          {" "}
                          <h4 className={sliderStyles.title}>
                            {item.title.length > 29
                              ? item.title.substr(0, 28) + "..."
                              : item.title}

                            {/* {item.title ? item.title : item.original_name}{" "} */}
                          </h4>
                          {/* <p className={sliderStyles.overview}>
                          {item.description.length > 90
                            ? item.description.substr(0, 89) + "..."
                            : item.description}
                        </p> */}
                          <div className={sliderStyles.footerScreen}>
                            {/* <div className={sliderStyles.releaseYear}>
                            {item.released}{" "}
                          </div> */}

                            {/* <div className={sliderStyles.rated}>
                            {item.age_limit}+
                          </div> */}
                            <div></div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
