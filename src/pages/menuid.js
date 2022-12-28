/* eslint-disable no-unused-vars */
import signinStyles from "./../styles/login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import React, { useState, useEffect } from "react";
import axios from "../utilities/axios";
import Caraousel from "../components/Carousel/CarouselSlider";
import { api_url, image_base } from "../utilities/constants";
import MediaScreen from "../components/CarouselCard/MediaScreen/MediaScreen";
import Slider from "../components/Slider/Slider";

export async function getServerSideProps({ query, req, res }) {
  var category = await axios.get(
    `${api_url}/content/category/all/${query.menuid}`
  );
  var category_data = await category.data;
  var banner = await axios.get(`${api_url}/content/banner/${query.menuid}/`);
  var banner_data = await banner.data.banners;
  return { props: { category_data: category_data, banner: banner_data } };
}

export default function Menu(props) {
  console.log("query", props.query);

  const [banner, setBanner] = useState(props.banner);

  return (
    <div>
      <Caraousel banner={banner} />
      <br />

      {/* {Object.keys(props.category_data).map((item, index) => {
        return (
          <MediaScreen
            key={props.category_data}
            slug={props.category_data[item]["slug"]}
            heading={item}
            moveCount={index + 1}
            data={props.category_data[item]["content"]}
          />
        );
      })} */}

      {Object.keys(props.category_data).map((item, index) => {
        return (
          <Slider
            key={props.category_data}
            slug={props.category_data[item]["slug"]}
            heading={item}
            moveCount={index + 1}
            data={props.category_data[item]["content"]}
          />
        );
      })}
    </div>
  );
}
