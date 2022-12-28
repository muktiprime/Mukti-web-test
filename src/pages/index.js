/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import styles from "../styles/Home.module.css";
import Login from "./login";
import { useEffect, useState, useContext } from "react";
import Caraousel from "../components/Carousel/carouselSlider";
import MediaScreen from "../components/CarouselCard/MediaScreen/MediaScreen";
import LanguageSlider from "../components/LanguageSlider/languageSlider";
import axios from "../utilities/axios";
import { api_url } from "../utilities/constants";
import { useRouter } from "next/router";
import lanStyles from "../components/LanguageSlider/languageSlider.module.css";
import Slider from "../components/Slider/Slider";
import { Link, useHistory } from "react-router-dom";
import Context from "../context_api/global";

export default function Home(props) {
  var loggedIn = true;
  var display = "";
  const router = useHistory();
  const { continueData } = useContext(Context);

  if (loggedIn) {
    display = "user logged in";
  } else {
    return <Login />;
  }

  const [data, setData] = useState(props.res);
  const [banner, setBanner] = useState(props.banner.banners);
  const [language, setLanguage] = useState(props.language);
  const [generes, setGeneres] = useState(props.generes);

  const fetchLanguagedata = async (lang) => {
    var href = `/category/language/${lang}`;
    router.push(href);
  };

  const fetchAllLanguagedata = async (lang) => {
    var language = await axios.get(`${api_url}/content/language/all/${lang}/`);
    const data = await language.data;
    // console.log('data -> ',data)
    setData(data);
  };

  const Generes = (slug) => {
    var href = `/category/genre/${slug}`;
    router.push(href);
  };

  return (
    <>
      <Caraousel banner={banner} />
      <br />
      {/* {Object.keys(data).map((item, index) => {
        return (
          <MediaScreen
            key={item}
            slug={data[item]["slug"]}
            heading={item}
            moveCount={index + 1}
            data={data[item]["content"]}
          />
        );
      })} */}
      {/*<h1>{display}</h1>*/}
      {Object.keys(data).map((item, index) => {
        // console.log("slider data", data[item]["content"], index);
        return (
          <Slider
            key={item}
            slug={data[item]["slug"]}
            heading={item}
            moveCount={index + 1}
            data={data[item]["content"]}
          />
        );
      })}
      <br /> <br />
      <h5 className={lanStyles.heads}>Select language</h5>
      <LanguageSlider
        language={language}
        screen="language"
        fetchData={fetchAllLanguagedata}
      />
      <br />
      <h5 className={lanStyles.heads}>Watch in your language</h5>
      <LanguageSlider language={language} fetchData={fetchLanguagedata} />
      <br />
      <h5 style={{ marginTop: 4 }} className={lanStyles.heads}>
        Genres
      </h5>
      <LanguageSlider language={generes} fetchData={Generes} />
    </>
  );
}
