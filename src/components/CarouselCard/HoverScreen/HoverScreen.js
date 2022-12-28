import React, { useState } from "react";
import hoverStyles from "./HoverScreen.module.css";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ChatBubbleIcon from "@mui/icons-material/ChatBubbleOutline";
import { image_base } from "../../../utilities/constants";
import { Link } from "react-router-dom";

const HoverScreen = ({ item }) => {
  // let hours = 0,
  //   minutes = 0;
  // const [media, setMedia] = useState({});
  // const base_url = "https://image.tmdb.org/t/p/original/";
  // if (media.runtime && media.runtime > 0) {
  //   hours = Math.floor(media.runtime / 60);
  //   minutes = media.runtime % 60;
  // }
  return (
    <Link
      href={`/content/${item.type}/${item.slug}`}
      style={{ textDecoration: "none", color: "white" }}
    >
      <div className={hoverStyles.hoverScreen}>
        <>
          <img
            src={`${item.poster}`}
            alt={item.name}
            className={hoverStyles.mediaHoverImg}
          />
          <div className={hoverStyles.hoverData}>
            <div className={hoverStyles.hoverHeading}>
              <div className={hoverStyles.playDiv}>
                <div className={hoverStyles.playIcon}>
                  <PlayCircleFilledWhiteOutlinedIcon
                    className={hoverStyles.playButton}
                  />
                </div>
                <div className={hoverStyles.playtext}>Play</div>
              </div>
              <div>
                <AddOutlinedIcon className={hoverStyles.addIcon} />
              </div>
            </div>
            <div className={hoverStyles.title}>
              {item.title ? item.title : item.original_name}
            </div>
            <div className={hoverStyles.overview}>
              {item.description.length > 90
                ? item.description.substr(0, 89) + "..."
                : item.description}
            </div>
            <div className={hoverStyles.footerScreen}>
              <div className={hoverStyles.runTime}>
                {hours > 0 ? `${hours}h ` : ""}
                {minutes > 0 ? `${minutes}min` : ""}
              </div>
              <div className={hoverStyles.releaseYear}>
                {item.release_date ? item.release_date.substr(0, 4) : ""}
              </div>
              <div>
                <ChatBubbleIcon className={hoverStyles.messageIcon} />
              </div>
              <div className={hoverStyles.rated}>
                {item.adult ? "18+" : "ALL"}
              </div>
            </div>
          </div>
        </>
      </div>
    </Link>
  );
};

export default HoverScreen;
