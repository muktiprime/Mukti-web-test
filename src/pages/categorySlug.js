/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import ReactGa from "react-ga";
import axios from "../utilities/axios";
import { api_url } from "../utilities/constants";
import styled from "styled-components";
import ListCard from "../components/ListCard/ListCard";
import lanStyles from "../components/LanguageSlider/languageSlider.module.css";
import Header from "../components/Header/Header";
import LanguageSlider from "../components/LanguageSlider/languageSlider";
import Footer from "../components/Footer/Footer";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Helmet } from "react-helmet";
import { capitalize } from "../utils";

const Override = styled.div`
  position: fixed;
  top: 40%;
  left: 47%;
  @media (max-width: 800px) {
    top: 40%;
    left: 40%;
  }
`;

export default function Category(props) {
  // const router = useRouter();
  const category_slug = props.match.params.category_slug;
  const [language, setLanguage] = useState([]);
  const [contentData, setContentData] = useState({});
  const [genre, setGenre] = useState([]);
  const [categorySlug, setCategorySlug] = useState(category_slug);
  const [category, setCategory] = useState(props.match.params.category);
  const [loading, setLoading] = useState(true);
  const [isData, togleData] = useState(false);
  // const [data, setData] = useState(props.data[Object.keys(props.data)]['content']);
  // const [generes, setGeneres] = useState(props.generes);

  ReactGa.initialize("UA-206471971-2");
  ReactGa.pageview(window.location.pathname + window.location.search);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      // console.log("entered useEffect");
      try {
        let response;
        if (category === "genre") {
          response = await axios.get(
            `${api_url}/content/genre/${categorySlug}/`
          );
          // console.log("genre");
        } else if (category === "language") {
          response = await axios.get(
            `${api_url}/content/language/${categorySlug}/`
          );
          // console.log("language");
        } else {
          const url = `${api_url}/content/category/${categorySlug}/`;
          // console.log("url", url);
          response = await axios.get(url);
        }

        const data = await response.data;
        const language = await axios.get(`${api_url}/content/language/all/`);
        const generes = await axios.get(`${api_url}/content/genre/all/`);
        setLanguage(language.data);

        if (Object.keys(data).length !== 0) {
          setContentData(data);
        } else {
          togleData(true);
        }
        // console.log("data", data);
        setGenre(generes.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategory();
  }, []);

  const Generes = (slug) => {
    var href = `/category/genre/${slug}`;
    // router.push(href);
  };
  const fetchLanguagedata = async (lang) => {
    var href = `/category/language/${lang}`;
    // router.push(href);
  };

  if (loading) {
    return (
      <Override>
        <Loader type="Bars" color="red" height={80} width={80} />
      </Override>
    );
  } else if (isData) {
    return (
      <div>
        <Header />
        <h4 style={{ textAlign: "center", color: "white", margin: "15%" }}>
          No content found!!
        </h4>
      </div>
    );
  } else {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Mukti Prime : {capitalize(category_slug)}</title>
        </Helmet>
        <Header />
        <div className="Container">
          <h1 className={lanStyles.headingBanner}>{category_slug} </h1>

          {contentData ? (
            <ListCard data={contentData[Object.keys(contentData)]["content"]} />
          ) : null}

          {/* { Object.keys(data).map((item, index) => {
                    console.log('content in index',data[item]['content']);
                        return <MediaScreen
                        key={item}  
                        heading={item}
                        moveCount= {index+1}
                        data={data[item]['content']}
                        />
                    })}     */}

          {/* <h5 className={lanStyles.heads}>Watch in your language</h5>
                    <LanguageSlider language={language} fetchData={fetchLanguagedata} />
                    <br />
                    <h5 style={{ marginTop: 4 }} className={lanStyles.heads}>
                        Genre
                    </h5>
                    <LanguageSlider language={genre} fetchData={Generes} /> */}
        </div>
        <Footer />
      </div>
    );
  }
}
