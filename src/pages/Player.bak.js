/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// import { useRouter } from 'next/router'
import React, { useEffect } from "react";
import ReactGa from "react-ga";
import { useState } from "react";
// import ReactHlsPlayer from 'react-hls-player';
import { api_url } from "../utilities/constants";
import axios from "../utilities/axios";
import playerStyles from "../styles/player.module.css";
import styled from "styled-components";
import ReactHlsPlayer from "../components/ReactHlsPlayer/ReactHlsPlayer";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useHistory, Redirect } from "react-router-dom";
import { getRequest, postRequest } from "../utilities/ApiCall";
import { Helmet } from "react-helmet";

const Override = styled.div`
  position: fixed;
  top: 40%;
  left: 47%;
  @media (max-width: 800px) {
    top: 40%;
    left: 40%;
  }
`;
// const ReactPlayer = dynamic(
//   () => import("react-hls-player").then((mod) => mod),
//   { loading: () => <p>Loading</p>, ssr: false }
// );
// export async function getServerSideProps({ query }) {

// }

export default function Player(props) {
  const [loading, setLoading] = useState(true);
  const playerRef = React.useRef();
  // const [VideoOption, setVideOption] = useState(true);
  const [player_data, setPlayerData] = useState([]);
  const [cur_Time, setCurtime] = useState("0:01");
  console.log("Curtime", cur_Time);
  // function playVideo() {
  //   playerRef.current.play();
  //   setVideoStatus(true);
  //   console.log("PLAYER DATA", ReactHlsPlayer.audioTracks);
  // }

  // function pauseVideo() {
  //   playerRef.current.pause();
  //   setVideoStatus(false);
  // }
  // function move10sec() {
  //   playerRef.current.currentTime += 10;
  // }
  // function dec10sec() {
  //   playerRef.current.currentTime -= 10;
  // }

  // function toggleControls() {
  //   playerRef.current.controls = !playerRef.current.controls;
  // }

  ReactGa.initialize("UA-206471971-2");
  ReactGa.pageview(window.location.pathname + window.location.search);
  React.useEffect(() => {
    addVideoToRecentlyWatched();
  }, [cur_Time]);

  useEffect(async () => {
    setLoading(true);
    var token = await JSON.parse(localStorage.getItem("loginToken"));
    console.log("token", token);
    try {
      var planResponse = await fetch(`${api_url}/user/plan/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
      });
      const url = `${api_url}/content/${props.match.params.type.trim()}/video/${
        props.match.params.player
      }/`;
      console.log("url", url);
      var response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      var data = await response.data;
      console.log("video DATA", data);
      if (planResponse.status == 404 && !data.is_free) {
        console.log("redirecting to plans");
        return history.push("/plans");
      }
      setPlayerData(data);
      setLoading(false);
      addVideoToRecentlyWatched(data.content_id, data.slug);
    } catch (err) {
      console.log(err);
    }
  }, []);

  let history = useHistory();
  const prevPage = () => {
    history.goBack();
  };

  const addVideoToRecentlyWatched = async (
    id = player_data.content_id,
    slug = player_data.slug,
    watch_time = cur_Time
  ) => {
    try {
      const body = {
        video_type: props.match.params.type.trim(),
        object_id: id,
        watch_time: watch_time,
        video_slug: slug,
      };
      console.log("CONTINUE BODY", body);
      const response = await postRequest(
        `/content/continue/`,
        JSON.stringify(body),
        "POST",
        true
      );
      const data = await response.json();
      console.log("Video Added to continue", data);
    } catch (err) {
      console.log(err);
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
        {/* <Helmet>
          <meta charSet="utf-8" />
          <title>MuktiPrime :</title>
        </Helmet> */}
        <div className={playerStyles.gui}>
          <div style={{ position: "", overflow: "hidden" }}>
            <ReactHlsPlayer
              playerRef={playerRef}
              setCurtime={setCurtime}
              thumbnail={player_data.thumbnail}
              src={player_data.stream}
              //   src="http://127.0.0.1:4001/tested/kaun-tujhe/multi_audio_sub_53s.m3u8"
              autoPlay={false}
              controls={true}
              forwardIcon={true}
              width="100%"
              height="100%"
            ></ReactHlsPlayer>
          </div>
        </div>
        <div className={playerStyles.guiBase}>
          <div>
            <div className={playerStyles.guiImg}>
              <img src="/mukti prime logo(4).png" className="img-fluid" />
            </div>
            <div className={playerStyles.guiText}>
              For Play video on mobile Download our App Now!
              <br />
              Download it from the Apple & Google Play Store for continuing this
              video !
              <br />
              <br />
              <img
                src="https://smartagrifoodsummit.com/wp-content/uploads/2019/06/app-logos.png"
                alt=""
                className="img-fluid"
              />
              {/* <div className="d-flex justify-content-between">
                <div>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
              </div><br/>
              <div className="d-flex justify-content-between">
                <div>
                  <img
                    src="https://www.snapper.co.nz/wp-content/uploads/2020/11/AppStore-logo-1.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </>
    );
  }
}
