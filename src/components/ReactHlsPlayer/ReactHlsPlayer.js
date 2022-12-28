import React, { useEffect, RefObject, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Forward10Icon from "@mui/icons-material/Forward10";
import playerStyles from "../../styles/player.module.css";
import Replay10Icon from "@mui/icons-material/Replay10";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import SettingsIcon from "@mui/icons-material/Settings";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { FaLanguage } from "react-icons/fa";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import CloseIcon from "@mui/icons-material/Close";
import ClearIcon from "@mui/icons-material/Clear";
import { useHistory, Redirect } from "react-router-dom";
import { MdSubtitles } from "react-icons/md";
import PauseIcon from "@mui/icons-material/Pause";
import Hls, { Config } from "hls.js";

function ReactHlsPlayer({ hlsConfig, src, autoPlay, ...props }) {
  const [hlsobj, setHlsobj] = useState("");
  const [videoStatus, setVideoStatus] = useState(false);
  const [audioTracks, setAudioTracks] = useState([]);
  const [qualities, setQualities] = useState([]);
  const [VideoOption, setVideOption] = useState(true);
  const handle = useFullScreenHandle();
  const playerRef = React.useRef();
  const [curQuality, setCurQlty] = useState("auto");
  const [curVideoSize, setCurVideoSize] = useState("");

  //  console.log("CUUVID", playerRef.current.currentTime)

  useEffect(() => {
    getInitaialVidQlty();
  }, [hlsobj.levels]);

  const getInitaialVidQlty = () => {
    try {
      console.log("CUR QLTY", hlsobj.levels, hlsobj.currentLevel);
      if (hlsobj.currentLevel >= 0)
        setCurVideoSize(hlsobj.levels[hlsobj.currentLevel].height);
      else {
        if (hlsobj.levels && hlsobj.levels.length > 0)
          setCurVideoSize(hlsobj.levels[0].height);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let hls;

    function _initPlayer() {
      if (hls != null) {
        hls.destroy();
      }

      const newHls = new Hls({
        enableWorker: false,
        ...hlsConfig,
      });

      if (playerRef.current != null) {
        newHls.attachMedia(playerRef.current);
      }
      console.log("SRC ====", src);
      newHls.on(Hls.Events.MEDIA_ATTACHED, () => {
        newHls.loadSource(src);

        newHls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (autoPlay) {
            playerRef?.current
              ?.play()
              .catch(() =>
                console.log(
                  "Unable to autoplay prior to user interaction with the dom."
                )
              );
          }
          console.log("seeting audio tracks", newHls.audioTracks);
          playVideo();
          setAudioTracks(newHls.audioTracks);
          console.log("==========", newHls.levels);
          setQualities(newHls.levels);
        });
      });

      newHls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              newHls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              newHls.recoverMediaError();
              break;
            default:
              _initPlayer();
              break;
          }
        }
      });

      hls = newHls;
      setHlsobj(hls);
    }

    // Check for Media Source support
    if (Hls.isSupported()) {
      _initPlayer();
    }
    // console.log("HLS player", hls.audioTracks);
    return () => {
      if (hls != null) {
        hls.destroy();
      }
    };
  }, [autoPlay, hlsConfig, playerRef, src]);

  function pauseVideo() {
    try {
      playerRef.current.pause();
      console.log("VIIDD", Number(playerRef.current.currentTime).toFixed());
      console.log("PAUSED", console.log(playerRef.current.currentTime));
      if (playerRef.current.currentTime)
        props.setCurtime(
          "0:" + Number(playerRef.current.currentTime).toFixed()
        );
      setVideoStatus(false);
    } catch (err) {
      console.log(err);
    }
  }

  function move10sec() {
    playerRef.current.currentTime += 10;
  }
  function dec10sec() {
    playerRef.current.currentTime -= 10;
  }

  function toggleControls() {
    playerRef.current.controls = !playerRef.current.controls;
  }

  function toggleVideoOption() {
    if (VideoOption) {
      return;
    }
    setVideOption(true);
    setTimeout(() => {
      setVideOption(false);
    }, 4000);
  }
  function playVideo() {
    playerRef.current.play();
    setVideoStatus(true);
    console.log("PLAYER DATA", ReactHlsPlayer.audioTracks);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setVideOption(false);
    }, 4000);
  }, []);

  let history = useHistory();
  const prevPage = () => {
    history.goBack();
  };

  const addQuality = (id) => {
    hlsobj.currentLevel = id;
    console.log("current level", hlsobj.currentLevel);
  };

  const changeTrack = (id) => {
    hlsobj.audioTrack = id;
    console.log("current level", hlsobj.audioTrack);
  };

  // If Media Source is supported, use HLS.js to play video
  if (Hls.isSupported()) {
    if (audioTracks != hlsobj.audioTracks) {
      setAudioTracks(hlsobj.audioTracks);
    }

    return (
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div onMouseMove={() => toggleVideoOption()}>
          <FullScreen handle={handle}>
            <video ref={playerRef} {...props} poster={props.thumbnail} />
            {VideoOption ? (
              <div>
                {!videoStatus ? (
                  <div onClick={() => playVideo()}>
                    <PlayArrowIcon className={playerStyles.playIcon} />
                  </div>
                ) : (
                  <div onClick={() => pauseVideo()}>
                    <PauseIcon className={playerStyles.playIcon} />
                  </div>
                )}
                <div style={{ cursor: "pointer" }} onClick={() => move10sec()}>
                  <Forward10Icon className={playerStyles.forwardIcon} />
                </div>
                <div style={{ cursor: "pointer" }} onClick={() => dec10sec()}>
                  <Replay10Icon className={playerStyles.replayIcon} />
                </div>

                <div className="">
                  <MdSubtitles
                    className={playerStyles.settings}
                    data-toggle="dropdown"
                  ></MdSubtitles>
                  <div className="dropdown-menu">
                    {audioTracks && audioTracks.length === 0 ? (
                      <div>
                        <a className="dropdown-item">No Audio Track</a>
                      </div>
                    ) : (
                      audioTracks &&
                      audioTracks.map((audios, index) => (
                        <div key={index}>
                          <a
                            style={{ cursor: "pointer" }}
                            className="dropdown-item"
                            onClick={() => changeTrack(index)}
                          >
                            {audios.name}
                          </a>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                {/* settings */}
                {/* <VolumeUpIcon className={playerStyles.settings} /> */}
                <div className="">
                  <SettingsIcon
                    className={playerStyles.volume}
                    data-toggle="dropdown"
                  ></SettingsIcon>
                  <div className="dropdown-menu">
                    <p
                      style={{ cursor: "pointer" }}
                      className={
                        curQuality === "auto"
                          ? `${playerStyles.autoSelect} dropdown-item'`
                          : "dropdown-item"
                      }
                      onClick={() => (hlsobj.currentLevel = 0)}
                    >
                      Auto
                    </p>
                    {qualities &&
                      qualities.map((resolution, index) => (
                        <p
                          key={index}
                          style={{
                            cursor: "pointer",
                            background:
                              curQuality === resolution.height
                                ? "(Selected)"
                                : "",
                          }}
                          className={
                            curQuality === resolution.height
                              ? `${playerStyles.autoSelect} dropdown-item'`
                              : "dropdown-item"
                          }
                          onClick={() => {
                            addQuality(index);
                            setCurQlty(resolution.height);
                          }}
                        >
                          {resolution.height}p
                        </p>
                      ))}
                  </div>
                </div>
                <ClearIcon
                  onClick={() => prevPage()}
                  className={playerStyles.clearIco}
                />
              </div>
            ) : null}
            {handle.active ? (
              <div onClick={handle.exit}>
                <CloseIcon className={playerStyles.close} />
              </div>
            ) : (
              <div onClick={handle.enter}>
                {" "}
                <FullscreenIcon className={playerStyles.fullscreen} />
              </div>
            )}
          </FullScreen>
        </div>
      </div>
    );
  } else {
    // Fallback to using a regular video player if HLS is supported by default in the user's browser
    {
      console.log("regular player");
    }

    return <video ref={playerRef} src={src} autoPlay={autoPlay} {...props} />;
  }
}

export default ReactHlsPlayer;
