import React from "react";
import mediaStyles from "./MediaScreen.module.css";
//import axios from "../../../utilities/axios";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HoverScreen from "../HoverScreen/HoverScreen";
import { image_base } from "../../../utilities/constants";
import { Link } from "react-router-dom";

const MediaScreen = ({ heading, slug, genre = -1, moveCount, data }) => {
  // console.log("data in ms", data);
  //const base_url = "https://image.tmdb.org/t/p/original/";
  var count = 0;

  const scrollToLeft = () => {
    document.getElementById("bannerDiv" + moveCount.toString()).scrollBy({
      left: -800,
    });
    if (count === -5.4) {
      count = -5;
    }
    count++;
    if (count > 0) {
      count = 0;
    }
  };
  const scrollToRight = () => {
    document.getElementById("bannerDiv" + moveCount.toString()).scrollBy({
      left: 800,
    });
    count--;
    // console.log("RIght count is ", count);
    if (count < -6) {
      count = -6;
    }
  };

  const setPosition = (item) => {
    var x = document.getElementById(`1${item.id}`);
    var divItem = document.getElementById(`2${item.id}`);
    if (divItem) {
      divItem.style.position = "absolute";
      divItem.style.top = parseInt(x.offsetTop, 10) + "px";
      divItem.style.left = parseInt(x.offsetLeft, 10) + count * 800 + "px";
    }
    return divItem.style;
  };

  const shuffleData = (arr) => {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  };
  if (data.length > 0) {
    shuffleData(data);
  }
  return (
    <div className={mediaStyles.mediaScreen}>
      <div className={mediaStyles.headingBanner}>
        <div>
          {" "}
          {heading}&nbsp;
          <Link style={{ color: "blue" }} to={`/category/media/${slug}`}>
            <span className={mediaStyles.moreButton}>See more</span>
          </Link>
        </div>
        {/* {genre > 0 ? (
          <Link href="/content/Mirzapur">
            <div className={mediaStyles.moreButton}>see more</div>
          </Link>
        ) : (
          <div></div>
        )} */}
      </div>

      <div className={mediaStyles.leftIconDiv} onClick={scrollToLeft}>
        <ChevronLeftIcon className={mediaStyles.leftIcon} fontSize="large" />
      </div>

      <Link
        to={`/content/abcd`}
        style={{ textDecoration: "none", color: "white" }}
      >
        <div
          className={mediaStyles.banner}
          id={"bannerDiv" + moveCount.toString()}
        >
          &nbsp;
          {data.map((item) => {
            return (
              <div key={item.slug}>
                {item.poster ? (
                  <div
                    className={mediaStyles.mediaDiv}
                    id={`1${item.id}`}
                    onMouseEnter={() => {
                      setPosition(item);
                    }}
                  >
                    <img
                      src={`${image_base}${item.poster}`}
                      alt={item.name}
                      className={mediaStyles.mediaImg}
                    />

                    <div
                      className={mediaStyles.displayhoverScreen}
                      id={`2${item.id}`}
                    >
                      <Link to={`content/${item.slug}`}>
                        <HoverScreen item={item} />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            );
          })}
        </div>
      </Link>
      <div className={mediaStyles.rightIconDiv} onClick={scrollToRight}>
        <ChevronRightIcon className={mediaStyles.rightIcon} fontSize="large" />
      </div>
    </div>
  );
};

export default MediaScreen;
