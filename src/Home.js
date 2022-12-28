/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import ReactGa from "react-ga";
import Header from "./components/Header/Header";
import Caraousel from "./components/Carousel/carouselSlider";
import axios from "./utilities/axios";
import { api_url } from "./utilities/constants";
import lanStyles from "./components/LanguageSlider/languageSlider.module.css";
import Slider from "./components/Slider/Slider";
import styled from "styled-components";
// import MediaScreen from "./components/CarouselCard/MediaScreen/MediaScreen";
import { useHistory } from "react-router-dom";
import LanguageSlider from "./components/LanguageSlider/languageSlider";
// import Category from "./pages/categorySlug";
import Footer from "./components/Footer/Footer";
import Loader from "react-loader-spinner";

// import { toast } from "react-toastify";

// import { is_logged_in, loginCheck } from "./utilities/auth";
import RecentContinue from "./components/RecentContinue";
import Context from "./context_api/global";
import RecentCard from "./components/RecentContinue/RecentCard";
import { Helmet } from "react-helmet";
import { capitalize } from "@mui/material";
import LiveChat from "./components/LiveChat";
const Override = styled.div`
  position: fixed;
  top: 40%;
  left: 47%;
  @media (max-width: 800px) {
    top: 40%;
    left: 40%;
  }
`;

const Home = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log("🚀 ~ file: Home.js:41 ~ Home ~ data", data)
  const [banner, setBanner] = useState([]);
  const [language, setLanguage] = useState([]);
  const [generes, setGeneres] = useState([]);
  const [location, setLocation] = useState();
  const [titlechg, setTitlechg] = useState();
  const [category, setCategory] = useState("media");
  const router = useHistory();
  const { continueData, contentContinue } = useContext(Context);
  const user = localStorage.getItem("user", null);
  // console.log('USER -> ', user);
  useEffect(() => {
    const fetchContents = async () => {
      setLoading(true);
      setLocation(window.location.pathname);
      try {
        const isAuthenticated = localStorage.getItem("loginToken");
        if (isAuthenticated) contentContinue();

        if (props.match.params.id) {
          var all_data = await axios.get(
            `${api_url}/content/category/all/${props.match.params.id}/`
          );
          var banner = await axios.get(
            // `${api_url}/content/banner/${props.match.params.id}/`
            `${api_url}/content/banner/all/`
          );
          setCategory("genre");
        } else {
          all_data = await axios.get(`${api_url}/content/category/all/`);
          banner = await axios.get(`${api_url}/content/banner/all/`);
        }

        var language = await axios.get(`${api_url}/content/language/all/`);
        var generes = await axios.get(`${api_url}/content/genre/all/`);

        setData(await all_data.data);
        setBanner(await banner.data);
        setLanguage(await language.data);
        setGeneres(await generes.data);
        // console.log("banner-data", banner);
        // console.log("generes", generes);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        // console.log(err);
      }
    };
    fetchContents();
  }, [props.match.params.id]);

  ReactGa.initialize("UA-206471971-2");
  ReactGa.pageview(window.location.pathname + window.location.search);

  useEffect(() => {
    if (location === "/") {
      setTitlechg("Home");
    }
    if (location === "/series") {
      setTitlechg("Series");
    }
    if (location === "/films") {
      setTitlechg("Films");
    }
    if (location === "/shows") {
      setTitlechg("Shows");
    }
    if (location === "/free") {
      setTitlechg("Free");
    }
    if (location === "/upcoming") {
      setTitlechg("Upcoming");
    }
  }, [location]);
  //   console.log("he", location);
  const fetchLanguagedata = async (lang) => {
    var href = `/category/language/${lang}`;
    router.push(href);
  };

  const fetchAllLanguagedata = async (lang) => {
    try {
      setLoading(true);
      //   console.log("change triggred");
      var language = await axios.get(
        `${api_url}/content/language/all/${lang}/`
      );
      const data = await language.data;
      setCategory("genre");
      setData(data);
      // toast.dark("Language changed to " + lang);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const Generes = (slug) => {
    var href = `/category/genre/${slug}`;
    router.push(href);
  };
  if (loading) {
    return (
      <Override>
        <Loader type="Bars" color="red" height={70} width={80} />
      </Override>
    );
  } else {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Mukti Prime - {capitalize(titlechg)}</title>
        </Helmet>
        <Header />
        <Caraousel banner={banner.banners} />
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
        {user && continueData.length !== 0 ? (
          <div>
            <h5 className={lanStyles.heads}>Continue watching</h5>
            <RecentContinue data={continueData} />
          </div>
        ) : null}
        <RecentCard data={continueData} />
        {Object.keys(data).map((item, index) => {
          // console.log("slider data", data[item]["content"], index);
          return (
            <Slider
              key={index}
              slug={data[item]["slug"]}
              heading={item}
              category={category}
              moveCount={index + 1}
              data={data[item]["content"]}
            />
          );
        })}
        {/* <br /> <br />
				<h5 className={lanStyles.heads}>Watch in your language</h5>
				<LanguageSlider
					language={language}
					screen="language"
					fetchData={fetchAllLanguagedata}
				/>
				<br /> */}
        {/* <h5 className={lanStyles.heads}>Watch in your language</h5>
				<LanguageSlider language={language} fetchData={fetchLanguagedata} />
				<br /> */}
        <h5 style={{ marginTop: 4 }} className={lanStyles.heads}>
          Generes
        </h5>
        <LanguageSlider language={generes} fetchData={Generes} />
        <Footer />
      </div>
    );
  }
};

export default Home;
