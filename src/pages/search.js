/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState, useContext } from "react";
import ReactGa from "react-ga";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Context from "../context_api/global";
import SearchCard from "../components/Slider/SearchCard";
import searchStyles from "../styles/search.module.css";
import { getRequest } from "../utilities/ApiCall";
import styled from "styled-components";
import Loader from "react-loader-spinner";

const Search = () => {
  // const { searchdata, search_text, setRefine, fetchData } = useContext(Context);
  const { search_text } = useContext(Context);
  // console.log('search text')
  const [searchdata, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refine, setRefineData] = useState({
    series: true,
    movies: true,
  });

  const fetchSearch = async (q) => {
    try {
      let newdata = [];
      const res = await getRequest(`/content/search/?q=${q}`);
      // console.log('res --> ', res);
      if (res.status === 200) {
        const data = await res.json();
        // console.log('data --> ', data);
        setSearchData(data);
        // if (!refine["series"] && !refine["movies"]){
        //     setSearchData(data);
        // } else {
        //     data.map((item, index) => {
        //         if (refine['movies']){
        //             if (item.type === "movies") {
        //                 newdata.push(item);
        //             }
        //         }
        //         if (refine["series"]){
        //             if (item.type === "series") {
        //                 newdata.push(item);

        //             }
        //         }
        //         return null
        //     });
        //     setSearchData(newdata);
        // }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    // setQ(search_text)
    fetchSearch(search_text);
  }, [search_text]);

  // let newData = searchdata;

  ReactGa.initialize("UA-206471971-2");
  ReactGa.pageview(window.location.pathname + window.location.search);

  // useEffect(() => {}, []);
  // console.log("DDDD", searchdata[Object.keys(searchdata)]);

  const refineData = (refineItem) => {
    const updatedItems = searchdata.filter((curElem) => {
      return curElem.category === refineItem;
    });
    setSearchData(updatedItems);
  };

  const togleRefine = (data) => {
    // setRefineData(data);
    setRefineData(data); //context api
    fetchSearch(search_text);
    // setRefineData(search_text); //context
  };
  if (loading) {
    return (
      <Override>
        <Loader type="Bars" color="red" height={70} width={80} />
      </Override>
    );
  }
  return (
    <div>
      <Header focus={true} />
      <div className={searchStyles.header}>
        {search_text ? (
          <p className={searchStyles.title}>
            Results for "<span>{search_text}</span>"
          </p>
        ) : (
          <p className={searchStyles.title}></p>
        )}

        {/* <div className={searchStyles.dropdown}>
					<button className={searchStyles.dropbtn}>Refine</button>
					<div className={searchStyles.dropdown_content}>
						<a>
							Movies
							<input
								onClick={() =>
									togleRefine({ ...refine, "movies": !refine['movies'] })
								}
								className={searchStyles.checkbox1}
								type="checkbox"
                                // {refine.movies && 'checked'}
                                
							/>
						</a>
						<a>
							Series
							<input
								className={searchStyles.checkbox2}
								onClick={() =>
									togleRefine({ ...refine, "series": !refine["series"] })
								}
								// onClick={() => refineData("series")}
								type="checkbox"
							/>
						</a>
					</div>
				</div> */}
      </div>
      {/* <hr className={searchStyles.line} /> */}

      {searchdata.length === 0 ? (
        <h4 style={{ color: "white", textAlign: "center", margin: 80 }}>
          No search result found
        </h4>
      ) : (
        <SearchCard data={searchdata} />
      )}
      <Footer />
    </div>
  );
};

const Override = styled.div`
  position: fixed;
  top: 40%;
  left: 47%;
  @media (max-width: 800px) {
    top: 40%;
    left: 40%;
  }
`;

export default Search;
