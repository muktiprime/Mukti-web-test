/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useRef, useContext } from "react";
import { setCookie } from "nookies";
import playerStyles from "../styles/player.module.css";
import ReactGa from "react-ga";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useHistory, Redirect } from "react-router-dom";
import { getRequest, postRequest } from "../utilities/ApiCall";
import { Helmet } from "react-helmet";
import ReactPlayer from "react-player";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { makeStyles, withStyles } from "@mui/styles";
import PlayerControls from "../components/Player/PlayerControls";
import { format } from "../utilities/playerEvents";
import { API_HOST_URL, GOOOGLE_ANALYTICS_CODE, WS_HOST_URL } from "../config";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Context from "../context_api/global";

const handleRecentWatch = async (
  contentType,
  contentId,
  videoSlug,
  watchTime
) => {
  try {
    const body = {
      video_type: contentType,
      object_id: contentId,
      video_slug: videoSlug,
      watch_time: watchTime,
    };
    const response = await postRequest(
      `/content/continue/`,
      JSON.stringify(body),
      "POST",
      true
    );
    const data = await response.json();
    // if(data){
    //     console.log('video watch Update', watchTime);
    // }
  } catch (err) {
    console.log(err);
  }
};

let count = 0; // using for hiding menu

const Player = (props) => {
  const classes = useStyles();
  // Google Analytics
  ReactGa.initialize(GOOOGLE_ANALYTICS_CODE);
  ReactGa.pageview(window.location.pathname + window.location.search);

  // Socket
//   const ws = React.useRef(new WebSocket(`${WS_HOST_URL}/ws/device/1/`)).current;
//   const [currentUser, setCurrentUser] = useState(null);
//   const { plan } = useContext(Context);

  // Player Init
  const [state, setState] = useState({
    playing: true,
    muted: true, // FIXME: Make False 
    volume: 0.7,
    played: 0,
    seeking: false,
    duration: 0,
  });

  const [loading, setLoading] = useState(true);
  const [buffering, setBuffering] = useState(true);
  const [videoInfo, setVideoInfo] = useState([]);
  const [showSkip, setShowSkip] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [timeDisplayFormat, setTimeDisplayFormat] = useState("normal");

//   const [quickAction, setQuickAction] = useState()

  const playerRef = useRef(null);
  const controlRef = useRef(null);
  const handleScreen = useFullScreenHandle();
  let history = useHistory();
  // console.log('full creeen --->',handleScreen.active )
  const currentTime = playerRef.current
    ? playerRef.current.getCurrentTime()
    : "00:00";
  const duration = playerRef.current
    ? playerRef.current.getDuration()
    : "00:00";
  // const loadedSeconds = playerRef.current ?  playerRef.current.getSecondsLoaded() : '00:00'
  // console.log('Current Time:', currentTime, "Duration:", duration, 'LoadedSeconds:', loadedSeconds)
  // Handle Back to Previous Page
  const backToPrevPage = () => {
    history.goBack();
  };
  // Handle Rewind & Forward Playback
  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
    handleRecentWatch(
      videoInfo.type,
      videoInfo.content_id,
      videoInfo.slug,
      currentTime
    ); // Handle Watch Time
  };
  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
    handleRecentWatch(
      videoInfo.type,
      videoInfo.content_id,
      videoInfo.slug,
      currentTime
    ); // Handle Watch Time
  };
  const handleDuration = (dur) => {
    setState({ ...state, dur });
  };
  // Handle Mute
  const handleMute = () => {
    setState({ ...state, muted: !state.muted });
    handleRecentWatch(
      videoInfo.type,
      videoInfo.content_id,
      videoInfo.slug,
      currentTime
    ); // Handle Watch Time
  };
  // Handle Play & Pause
  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
    if (state.playing) {
      handleRecentWatch(
        videoInfo.type,
        videoInfo.content_id,
        videoInfo.slug,
        currentTime
      ); // Handle Watch Time
    }
  };
  // Handle Volume
  const onVolumeChange = (e, newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
    handleRecentWatch(
      videoInfo.type,
      videoInfo.content_id,
      videoInfo.slug,
      currentTime
    ); // Handle Watch Time
  };
  const onVolumeSeekUp = (e, newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
    handleRecentWatch(
      videoInfo.type,
      videoInfo.content_id,
      videoInfo.slug,
      currentTime
    ); // Handle Watch Time
  };

  const handleVolumeUp = () => {};
  const handleVolumeDown = () => {};
  // Toggle Full Screen
  const toggleFullScreen = () => {
    if (handleScreen.active) {
      handleScreen.exit();
    } else {
      handleScreen.enter();
    }
    handleRecentWatch(
      videoInfo.type,
      videoInfo.content_id,
      videoInfo.slug,
      currentTime
    ); // Handle Watch Time
  };
  // Handle Progress
  const handleProgress = (changeState) => {
    if (count > 2) {
      controlRef.current.style.visibility = "hidden";
      count = 0;
    }
    if (controlRef.current.style.visibility === "visible") {
      count += 1;
    }
    if (!state.seeking) {
      setState({ ...state, ...changeState });
    }
  };
  const handleSeekChange = (e, newValue) => {
    setState({ ...state, played: parseFloat(newValue / 100) });
    handleRecentWatch(
      videoInfo.type,
      videoInfo.content_id,
      videoInfo.slug,
      currentTime
    ); // Handle Watch Time
  };
  const handleSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
    handleRecentWatch(
      videoInfo.type,
      videoInfo.content_id,
      videoInfo.slug,
      currentTime
    ); // Handle Watch Time
  };
  const handleSeekMouseUp = (e, newValue) => {
    setState({ ...state, seeking: false });
    playerRef.current.seekTo(newValue / 100);
    handleRecentWatch(
      videoInfo.type,
      videoInfo.content_id,
      videoInfo.slug,
      currentTime
    ); // Handle Watch Time
  };

  // Handle Mouse Move
  const handleMouseMove = () => {
    controlRef.current.style.visibility = "visible";
    count = 0;
  };
  const hanldeMouseLeave = () => {
    controlRef.current.style.visibility = "hidden";
    count = 0;
  };

  // Handle Currect Time And Duration
  const handleChangeDisplayFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat === "normal" ? "remaining" : "normal"
    );
    handleRecentWatch(
      videoInfo.type,
      videoInfo.content_id,
      videoInfo.slug,
      currentTime
    ); // Handle Watch Time
  };

  const elapsedTime =
    timeDisplayFormat === "normal"
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;
  const totalDuration = format(duration);

  // Defines
  const { playing, muted, volume, played, seeking } = state;

  // Logic

  // Video Quality, Subtitle Operations
  const [VidQuality, setVidQuality] = useState(null);
  const [VidSub, setVideoSub] = useState([]);

  const [VidCurrQuality, setCurrQuality] = useState(null);
  const [VidCurrSubtitle, setCurrSubtitle] = useState(-1);

  const getHlsData = (data) => {
    setVidQuality(data.levels);
    setCurrQuality(parseInt(data.loadLevel));
    // console.log('HLS Data: ', data);
  };
  const playerOnStart = () => {
    setBuffering(true);
    // const hls = playerRef.current.player.getInternalPlayer('hls')
    // setVideoSub(hls.subtitleTracks); // Currentry Disabling The HLS Meta Subtitle
    // setCurrSubtitle(parseInt(hls.subtitleTrack))  // Currentry Disabling The HLS Meta Subtitle
    playerRef.current.seekTo(videoInfo.watch_time ? videoInfo.watch_time : 0);
  };
  const handleQualityChange = (newQuality) => {
    const hls = playerRef.current.player.getInternalPlayer("hls");
    setCurrQuality(parseInt(newQuality));
    hls.currentLevel = parseInt(newQuality);
  };

  const handleSubtitleChange = (newValue) => {
    const hls = playerRef.current.player.getInternalPlayer("hls");
    if (newValue === 0) {
      hls.subtitleTrack = parseInt(newValue);
      hls.media.innerHTML = `<track kind="subtitles" src="${
        VidSub[0] && VidSub[0].url
      }" srclang="en" label="English">`;
    } else {
      // console.log('else', hls.subtitleTracks)
      hls.media.innerHTML = "";
    }
    setCurrSubtitle(newValue);
  };
  // useEffect(() => {
  //     playerRef.current.seekTo(videoInfo.watch_time ? videoInfo.watch_time  : 0)
  // }, [VidQuality])
  const videoFetch = async () => {
    const contentType = props.match.params.type.trim();
    const contentSlug = props.match.params.player.trim();
    const token = await JSON.parse(localStorage.getItem("loginToken"));

    try {
      const videoResponse = await fetch(
        `${API_HOST_URL}/v1/content/${contentType}/detail/${contentSlug}/watch`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access}`,
          },
        }
      );

      if (videoResponse.status === 403) {
        Swal.fire({
          title: "Family Protection!",
          text: "If you want to watch this video disable Family Protection!",
          icon: "warning",
          confirmButtonText: "Ok",
        });
        // return history.push('/')
        return history.goBack();
      }
      if (videoResponse.status === 200) {
        const data = await videoResponse.json();
        console.log('Video RESPONSE ->', data);
        setVideoInfo(data);
        if (data.video_sub_url) {
          setVideoSub([{ name: "English", url: data.video_sub_url }]);
        }
        // console.log('data.hasAccess ---> ', data.has_access);
        // console.log('data.is_free ---> ', data.is_free);
        if (data.has_access === true || data.is_free) {
          // alert('You don\'t have subscriptions for watch this video! Please Subscribe Us!')
          // toast.dark("Please Subscribe Mukti Prime Video for Unlimited Entertainment!");
        } else {
          Swal.fire({
            title: "Please Subscribe Us!",
            text: "You don't have subscriptions to watch premium videos!",
            icon: "info",
            confirmButtonText: "Get Subscription",
          });
          return history.push("/plans");
        }

        // handleRecentWatch(data.type, data.content_id, data.slug, '10') // Add to Recent Watch
      } else {
        // alert('Error Occured!, Please contact our customer care!')
        Swal.fire({
          title: "Player Error!",
          text: "Error Occured!, Try: Logout & Login Again or Please contact our support team!",
          icon: "error",
          confirmButtonText: "Ok",
        });
        // return history.push('/')
        return history.goBack();
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetching  Current User & Device Data
//   useEffect(() => {
//     const currentGetUser = async () => {
//       const user = localStorage.getItem("user", null);
//       console.log("currentUser ->", user);
//       if (user) {
//         setCurrentUser(user);
//         ws.current = new WebSocket(`${WS_HOST_URL}/ws/device/${currentUser}/`);
//       }
//     };
//     videoFetch();
//     currentGetUser();
//   }, []);

  useEffect(() => {
    videoFetch();
  }, []);

  // Web Socket
//   useEffect(() => {
//     // videoFetch();
//     // console.log('ws ---> ', ws);
//     ws.onopen = (event) => {
//       // console.log("WebSocket Connection Open...", event);
//       // HybrdToast('Loading Please wait ...' )
//       // ws.send('something');
//       // const contentType = props.match.params.type.trim()
//       const contentSlug = props.match.params.player.trim();
//       let data = {
//         user: currentUser ? currentUser : "1",
//         secret: "website",
//         // "plan": plan.plan ?  plan.plan.id :'',
//         plan: 1,
//         data: {
//           video: videoInfo.title ? videoInfo.title : contentSlug,
//           plan: "default 1",
//           source: "website",
//         },
//       };
//       // console.log('socket data ->', data);

//       ws.send(JSON.stringify(data));
//     };
//     ws.onmessage = (event) => {
//       // console.log("WebSocket Message Received...", event);
//       const data = event.data && JSON.parse(event.data);
//       // console.log("-->", data);
//     };
//     ws.onerror = (event) => {
//       // console.log("WebSocket Error Occurred...", event);
//       // HybrdToast('Connection Error Occurred... Try Reopen the Video!' )
//     };
//     ws.onclose = (event) => {
//       // console.log("WebSocket Connection Closed...", event);
//     };

//     return () => {
//       // ws.close();
//       // clearTimeout();
//     };
//   }, [currentUser]);
  // console.log('VidSub --> ', VidSub);

  // useEffect(() => {
  //     console.log('Access -> ', hasAccess)
  // }, [hasAccess])

  // Handle Loading
  if (loading) {
    return (
      <>
        <Override>
          <Loader type="Bars" color="red" height={80} width={80} />
        </Override>
      </>
    );
  }
  // console.log('has subscriberd --', hasSubscribed)
  // if(!videoInfo.has_access){
  //     alert('You don\'t have subscription for watch this video!')
  //     return history.push('/plans')
  // }
  // Logic End
  // console.log('Full Screen State : ', handleScreen.active)
  // console.log('Width : ', window.innerWidth)
  // console.log('Height : ', window.innerHeight )
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{videoInfo.title} - Mukti Prime</title>
      </Helmet>
      <FullScreen handle={handleScreen}>
        {showSkip && (
          <div className={classes.skipIntro} onClick={() => alert(duration)}>
            <span
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Skip intro
            </span>
          </div>
        )}
        {showNext && (
          <div className={classes.nextEpisode} onClick={() => alert(duration)}>
            <span
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Next episode
            </span>
          </div>
        )}
        <div
          className={classes.playerWrapper}
          onMouseMove={handleMouseMove}
          onMouseLeave={hanldeMouseLeave}
        >
          <ReactPlayer
            ref={playerRef}
            width={window.innerWidth}
            height={
              handleScreen.active ? window.innerHeight : window.innerHeight - 24
            }
            // height={window.innerHeight}
            thumbnail={videoInfo.thumbnail}
            // url="https://multiplatform-f.akamaihd.net/i/multi/april11/sintel/sintel-hd_,512x288_450_b,640x360_700_b,768x432_1000_b,1024x576_1400_m,.mp4.csmil/master.m3u8"
            url={videoInfo.stream_web && videoInfo.stream_web}
            autoPlay={true}
            muted={muted}
            playing={playing}
            volume={volume}
            onProgress={handleProgress}
            onError={(error, data, hlsInstance, hlsGlobal) => {
              // console.log(error, data, hlsInstance, hlsGlobal);
              // Swal.fire({
              //     title: 'High Volume Traffic!',
              //     text: 'Try to seek the video!',
              //     icon: 'info',
              //     confirmButtonText: 'Ok'
              // })
            }}
            onStart={playerOnStart}
            onReady={() => {
              getHlsData(playerRef?.current?.player?.player?.hls);
              setBuffering(false);
            }}
            onBuffer={(e) => setBuffering(true)}
            onBufferEnd={(e) => setBuffering(false)}
            config={{
              file: {
                tracks: [
                  {
                    kind: "subtitles",
                    src: VidSub[0] && VidSub[0].url,
                    srcLang: "en",
                    default: false,
                    label: VidSub[0] && VidSub[0].name,
                  },
                ],
                attributes: {
                  crossOrigin: "anonymous",
                  preload: "false",
                  // forceHLS: true,
                },
                hlsOptions: {
                  autoStartLoad: true,
                  // startLevel: 3,
                  debug: false,
                  enableWorker: true,
                  enableWebVTT: true,
                  abrMaxWithRealBitrate: true,
                  lowLatencyMode: true,
                  backBufferLength: 60 * 1.5,
                  // loader: hlsLoader
                },
              },
            }}
          />
          <PlayerControls
            ref={controlRef}
            onPlayPause={handlePlayPause}
            playing={playing}
            onRewind={handleRewind}
            onForward={handleFastForward}
            muted={muted}
            onMute={handleMute}
            onVolumeChange={onVolumeChange}
            onVolumeSeekUp={onVolumeSeekUp}
            volume={volume}
            onToggleFullScreen={toggleFullScreen}
            played={played}
            onSeek={handleSeekChange}
            onSeekMouseDown={handleSeekMouseDown}
            onSeekMouseUp={handleSeekMouseUp}
            onDuration={handleDuration}
            totalDuration={totalDuration}
            elapsedTime={elapsedTime}
            onChangeDisplayFormat={handleChangeDisplayFormat}
            videoTitle={videoInfo.title}
            backToPrevPage={backToPrevPage}
            VidQuality={VidQuality}
            VidCurrQuality={VidCurrQuality}
            VidSub={VidSub}
            handleQualityChange={handleQualityChange}
            handleSubtitleChange={handleSubtitleChange}
            VidCurrSubtitle={VidCurrSubtitle}
            handleVolumeUp={handleVolumeUp}
            handleVolumeDown={handleVolumeDown}
            buffering={buffering}
          />
        </div>
      </FullScreen>
      {/* <div className={playerStyles.videoInapp}>
                <h1>Use our mobile app for better experience</h1>
                <div>
                    <Link
                        to="/"
                    >
                        <img
                            src="/playstore.svg"
                            alt="playstore"
                        />
                    </Link>
                    <Link
                        to="/"
                    >
                        <img
                            src="/appstore.svg"
                            alt="appstore"
                        />
                    </Link>
                </div>
            </div> */}
    </>
  );
};

const useStyles = makeStyles({
  playerWrapper: {
    width: "100%",
    position: "relative",
  },
  skipIntro: {
    backgroundColor: "rgba(200,200,200,0.5)",
    borderColor: "white",
    borderRadius: 4,
    borderWidth: 1,
    height: 40,
    width: 100,
    position: "absolute",
    top: "75%",
    left: 20,
    zIndex: 9999,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  nextEpisode: {
    backgroundColor: "rgba(200,200,200,0.5)",
    borderColor: "white",
    borderRadius: 4,
    borderWidth: 1,
    height: 40,
    width: 120,
    position: "absolute",
    top: "75%",
    right: 20,
    zIndex: 9999,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
});
const Override = styled.div`
  position: fixed;
  top: 40%;
  left: 47%;
  @media (max-width: 800px) {
    top: 40%;
    left: 40%;
  }
`;

export default Player;
