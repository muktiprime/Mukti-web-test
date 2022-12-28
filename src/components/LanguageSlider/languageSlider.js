/* eslint-disable no-unused-vars */
import React from "react";
import lanStyles from "./languageSlider.module.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "@ntegral/react-owl-carousel";
import { image_base } from "../../utilities/constants";

const languageSlider = (props) => {
  return (
    <div>
      {/* <h5 className={lanStyles.heads}>Watch in your language</h5> */}

      <div style={{ marginLeft: "4%" }}>
        <OwlCarousel
          className="owl-theme"
          margin={5}
          autoWidth={true}
          dots={false}
          nav
        >
          {props.language.map((item, index) => (
            <div
              onClick={() => props.fetchData(item.slug)}
              key={index}
              className={lanStyles.carou}
            >
              <div className={lanStyles.content}>
                <img
                  alt="genre"
                  src={`${item.img}`}
                  className={lanStyles.imag}
                />
                {props.screen !== "language" ? (
                  <div className={lanStyles.contentSec}>{item.name}</div>
                ) : null}
              </div>
            </div>
          ))}

          {/* <div class="owl-nav">
          <button type="button" role="presentation" class="owl-prev">
            <span aria-label="Previous">‹</span>
          </button>
          <button type="button" role="presentation" class="owl-next">
            <span aria-label="Next">›</span>
          </button>
        </div> */}
        </OwlCarousel>
      </div>
    </div>
  );
};

export default languageSlider;
