import React, { useEffect, useRef, useState } from "react";
import sliderStyles from "./carouselSlider.module.css";
// import Play from "@mui/icons-material-material/PlayCircleOutline";
import Play from "@mui/icons-material/PlayCircleOutlineSharp";
import { Link } from "react-router-dom";
// import { image_base } from "../../utilities/constants";
export default function Caraousel(props) {
  const buttonRef = useRef();
  const [onLoad, setOnLoad] = useState(true);

  const fireEvent = (el, eventName) => {
    const event = new Event(eventName, { bubbles: true });
    el.dispatchEvent(event);
  };
  useEffect(() => {
    if(onLoad){
      setTimeout(() => {
        if (buttonRef.current instanceof Element) {
          fireEvent(buttonRef.current, "click");
        }
      }, 3000);
      setOnLoad(false)
    }
  }, [])
  return (
    <>
      <div className={sliderStyles.container}>
        <div className={sliderStyles.slider}>
          <div id="demo" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              {props.banner ? (
                props.banner.map((item, index) => (
                  <div
                    key={index}
                    data-interval={3000}
                    className={
                      index === 0 ? "carousel-item active" : "carousel-item"
                    }
                  >
                    <Link
                      to={`/content/${
                        item.cate === "Movies" ? "movies" : "series"
                      }/${item.slug}`}
                    >
                      <img
                        className={sliderStyles.slider_image}
                        src={item.image}
                        alt="Banner"
                      />
                      <div className={sliderStyles.imageGradient}></div>
                      <div className={sliderStyles.movieText}>
                        <h1 className={sliderStyles.text_title}>
                          {item.title}
                        </h1>
                        {/* <span className={sliderStyles.imdbRatingStyle1} data->
                        <a>
                          <img
                            className={sliderStyles.imdb}
                            src="https://ia.media-imdb.com/images/G/01/imdb/images/plugins/imdb_46x22-2264473254._CB522736238_.png"
                          />{" "}
                        </a>{" "}
                        <span className={sliderStyles.rating}>
                          8.3<span className={sliderStyles.ofTen}>/10</span>
                        </span>{" "}
                        <img
                          src="https://ia.media-imdb.com/images/G/01/imdb/images/plugins/imdb_star_22x21-2889147855._CB522736550_.png"
                          className={sliderStyles.star}
                        />
                      </span> */}

                        <p className={sliderStyles.overview}>
                          {item.desc}
                          {/* them to indulge in unacceptable situations and are soon
                    forced to face mind-twisting and complicated obstacles
                    which make their troubled life even harder. Will they
                    overcome these situations and see the light? */}
                        </p>

                        <div className={sliderStyles.new}>
                          <button className={sliderStyles.btn_gradient}>
                            <Play
                              val={item.slug}
                              className={sliderStyles.play}
                            />
                            Watch Now
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div></div>
              )}
              {/* <div class="carousel-item">
                <img
                  class={sliderStyles.slider_image}
                  src="https://images-eu.ssl-images-amazon.com/images/S/pv-target-images/2f5c9e434c0e6517ef9d8d0580134f6afde4890cdf57df3a870e8d69a46afb02._V_SX1080_.jpg"
                  alt=""
                />
                <div className={sliderStyles.imageGradient}></div>
                <div className={sliderStyles.movieText}>
                  <h1 className={sliderStyles.text_title}>The Family Man</h1>

                  <span className={sliderStyles.imdbRatingStyle1} data->
                    <a href="#">
                      <img
                        className={sliderStyles.imdb}
                        src="https://ia.media-imdb.com/images/G/01/imdb/images/plugins/imdb_46x22-2264473254._CB522736238_.png"
                      />{" "}
                    </a>{" "}
                    <span className={sliderStyles.rating}>
                      8.9<span className={sliderStyles.ofTen}>/10</span>
                    </span>{" "}
                    <img
                      src="https://ia.media-imdb.com/images/G/01/imdb/images/plugins/imdb_star_22x21-2889147855._CB522736550_.png"
                      className={sliderStyles.star}
                    />
                  </span>

                  <p className={sliderStyles.overview}>
                    The story of a young married couple, Kartik and Naira
                    trying to strike the perfect balance between their family
                    values, personal beliefs and circumsta...
                  </p>
                  <Link href={`/content/abcd`}>
                    <div className={sliderStyles.new}>
                      <button
                        href={`/content/abcd`}
                        className={sliderStyles.btn_gradient}
                      >
                        <Play className={sliderStyles.play} />
                        Watch Now
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
              <div class="carousel-item">
                <img
                  class={sliderStyles.slider_image}
                  src="https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/3192/983192-h"
                  alt=""
                />
                <div className={sliderStyles.imageGradient}></div>
                <div className={sliderStyles.movieText}>
                  <h1 className={sliderStyles.text_title}>Teen Do Paanch</h1>

                  <span className={sliderStyles.imdbRatingStyle1} data->
                    <a href="#">
                      <img
                        className={sliderStyles.imdb}
                        src="https://ia.media-imdb.com/images/G/01/imdb/images/plugins/imdb_46x22-2264473254._CB522736238_.png"
                      />{" "}
                    </a>{" "}
                    <span className={sliderStyles.rating}>
                      6.3<span className={sliderStyles.ofTen}>/10</span>
                    </span>{" "}
                    <img
                      src="https://ia.media-imdb.com/images/G/01/imdb/images/plugins/imdb_star_22x21-2889147855._CB522736550_.png"
                      className={sliderStyles.star}
                    />
                  </span>

                  <p className={sliderStyles.overview}>
                    NEW EPISODE EVERYDAY. Vishal and Priyanka's lives turn
                    upside down when they end up adopting three kids. With
                    another surprise on the way, can they su...
                  </p>
                  <Link href={`/content/abcd`}>
                    <div className={sliderStyles.new}>
                      <button
                        href={`/content/abcd`}
                        className={sliderStyles.btn_gradient}
                      >
                        <Play className={sliderStyles.play} />
                        Watch Now
                      </button>
                    </div>
                  </Link>
                </div>
              </div> */}
            </div>
            <a className="carousel-control-prev" href="#demo" data-slide="prev">
              <span
                className="carousel-control-prev-icon"
                style={{ marginLeft: "-70%" }}
              ></span>
            </a>
            <a className="carousel-control-next"  href="#demo" ref={buttonRef} data-slide="next">
              <span
                className="carousel-control-next-icon"
                style={{ marginRight: "-60%" }}
              ></span>
            </a>
          </div>
        </div>
      </div>
      <br />
      <br />
    </>
  );
}
