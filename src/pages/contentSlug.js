/* eslint-disable no-unused-vars */
import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import ReactGa from "react-ga";
import movieStyles from "../styles/Movies.module.css";
import MoviesResponsive from "../components/MoviesResponsive/MoviesResponsive";
import ListCard from "../components/ListCard/ListCard";
import List from "@mui/icons-material/List";
import styled from "styled-components";
import { api_url } from "../utilities/constants";
// import axios from "../utilities/axios";
import ShareIcon from "@mui/icons-material/Share";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SuggestEpisode from "../components/SuggestEpisode/SuggestEpisode";
import { useEffect } from "react";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";
import { ShareSocial } from "react-share-social";
import { Helmet } from "react-helmet";
import { GOOOGLE_ANALYTICS_CODE } from "../config";

import {
  is_client,
  is_logged_in,
  loginCheck,
  setCookies,
} from "../utilities/auth";
import LiveChat from "../components/LiveChat";

const style = {
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  borderRadius: 3,
  border: 0,
  color: "white",
  padding: "0 30px",
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
};

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
const Tab = styled.span`
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

export default function ContentSlug(props) {
  const [active, setActive] = useState(0);
  const [showSliderPlayer, setSliderPlayer] = useState(false);
  const [content_data, setContentData] = useState({});
  console.log("🚀 ~ file: contentSlug.js:77 ~ ContentSlug ~ content_data", content_data)
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const [islog, setIsLog] = useState(false);
  const [type, contentType] = useState();
  const [videotype] = useState(props.match.params.content);
  const [serieslink, setSeriesLink] = useState();
  const [movieLink, setMovieLink] = useState("");
  const [show, setShow] = useState(false);
  // const [addto, setAddTo] = useState([])

  ReactGa.initialize(GOOOGLE_ANALYTICS_CODE);
  ReactGa.pageview(window.location.pathname + window.location.search);

  const router = useHistory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      const url = `${api_url}/content/${videotype}/${props.match.params.content_slug}/`;
      const res = await fetch(url);
      console.log("🚀 ~ file: contentSlug.js:97 ~ fetchContent ~ url", url)
      if (res.status === 200) {
        const data = await res.json();
        setContentData(data);

        // console.log("data -->", data);

        contentType(data.category[0]);

        if (data.series_videos) {
          setSeriesLink(data.series_videos[0].slug);
        }else if(data.shows_video) {
          setMovieLink(data.shows_video[0].slug);
        } else {
          setMovieLink(data.movies_video[0].slug);
        }
        setIsLog(await loginCheck());
      } else {
        router.push("/fail");
      }

      setLoading(false);
    };
    fetchContent();
  }, [
    content_data.videoplayer,
    props.match.params.content_slug,
    router,
    videotype,
  ]);

  const delay = 5; // 5 Sec
  useEffect(() => {
    let timer1 = setTimeout(() => setSliderPlayer(true), delay * 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const movie_length = content_data.movie_length;

  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };
  const addToWatchlist = async () => {
    if (loginCheck()) {
      const data = {
        slug: content_data.slug,
        content_type: videotype,
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
      // console.log("data1", content_data);
      // console.log("addto watchlist", response);
      toast.dark(response.message);
    } else {
      toast.error("Please Login to continue");
    }
  };
  if (loading) {
    return (
      <Override>
        <Loader type="Bars" color="red" height={80} width={80} />
      </Override>
    );
  } else {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Mukti Prime : {content_data.title}</title>
        </Helmet>
        <Header />
        <ToastContainer
          position={islog ? "top-center" : "top-right"}
          hideProgressBar="false"
        />
        <div className={movieStyles.bg_cover}>
          <div className={movieStyles.img_content}>
            {showSliderPlayer ? (
              <video
                className={movieStyles.imagcls}
                autoPlay="on"
                controlsList="nofullscreen nodownload"
                // width="320" height="240"
                // style={{'object-fit':'cover'}}
                muted
                loop
                // controls
                // preload="auto"
                preload={"metadata"}
                // height={100}
              >
                <source src={content_data.banner_video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                alt="img"
                src={`${content_data.bannerUrl}`}
                className={movieStyles.imagcls}
              />
            )}
          </div>
          <div className={movieStyles.image_grad1}></div>
          <div className={movieStyles.image_grad2}></div>
          <div className={movieStyles.content_section}>
            <div className={movieStyles.left_content}>
              <div className="">
                <div className={movieStyles.title_detail}>
                  {content_data.title}
                </div>
                <div className={movieStyles.subtitle_text}>
                  {movie_length ? movie_length : null}
                </div>
                <div className={movieStyles.actionable}>
                  {content_data["series_videos"] ? (
                    <Link to={`/player/${videotype}/${serieslink}`}>
                      <button className="btn btn-primary radius-none">
                        <PlayArrowIcon /> Watch Now
                      </button>
                    </Link>
                  ) : (
                    <Link to={`/player/${videotype}/${content_data.slug}`}>
                      <button className="btn btn-primary radius-none">
                        <PlayArrowIcon /> Play Now
                      </button>
                    </Link>
                  )}

                  <div className={movieStyles.watchlist_button}>
                    <AddIcon />
                    <div
                      className={movieStyles.watchlist_text}
                      onClick={() => addToWatchlist()}
                    >
                      ADD TO WATCHLIST
                      <span className={movieStyles.tooltiptext}>
                        {islog ? "Add to watchlist" : "Login to continue"}
                      </span>
                    </div>
                  </div>
                  <div
                    onClick={handleShow}
                    className={movieStyles.share_button}
                  >
                    <ShareIcon />
                    <div className={movieStyles.share_text}>SHARE</div>
                  </div>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <div className={movieStyles.modalBody}>
                      <ShareSocial
                        style={style}
                        url={window.location.href}
                        socialTypes={[
                          "facebook",
                          "twitter",
                          "reddit",
                          "linkedin",
                        ]}
                      />
                    </div>
                  </Modal>
                </div>
                <div className={movieStyles.metainfo_container}>
                  <div className={movieStyles.info_text}>
                    <span className={movieStyles.fu_title}>Presented by:</span>
                    <span className={movieStyles.filter_url_color}>
                      Partha Chatterjee
                    </span>
                  </div>
                  <div className={movieStyles.info_text}>
                    <span className={movieStyles.fu_title}>Starring:</span>
                    <span className={movieStyles.filter_url_color}>
                      {content_data.starring.join(", ")}
                    </span>
                  </div>
                  <div className={movieStyles.info_text}>
                    <span className={movieStyles.fu_title}>Directors:</span>
                    <span className={movieStyles.filter_url_color}>
                      {content_data.directors.join(", ")}
                    </span>
                  </div>
                  <div className={movieStyles.info_text}>
                    <span className={movieStyles.fu_title}>Language:</span>
                    <span className={movieStyles.filter_url_color}>
                      {/* {content_data.languages.join(",")} */}
                      <Link to={`/category/language/bengali`}>
                        {content_data.languages.join(",")}
                      </Link>
                    </span>
                    <Link className={movieStyles.filter_url_color}></Link>
                  </div>
                  <div className={movieStyles.info_text}>
                    <span className={movieStyles.fu_title}>Genre:</span>
                    <span className={movieStyles.filter_url_color}>
                      {content_data.genres.map((data, i) => {
                        if (content_data.genres.length - 1 === i) {
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
                      {/* <Link to={`/category/genre/${content_data.genres}`}>{content_data.genres.join(", ")}</Link> */}
                    </span>
                  </div>
                  <div className={movieStyles.info_text}>
                    <span className={movieStyles.fu_title}>Age Limit:</span>
                    <span className={movieStyles.filter_url_color}>
                      {content_data.age_limit}+
                    </span>
                  </div>
                </div>
                <div className="">
                  <div className="">
                    <div className={movieStyles.sub_description}>
                      {content_data.description}
                    </div>
                  </div>
                  {/* <Link
                  to="/"
                  className={movieStyles.filter_url_color}
                  data-toggle="collapse"
                  data-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  see more
                </Link> */}
                  <div className="collapse" id="collapseExample">
                    {/* <div className={movieStyles.sub_description}>
                  he also has to protect his family from the impact of his
                    secretive,he also has to protect his family from the impact of his
                    secretive,he also has to protect his family from the impact of his
                    secretive,he also has to protect his family from the impact of his
                    secretive,
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        {/* nav Content section starts */}
        <div className={movieStyles.navs}>
          <div className={movieStyles.navsection}>
            <div className={movieStyles.nav2}>
              {type === "Movies" ? (
                <h2>
                  {content_data["series_videos"] ||
                  content_data["movies_video"] ? (
                    <Tab onClick={handleClick} active={active === 0} id={0}>
                      Videos
                    </Tab>
                  ) : null}
                  {/* <Tab onClick={handleClick} active={active === 1} id={1}>
                    Related
                  </Tab> */}
                  <Tab onClick={handleClick} active={active === 2} id={2}>
                    Details
                  </Tab>
                </h2>
              ) : (
                <h2>
                  {content_data["series_videos"] ||
                  content_data["movies_video"] ? (
                    <Tab onClick={handleClick} active={active === 0} id={0}>
                      Episodes
                    </Tab>
                  ) : null}
                  {/* <Tab onClick={handleClick} active={active === 1} id={1}>
                    Related
                  </Tab> */}
                  <Tab onClick={handleClick} active={active === 2} id={2}>
                    Details
                  </Tab>
                </h2>
              )}
            </div>
          </div>
        </div>

        {/* <Tab onClick={handleClick} active={active === 0} id={0}>
        Episodes
      </Tab>

      <Tab onClick={handleClick} active={active === 1} id={1}>
        Content2
      </Tab> */}
        <div className={movieStyles.responsivePart}>
          <Content active={active === 0}>
            <div className={movieStyles.suEpisode}>
              {" "}
              {content_data.series_videos ? (
                <SuggestEpisode
                  type={videotype}
                  data={content_data.series_videos}
                />
              ) : content_data.movies_video ? (
                <SuggestEpisode
                  type={videotype}
                  data={content_data.movies_video}
                />
              ) : null}
            </div>
          </Content>
          <Content active={active === 1}>
            <h2 style={{ color: "white", marginLeft: "4%" }}>Related Shows</h2>

            <ListCard />
          </Content>

          <Content active={active === 2}>
            <div
              style={{
                color: "white",
                marginLeft: "5%",
                marginRight: "5%",
                fontSize: "20px",
              }}
            >
              {content_data.description}
            </div>
          </Content>
        </div>

        <p className={movieStyles.responsive}>
          <MoviesResponsive
            videotype={videotype}
            serieslink={serieslink}
            videoplayer={showSliderPlayer}
            movieLink={movieLink}
            addToWatchlist={addToWatchlist}
            content_data={content_data}
            islog={islog}
          />
        </p>

        <br />

        <Footer />
      </>
    );
  }
}
