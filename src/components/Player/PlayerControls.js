/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {
  useState,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  Slider,
  Tooltip,
  Popover,
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import { makeStyles, withStyles } from "@mui/styles";
import SettingsIcon from "@mui/icons-material/Settings";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import Replay10Icon from "@mui/icons-material/Replay10";
import Forward10Icon from "@mui/icons-material/Forward10";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import FullScreenIcon from "@mui/icons-material/Fullscreen";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import CircularProgress from "@mui/material/CircularProgress";
import { ImportantDevices } from "@mui/icons-material";

import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import { useMediaQuery } from "../../hooks/useMedia";

const PlayerControls = forwardRef(
  (
    {
      onPlayPause,
      playing,
      onRewind,
      onForward,
      muted,
      onMute,
      onVolumeChange,
      onVolumeSeekUp,
      volume,
      onToggleFullScreen,
      played,
      onSeekMouseUp,
      onSeekMouseDown,
      onDuration,
      onSeek,
      elapsedTime,
      totalDuration,
      onChangeDisplayFormat,
      backToPrevPage,
      videoTitle,
      VidQuality,
      VidSub,
      handleQualityChange,
      VidCurrQuality,
      handleSubtitleChange,
      VidCurrSubtitle,
      handleVolumeUp,
      handleVolumeDown,
      buffering,
    },
    ref
  ) => {
    const classes = useStyles();
    const isRowBased = useMediaQuery("(max-width: 600px)");
    const [anchorEl, setAnchorEl] = useState(null);
    // console.log(buffering)
    const handleSubtitlePopover = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? "subtitle-popover" : undefined;

    const [anchorSub, setAnchorSub] = React.useState(null);
    const openSub = Boolean(anchorSub);
    const subtitleClick = (event) => {
      setAnchorSub(event.currentTarget);
    };
    const subtitleClose = () => {
      setAnchorSub(null);
    };

    const [anchorSet, setAnchorSet] = React.useState(null);
    const openSet = Boolean(anchorSet);
    const settitleClick = (event) => {
      setAnchorSet(event.currentTarget);
    };
    const settitleClose = () => {
      setAnchorSet(null);
    };

    // Keyboard Shortcuts
    const playButtonRef = useRef();
    const ForwardButtonRef = useRef();
    const RewindButtonRef = useRef();
    const muteButtonRef = useRef();
    const fullScreenButtonRef = useRef();
    const closePlayerButtonRef = useRef();
    const subRef = useRef();

    const handleUserKeyPress = useCallback((event) => {
      const { key, keyCode } = event;

      if (keyCode === 32) {
        playButtonRef.current.click();
      } else if (keyCode === 39) {
        ForwardButtonRef.current.click();
      } else if (keyCode === 37) {
        RewindButtonRef.current.click();
      } else if (keyCode === 37) {
        RewindButtonRef.current.click();
      } else if (keyCode === 77) {
        muteButtonRef.current.click();
      } else if (keyCode === 70) {
        fullScreenButtonRef.current.click();
      } else if (keyCode === 27) {
        closePlayerButtonRef.current.click();
      } else if (keyCode === 38) {
        // Up
        handleVolumeUp();
      } else if (keyCode === 40) {
        // Down
        handleVolumeDown();
      }
      // console.log(key, keyCode)
    }, []);

    useEffect(() => {
        
      window.addEventListener("keydown", handleUserKeyPress);
      return () => {
        window.removeEventListener("keydown", handleUserKeyPress);
      };
    }, [handleUserKeyPress]);

    useEffect(() => {
      if (window.Tawk_API) {
        window.Tawk_API.hideWidget();
      }
      return () => {
        if (window.Tawk_API) {
          window.Tawk_API.showWidget();
        }
      };
    }, []);
    return (
      <>
        <div className={classes.controlsWrapper} ref={ref}>
          {/* Top Controls */}
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            style={{ padding: 16 }}
            ref={subRef}
          >
            <Grid item>
              <Typography variant="h4" style={{ color: "#fff" }}>
                {videoTitle}
              </Typography>
              <Typography variant="h5" style={{ color: "#d32f2f" }}>
                Mukti Prime Originals
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Subtitle">
                <IconButton
                  className={classes.upperIcons}
                  aria-label="reqind"
                  onClick={subtitleClick}
                  aria-controls={openSub ? "subtitle-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openSub ? "true" : undefined}
                >
                  <SubtitlesIcon sx={{ fontSize: 45 }} fontSize="inherit" />
                </IconButton>
              </Tooltip>
              <Popover
                anchorEl={anchorSub}
                id="subtitle-menu"
                container={subRef.current}
                open={openSub}
                onClose={subtitleClose}
                onClick={subtitleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                {VidSub &&
                  VidSub.map((val, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => handleSubtitleChange(0)}
                    >
                      <ListItemIcon
                        style={{
                          visibility: VidCurrSubtitle === 0 ? "" : "hidden",
                        }}
                      >
                        <DoneIcon fontSize="small" />
                      </ListItemIcon>{" "}
                      {val.name}
                    </MenuItem>
                  ))}
                {VidSub.length !== 0 ? (
                  <MenuItem onClick={() => handleSubtitleChange(-1)}>
                    <ListItemIcon
                      style={{
                        visibility: VidCurrSubtitle === -1 ? "" : "hidden",
                      }}
                    >
                      <DoneIcon fontSize="small" />
                    </ListItemIcon>
                    Disable
                  </MenuItem>
                ) : (
                  <MenuItem disabled={true}>Not Available</MenuItem>
                )}
              </Popover>
              <Tooltip title="Settings">
                <IconButton
                  className={classes.upperIcons}
                  aria-label="reqind"
                  onClick={settitleClick}
                  aria-controls={openSet ? "settings-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openSet ? "true" : undefined}
                >
                  <SettingsIcon sx={{ fontSize: 45 }} fontSize="inherit" />
                </IconButton>
              </Tooltip>
              <Popover
                anchorEl={anchorSet}
                id="settings-menu"
                container={subRef.current}
                open={openSet}
                onClose={settitleClose}
                onClick={settitleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                {VidQuality &&
                  VidQuality.map((resolution, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => handleQualityChange(index)}
                    >
                      <ListItemIcon
                        style={{
                          visibility: VidCurrQuality === index ? "" : "hidden",
                        }}
                      >
                        <DoneIcon fontSize="small" />
                      </ListItemIcon>
                      {resolution.height}p
                    </MenuItem>
                  ))}
              </Popover>
              <IconButton
                className={classes.upperIcons}
                aria-label="reqind"
                onClick={onToggleFullScreen}
                ref={fullScreenButtonRef}
              >
                <FullScreenIcon sx={{ fontSize: 50 }} fontSize="inherit" />
              </IconButton>
              <IconButton
                className={classes.upperIcons}
                aria-label="reqind"
                onClick={backToPrevPage}
                ref={closePlayerButtonRef}
              >
                <CloseIcon sx={{ fontSize: 50 }} fontSize="inherit" />
              </IconButton>
            </Grid>
          </Grid>
          {/* Top Controls End */}
          {/* Middle Controls */}
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <IconButton
              style={styles.controlIcons(isRowBased)}
              aria-label="reqind"
              onClick={onRewind}
              ref={RewindButtonRef}
            >
              <Replay10Icon sx={{ fontSize: 70 }} fontSize="inherit" />
            </IconButton>

            {buffering ? (
              <IconButton
                style={styles.controlIcons(isRowBased)}
                aria-label="reqind"
              >
                <Box sx={{ display: "flex" }}>
                  <CircularProgress thickness={1} color={"error"} size={70} />
                </Box>
              </IconButton>
            ) : (
              <IconButton
                style={styles.controlIcons(isRowBased)}
                aria-label="reqind"
                onClick={onPlayPause}
                ref={playButtonRef}
              >
                {playing ? (
                  <PauseIcon sx={{ fontSize: 70 }} fontSize="inherit" />
                ) : (
                  <PlayArrowIcon sx={{ fontSize: 70 }} fontSize="inherit" />
                )}
              </IconButton>
            )}

            <IconButton
              style={styles.controlIcons(isRowBased)}
              aria-label="reqind"
              onClick={onForward}
              ref={ForwardButtonRef}
            >
              <Forward10Icon sx={{ fontSize: 70 }} fontSize="inherit" />
            </IconButton>
          </Grid>
          {/* Middle Controls End */}
          {/* Bottom Controls */}
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            style={{ padding: 16 }}
          >
            <Grid item xs={12}>
              <PrettoSlider
                min={0}
                max={100}
                style={{ color: "#d32f2f" }}
                value={played * 100}
                // valuelabelcomponent={(props) => (
                //     <ValueLabelComponent {...props} value={elapsedTime} />
                // )}
                aria-label="Seek"
                onChange={onSeek}
                onMouseDown={onSeekMouseDown}
                onChangeCommitted={onSeekMouseUp}
                // onDuration={onDuration}
              />
            </Grid>
            <Grid item>
              <Grid container direction="row" alignItems="center">
                {/* <IconButton className={classes.bottomIcons} onClick={onPlayPause}>
								{ playing ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" /> }
							</IconButton> */}
                <IconButton
                  className={classes.bottomIcons}
                  onClick={onMute}
                  ref={muteButtonRef}
                >
                  {muted ? (
                    <VolumeOffIcon fontSize="large" />
                  ) : (
                    <VolumeUpIcon fontSize="large" />
                  )}
                </IconButton>

                <Slider
                  min={0}
                  style={{ color: "#d32f2f" }}
                  max={100}
                  defaultValue={volume * 100}
                  value={volume * 100}
                  className={classes.volumeSlider}
                  onChange={onVolumeChange}
                  aria-labelledby="discrete-slider-small-steps"
                  onChangeCommitted={onVolumeSeekUp}
                />
                {/* <Button variant="text" style={{ color: "#fff", marginLeft: 16 }} onClick={onChangeDisplayFormat}>
								<Typography>{elapsedTime}/{totalDuration}</Typography>
							</Button> */}
              </Grid>
            </Grid>

            <Grid item>
              {/* <Button
							variant="text"
							className={classes.bottomIcons}
							onClick={handleSubtitlePopover}
						>
							<Typography>Quality</Typography>
						</Button> */}

              {/* <Popover
							id={id}
							open={open}
							anchorEl={anchorEl}
							onClose={handleClose}
							anchorOrigin={{
								vertical: "top",
								horizontal: "center",
							}}
							transformOrigin={{
								vertical: "bottom",
								horizontal: "center",
							}}
						>
							<Grid container direction="column-reverse">
                                <Button variant="text" onClick={() => handleQualityChange(-1)}>
                                    <Typography color="secondary">Auto</Typography>
                                </Button>
								{VidQuality && VidQuality.map((resolution, index) => (
                                    // console.log(val.height)
									<Button variant="text" key={index} onClick={() => handleQualityChange(index)}>
										<Typography color="secondary">{resolution.height}p</Typography>
									</Button>
								))}
							</Grid>
						</Popover> */}

              <Button
                variant="text"
                style={{ color: "#fff", marginLeft: 16 }}
                onClick={onChangeDisplayFormat}
              >
                <Typography>
                  {elapsedTime}/{totalDuration}
                </Typography>
              </Button>

              {/* <IconButton className={classes.bottomIcons} onClick={onToggleFullScreen}>
							<FullScreenIcon fontSize="large" />
						</IconButton> */}
            </Grid>
          </Grid>
          {/* Bottom Controls End */}
        </div>
        ;
      </>
    );
  }
);
const styles = {
  controlIcons: (isRowBased) => ({
    color: "rgb(255 255 255 / 75%)",
    fontSize: 100,
    transform: "scale(0.9)",
    margin: isRowBased ? "0 15px" : "0 50px",
    "&:hover": {
      color: "rgb(255 255 255 / 9%)",
      transform: "scale(1)",
    },
  }),
};
const useStyles = makeStyles({
  controlsWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: 1,
    // visibility: "visible !important",
  },
  upperIcons: {
    color: "#777 !important",
    fontSize: 40,
    "&:hover": {
      color: "#fff !important",
    },
  },

  bottomIcons: {
    color: "#999 !important",
    "&:hover": {
      color: "#fff !important",
    },
  },
  volumeSlider: {
    width: "120px !important",
  },
});

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

// const PrettoSlider = withStyles({
// 	root: {
// 		// color: red,
// 		height: 8,
// 	},
// 	thumb: {
// 		height: 24,
// 		width: 24,
// 		backgroundColor: "#fff",
// 		border: "2px solid currentColor",
// 		marginTop: -8,
// 		marginLeft: -12,
// 		"&:focus, &:hover, &$active": {
// 			boxShadow: "inherit",
// 		},
// 	},
// 	active: {},
// 	valueLabel: {
// 		left: "calc(-50% + 4px)",
// 	},
// 	track: {
// 		height: 8,
// 		borderRadius: 4,
// 	},
// 	rail: {
// 		height: 8,
// 		borderRadius: 4,
// 	},
// })(Slider);
const PrettoSlider = styled(Slider)({
  color: "#1976d2",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#1976d2",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});
export default PlayerControls;
