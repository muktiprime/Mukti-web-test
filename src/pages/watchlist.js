/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { Component, useState, useEffect } from "react";
import watchListStyles from "../styles/WatchList.module.css";
import styled from "styled-components";
import ListCard from "../components/ListCard/ListCard";
import Header from "../components/Header/Header";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import styles from "../components/ListCard/ListCard.module.css";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import Footer from "../components/Footer/Footer";
import RemoveIcon from "@mui/icons-material/Remove";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { api_url, image_base } from "../utilities/constants";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import {
  is_client,
  is_logged_in,
  loginCheck,
  setCookies,
} from "../utilities/auth";

const Override = styled.div`
  position: fixed;
  top: 40%;
  left: 47%;
  @media (max-width: 800px) {
    top: 40%;
    left: 40%;
  }
`;
const Content = styled.div`
  ${(props) => (props.active ? "" : "display:none")}
`;
const TabResponsive = styled.span`
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin-right: 20px;
  border-bottom: ${(props) => (props.active ? "2px solid white" : "")};
  color: ${(props) => (props.active ? "white" : "rgb(129, 151, 164)")};

  :hover {
    color: white;
  }
`;

export default function WatchList() {
  const [active, setActive] = useState(2);
  const cookies = parseCookies();
  const [removeWatchlist, setRemoveWatchlist] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(JSON.parse(cookies.muktiprimeToken));
  const [movielist, setMovieList] = useState([]);
  const [serieslist, setSeriesList] = useState([]);

  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };
  useEffect(() => {
    const fetchWatchlist = async () => {
      setLoading(true);
      const res = await fetch(`${api_url}/content/watchlist/get/movies/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
      });
      const response = await res.json();
      setMovieList(response);
      // console.log("Movies", response);

      const res1 = await fetch(`${api_url}/content/watchlist/get/series/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
      });
      const response1 = await res1.json();
      setSeriesList(response1);
      // const movie_content =

      // console.log("Series -->", response1);
      setLoading(false);
    };
    fetchWatchlist();
  }, [removeWatchlist]);

  const removeToWatchlist = async (id, type) => {
    // console.log("called remove watchlist");
    if (loginCheck()) {
      const data = {
        content_type: type,
        content_id: id,
      };

      const cookies = parseCookies();
      const tok = JSON.parse(cookies.muktiprimeToken);
      const res3 = await fetch(`${api_url}/content/watchlist/remove/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tok.access}`,
        },
        body: JSON.stringify(data),
      });
      const res2 = await res3.json();

      toast.dark(res2.message);
      setRemoveWatchlist(id);
      // console.log("remove", typeof id, type);
    } else {
      toast.error("Please Login to continue");
    }
  };
  // console.log(serieslist)

  if (loading) {
    return (
      <Override>
        <Loader type="Bars" color="red" height={70} width={80} />
      </Override>
    );
  } else {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Mukti Prime : Watchlist</title>
        </Helmet>
        <Header />
        <ToastContainer />
        <div className="container-fluid">
          <div className={watchListStyles.header}>
            <h1 className={watchListStyles.text}>Watchlist</h1>
            {serieslist.length > 0 ? (
              <div className={watchListStyles.options}>
                <ul className={watchListStyles.choose}>
                  <TabResponsive
                    onClick={handleClick}
                    active={active === 2}
                    id={2}
                  >
                    All
                  </TabResponsive>

                  {/* <TabResponsive onClick={handleClick} active={active === 1} id={1}>
								Movies
							</TabResponsive> */}
                  <TabResponsive
                    onClick={handleClick}
                    active={active === 0}
                    id={0}
                  >
                    Shows
                  </TabResponsive>
                </ul>
              </div>
            ) : (
              <>
                <p className="text-center">
                  <font color="white">No watchlist added yet</font>
                </p>
              </>
            )}
          </div>
          <Content active={active === 0 || active === 2}>
            {/* <h2 style={{ color: 'white',textAlign:'center',fontSize:'18px' }}>TV Shows</h2> */}
            <div className={styles.mediaScreen}>
              <div className={styles.banner}>
                {serieslist ? (
                  serieslist.map((item, index) => (
                    <div key={index} className={styles.mediaDiv}>
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to={`/content/series/${item.content.slug}`}
                      >
                        <div>
                          {item.content.PosterUrl === "" ? (
                            <>
                              <img
                                className={styles.mediaImg}
                                style={{ objectFit: "contain" }}
                                src={require("../assets/img/logo.png")}
                                alt={item.name}
                              />
                            </>
                          ) : (
                            <img
                              alt="img"
                              src={item.content.PosterUrl}
                              className={styles.mediaImg}
                            />
                          )}
                        </div>
                      </Link>

                      <div className={styles.displayhoverScreen}>
                        <div className={styles.hoverScreen}>
                          <div>
                            {" "}
                            <Link
                              style={{ textDecoration: "none", color: "white" }}
                              to={`/content/series/${item.content.slug}`}
                            >
                              {item.content.PosterUrl === "" ? (
                                <>
                                  <img
                                    alt="logo"
                                    className={styles.mediaHoverImg}
                                    style={{ objectFit: "contain" }}
                                    src={require("../assets/img/logo.png")}
                                  />
                                </>
                              ) : (
                                <img
                                  alt="poster"
                                  src={item.content.PosterUrl}
                                  className={styles.mediaHoverImg}
                                />
                              )}
                            </Link>
                          </div>
                          <div className={styles.hoverData}>
                            <div className={styles.hoverHeading}>
                              <div className={styles.playDiv}>
                                <div>
                                  <div className={styles.playIcon}>
                                    <PlayCircleFilledWhiteOutlinedIcon
                                      className={styles.playButton}
                                    />
                                  </div>
                                </div>
                                <div className={styles.playtext}>Play</div>
                              </div>
                              <div
                                onClick={() =>
                                  removeToWatchlist(item.id, "series")
                                }
                              >
                                <RemoveCircleIcon className={styles.addIcon} />
                              </div>
                            </div>
                            <div>
                              <Link
                                style={{
                                  textDecoration: "none",
                                  color: "white",
                                }}
                                to={`/content/series/${item.content.slug}`}
                              >
                                {" "}
                                <div className={styles.title}>
                                  {item.content.title}
                                </div>
                                <div className={styles.overview}>
                                  {item.content.description.length > 90
                                    ? item.content.description.substr(0, 89) +
                                      "..."
                                    : item.content.description}
                                </div>
                                <div className={styles.footerScreen}>
                                  <div className={styles.runTime}>
                                    {item.content.length}
                                  </div>
                                  <div className={styles.releaseYear}>
                                    {item.content.released}
                                  </div>
                                  {/* <div>
																	<ChatBubbleIcon
																		className={styles.messageIcon}
																	/>
																</div> */}
                                  <div className={styles.rated}>
                                    {item.content.age_limit}+
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={styles.mediaSection}
                        onClick={() => removeToWatchlist(item.id, "series")}
                      >
                        <RemoveIcon className={styles.iconRemove} />
                      </div>
                    </div>
                  ))
                ) : (
                  <h1>No data available</h1>
                )}
              </div>
            </div>
          </Content>
          <Content active={active === 2 || active === 1}>
            {/* <h2 style={{ color: 'white',textAlign:'center',fontSize:'18px' }}>Movies</h2> */}

            <div className={styles.mediaScreen}>
              <div className={styles.banner}>
                {movielist ? (
                  movielist.map((item, index) => (
                    <div key={index} className={styles.mediaDiv}>
                      <div>
                        <Link
                          style={{ textDecoration: "none", color: "white" }}
                          to={`/content/movies/${item.content.slug}`}
                        >
                          <img
                            alt="poster"
                            src={item.content.PosterUrl}
                            className={styles.mediaImg}
                          />{" "}
                        </Link>
                      </div>

                      <div className={styles.displayhoverScreen}>
                        <div className={styles.hoverScreen}>
                          <div>
                            <Link
                              style={{ textDecoration: "none", color: "white" }}
                              to={`/content/movies/${item.content.slug}`}
                            >
                              <img
                                alt="poster"
                                src={item.content.PosterUrl}
                                className={styles.mediaHoverImg}
                              />
                            </Link>
                          </div>
                          <div className={styles.hoverData}>
                            <div className={styles.hoverHeading}>
                              <div className={styles.playDiv}>
                                <div
                                  className={styles.playIcon}
                                  onClick={() =>
                                    removeToWatchlist(item.id, "movies")
                                  }
                                >
                                  <PlayCircleFilledWhiteOutlinedIcon
                                    className={styles.playButton}
                                  />
                                </div>
                                <div className={styles.playtext}>Play</div>
                              </div>
                              <div
                                onClick={() =>
                                  removeToWatchlist(item.id, "movies")
                                }
                              >
                                <RemoveCircleIcon className={styles.addIcon} />
                              </div>
                            </div>
                            <div>
                              <Link
                                style={{
                                  textDecoration: "none",
                                  color: "white",
                                }}
                                to={`/content/movies/${item.content.slug}`}
                              >
                                <div className={styles.title}>
                                  {item.content.slug}
                                </div>
                                <div className={styles.overview}>
                                  {item.content.description.length > 90
                                    ? item.content.description.substr(0, 89) +
                                      "..."
                                    : item.content.description}
                                </div>
                                <div className={styles.footerScreen}>
                                  <div className={styles.runTime}>
                                    {item.content.length}
                                  </div>
                                  <div className={styles.releaseYear}>
                                    {item.content.released}
                                  </div>
                                  {/* <div>
																	<ChatBubbleIcon
																		className={styles.messageIcon}
																	/>
																</div> */}
                                  <div className={styles.rated}>
                                    {item.content.age_limit}+
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={styles.mediaSection}
                        onClick={() => removeToWatchlist(item.id, "movies")}
                      >
                        <RemoveIcon className={styles.iconRemove} />
                      </div>
                    </div>
                  ))
                ) : (
                  <h1>No data available</h1>
                )}
              </div>
            </div>
          </Content>
        </div>

        <Footer />
      </>
    );
  }
}
