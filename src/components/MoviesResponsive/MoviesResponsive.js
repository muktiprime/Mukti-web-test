import React, { Component, useState } from "react";
import responsiveStyles from "./moviesResponsive.module.css";
import ListIcon from "@mui/icons-material/List";
import Whatsapp from "@mui/icons-material/WhatsApp";
import { Link } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import ListCard from "../../components/ListCard/ListCard";
import ShareIcon from "@mui/icons-material/Share";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import ThumbUp from "@mui/icons-material/ThumbUp";
import { toast } from "react-toastify";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import "react-toastify/dist/ReactToastify.css";
import EpisodeResponsive from "../SuggestEpisode/EpisodeResponsive";
// import { useRouter, withRouter } from "next/router";
import { api_url, image_base } from "../../utilities/constants";
import axios from "../../utilities/axios";
import Modal from "react-bootstrap/Modal";
import {
  is_client,
  is_logged_in,
  loginCheck,
  setCookies,
} from "../../utilities/auth";

import { ShareSocial } from "react-share-social";

const style = {
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  borderRadius: 3,
  border: 0,
  color: "white",
  padding: "0 30px",
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
};

const Content = styled.div`
  ${(props) => (props.active ? "" : "display:none")}
`;
const TabResponsive = styled.span`
  text-align: center;
  font-size: 21px;
  font-weight: 600;
  margin-right: 40px;
  border-bottom: ${(props) => (props.active ? "2px solid white" : "")};
  color: ${(props) => (props.active ? "white" : "rgb(129, 151, 164)")};

  :hover {
    color: white;
  }
`;

