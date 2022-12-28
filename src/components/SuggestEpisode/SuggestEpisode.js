/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import episodeStyles from "./SuggestEpisode.module.css";
import { Link } from "react-router-dom";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
export default class SuggestEpisode extends Component {
  render() {
    // console.log("sugges-card", this.props.data);

    return (
      <>
        <div className={episodeStyles.outerLayer} style={{ marginBottom: 10 }}>
          {this.props.data
            ? this.props.data.map((item, index) => (
                <Link
                  key={index}
                  to={`/player/${this.props.type}/${item.slug}`}
                >
                  <div
                    style={{ cursor: "ponter" }}
                    key={index}
                    className={episodeStyles.innerLayer}
                  >
                    <div className={episodeStyles.imageSection}>
                      <img
                        alt="thumbnail"
                        src={item.thumbnail}
                        className={episodeStyles.imgClass}
                      />
                    </div>
                    <div className={episodeStyles.middleSection}>
                      <div className={episodeStyles.upperlayer1}>
                        <div className={episodeStyles.logoCover}>
                          <img
                            src={require("../../assets/img/play-icon.png")}
                            alt="logo"
                            className={episodeStyles.logoImg}
                          />
                          {/* <PlayCircleFilledWhiteOutlinedIcon /> */}
                        </div>
                      </div>
                      <div className={episodeStyles.upperlayer2}>
                        <div className={episodeStyles.title}>
                          <h5 className={episodeStyles.episodeTitle}>
                            {item.episode ? item.episode + "." : ""}{" "}
                            {item.title}
                          </h5>
                        </div>
                      </div>
                      <div className={episodeStyles.description}>
                        <p className={episodeStyles.descriptionTitle}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className={episodeStyles.lastSection}>
                      <div className={episodeStyles.data}>
                        {item.is_free ? "Free" : "Premium"}
                      </div>
                      <div className={episodeStyles.data}>{item.date}</div>
                      <div className={episodeStyles.data}>
                        {item.length} min
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            : null}
        </div>
      </>
    );
  }
}
