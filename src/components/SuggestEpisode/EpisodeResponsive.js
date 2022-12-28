import React, { Component } from "react";
import episodeStyles from "./SuggestEpisode.module.css";
import { Link } from "react-router-dom";

export default class EpisodeResponsive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  render() {
    const name = "Family Man";
    const episode = "sleepers";
    const type = this.props.video[0].type;

    return (
      <>
        <div className={episodeStyles.outerLayer}>
          {this.props.video.map((item, index) => (
            <Link
              key={index}
              to={`/player/${type === "episode" ? "movies" : "series"}/${
                item.slug
              }`}
              // to={`/player/${type === "episode" ? "series" : "movies"}/${
              //   item.slug
              // }`}
            >
              <div className={episodeStyles.innerLayer}>
                <div className={episodeStyles.middleSection}>
                  <div className={episodeStyles.upperlayer1}>
                    <div className={episodeStyles.logoCover}>
                      <img
                        src={require("../../assets/img/play-icon.png")}
                        alt="logo"
                        className={episodeStyles.logoImg}
                      />
                    </div>
                  </div>
                  <div className={episodeStyles.upperlayer2}>
                    <div className={episodeStyles.title}>
                      <h5 className={episodeStyles.episodeTitle}>
                        {item.episode ? item.episode + "." : ""} {item.title}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className={episodeStyles.imageSection}>
                  <img
                    alt="thumbnail"
                    src={item.thumbnail}
                    className={episodeStyles.imgClass}
                  />
                </div>
                {/* <div className={episodeStyles.lastSection}>
                  <div className={episodeStyles.data}>{item.date}</div>
                  <div className={episodeStyles.data}>{item.length}</div>
                </div>
                <div className={episodeStyles.middleSection}>
                  <div className={episodeStyles.description}>
                    <p className={episodeStyles.descriptionTitle}>
                      {item.description}
                    </p>
                  </div>
                </div> */}
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  }
}