export default function MoviesResponsive(props, { videotype }) {
  const [active, setActive] = useState(0);
  const [show, setShow] = useState(false);

  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const type = props.content_data.category[0];

  //add to watchlist
  const addToWatchlist = async () => {
    // console.log("hello error");
    if (loginCheck()) {
      const data = {
        slug: props.content_data.slug,
        content_type: props.videotype,
      };

      const cookies = parseCookies();
      const tok = JSON.parse(cookies.muktiprimeToken);
      const res = await fetch(`${api_url}/content/watchlist/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tok.access}`,
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();

      // console.log("add to watchlist", response);
      toast.dark(response.message);
    } else {
      toast.error("Please Login to Continue");
    }
  };

  return (
    <>
      {/* <ToastContainer style={{ zIndex: "111111" }}  positon="top-center"/> */}
      <div className={responsiveStyles.bg_cover_responsive}>
        <div style={{ position: "relative" }}>
          {/* {props.videoplayer ? (
						<video
                                autoPlay="on"
                                controlsList="nofullscreen nodownload"
                                className={responsiveStyles.xs}
                                // width="320" height="240"
                                // style={{'object-fit':'cover'}}
                                muted
                                loop
                                // controls
                                // preload="auto"
                                preload={'metadata'}
							// style={{ height: "100px" }}
						>
							<source
								src={props.content_data.banner_video}
								type="video/mp4"
							/>
							Your browser does not support the video tag.
						</video>
					) : (
						<img alt='banner' src={props.content_data.bannerUrl} />
					)} */}
          <img alt="banner" src={props.content_data.bannerUrl} />
          <div className={responsiveStyles.image_grad1}></div>
          <div className={responsiveStyles.image_grad2}></div>
          <div className={responsiveStyles.title_detail}>
            {props.content_data.title}
          </div>
        </div>
        <div className={responsiveStyles.playSection}>
          {props.content_data["series_videos"] ? (
            <Link to={`/player/${props.videotype}/${props.serieslink}`}>
              <PlayArrowIcon className={responsiveStyles.play_button} />
            </Link>
          ) : (
            <Link to={`/player/${props.videotype}/${props.movieLink}`}>
              <PlayArrowIcon className={responsiveStyles.play_button} />
            </Link>
          )}
          <div className={responsiveStyles.playtext}>Watch Now</div>
        </div>

        <div className={responsiveStyles.socialSection}>
          <div
            className={responsiveStyles.watchlistSection}
            style={{ textAlign: "center" }}
            onClick={() => addToWatchlist()}
          >
            <AddIcon className={responsiveStyles.watchlist} />

            <div className="text-center" style={{ fontSize: "15px" }}>
              Add to watchlist
              {/* <p style={{ marginTop: "-5px", fontSize: "15px" }}></p> */}
            </div>
          </div>
          <div
            className={responsiveStyles.shareSection}
            style={{ textAlign: "center" }}
          >
            <ShareIcon
              className={responsiveStyles.shareIcon}
              onClick={handleShow}
            />
            <div
              className="text-center"
              style={{
                fontSize: "15px",
              }}
            >
              Share
            </div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton></Modal.Header>
              <div className={responsiveStyles.modalBody}>
                <ShareSocial
                  style={style}
                  url={window.location.href}
                  socialTypes={["facebook", "twitter", "reddit", "linkedin"]}
                />
              </div>
            </Modal>
          </div>
        </div>
        {/* <div class={responsiveStyles.responsive_textSection}>
          <div class={responsiveStyles.corner_logo}>
            <img src="/muktiprime_logo.png" alt="" width="" />
          </div>

          <h1 className={responsiveStyles.title_detail}>
            {props.content_data.title}
          </h1>
          <div className={responsiveStyles.subtitle_aboutText}>
            {props.content_data.genres.join(", ")}
          </div>

          <div className={responsiveStyles.subtitle_text}>
            2 Hours and 25 Minutes
          </div>
          <hr class={responsiveStyles.hr_1} />
          <div class={responsiveStyles.responsive__actionable}>
           
            <div class={responsiveStyles.actionable_icons}>
              <div onClick={() => addToWatchlist()}>
                {" "}
                <ListIcon className={responsiveStyles.icons} />
                <div class={responsiveStyles.actionableText}>Add to Watchlist</div>
              </div>
            </div>
           
            <div class={responsiveStyles.actionable_icons}>
              <ShareIcon
                onClick={handleShow}
                className={responsiveStyles.icons}
              />
              <div onClick={handleShow} class={responsiveStyles.actionableText}>
                Share
              </div>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <div className={responsiveStyles.modalBody}>
                  <ShareSocial
                    style={style}
                    url={window.location.href}
                    socialTypes={["facebook", "twitter", "reddit", "linkedin"]}
                  />
                </div>
              </Modal>
            </div>
          </div>
        </div> */}
      </div>

      <hr className={responsiveStyles.hr_1} />

      <div></div>
      <div className={responsiveStyles.navsR}>
        <div className={responsiveStyles.navsectionR}>
          <div className={responsiveStyles.nav2R}>
            <h2>
              {props.content_data.series_videos ||
              props.content_data.movies_video ? (
                <TabResponsive
                  onClick={handleClick}
                  active={active === 0}
                  id={0}
                >
                  {type === "Movies" ? "Videos" : "Episodes"}
                </TabResponsive>
              ) : null}
              {/* <TabResponsive onClick={handleClick} active={active === 1} id={1}>
								Related
							</TabResponsive> */}
              <TabResponsive onClick={handleClick} active={active === 2} id={2}>
                Details
              </TabResponsive>
            </h2>
          </div>
        </div>
      </div>
      <Content active={active === 0}>
        {props.content_data.series_videos ? (
          <EpisodeResponsive video={props.content_data["series_videos"]} />
        ) : props.content_data.movies_video ? (
          <EpisodeResponsive video={props.content_data["movies_video"]} />
        ) : null}
      </Content>
      <Content active={active === 1}>
        <ListCard />
      </Content>

      <Content active={active === 2}>
        <div className={responsiveStyles.meta_info}>
          <div className={responsiveStyles.info_text}>
            Presented by:
            <span className={responsiveStyles.filter_url_color}>
              {" "}
              Partha Chatterjee
            </span>
          </div>
          <div className={responsiveStyles.info_text}>
            Starring:
            <span className={responsiveStyles.filter_url_color}>
              {` `}
              {props.content_data.starring.join(", ")}
            </span>
          </div>
          <div className={responsiveStyles.info_text}>
            Directors:
            <span className={responsiveStyles.filter_url_color}>
              {` `}
              {props.content_data.directors.join(", ")}
            </span>
          </div>
          <div className={responsiveStyles.info_text}>
            Genre:{" "}
            <span className={responsiveStyles.filter_url_color}>
              {/* {props.content_data.genres.join(", ")} */}
              {props.content_data.genres.map((data, i) => {
                if (props.content_data.genres.length - 1 === i) {
                  // last one
                  return (
                    <Link to={`/category/genre/${data.slug}`} key={i}>
                      {data.name}
                    </Link>
                  );
                } else {
                  // not last one
                  return (
                    <Link to={`/category/genre/${data.slug}`} key={i}>
                      {data.name}
                      {`, `}
                    </Link>
                  );
                }
              })}
            </span>
          </div>
          <div className={responsiveStyles.info_text}>
            Age Limit:
            <span className={responsiveStyles.filter_url_color}>
              {` `} {props.content_data.age_limit}+
            </span>
          </div>
        </div>
        <div
          className={responsiveStyles.collapse_text}
          style={{ color: "white" }}
        >
          {props.content_data.description}
        </div>
      </Content>
    </>
  );
}
