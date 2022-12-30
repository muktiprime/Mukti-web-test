/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import headerStyles from "./Header.module.css";
import { IoSearch } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { loginCheck, setCookies } from "../../utilities/auth";
import axios from "../../utilities/axios";
import { api_url } from "../../utilities/constants";
import Context from "../../context_api/global";
import LiveChat from "../LiveChat";
import { API_HOST_URL } from "../../config";
//import { propTypes } from "react-bootstrap/esm/Image";

export default function Header(props) {
  const [menus, setMenuData] = useState([]);
  const [show, setShow] = useState();
  // const [curPlan, setCurPlan] = useState([]);
  // const [searchedData, setSearchData] = useState([]);
  const [isloggedin, setLoginStatus] = useState(false);
  const router = useHistory();
  const { search_text, handletextChange } = useContext(Context);
  const path = window.location.pathname;
  const { userData } = useContext(Context);
  // console.log('path -> ', path)
  useEffect(() => {
    const fetchCategory = async () => {
      const response = await axios.get(`${api_url}/content/category/`);
      const data = await response.data;
      console.log("🚀 ~ file: Header.js:33 ~ fetchCategory ~ data", data)
      setMenuData(data);
      setLoginStatus(await loginCheck());
    };
    fetchCategory();
  }, []);

  const getSearchData = async (val) => {
    handletextChange(val);
    router.push(`/search`);
  };
  const handleLogout = async () => {

    // console.log(userData);
    let user_id = localStorage.getItem("mobile");
    // console.log(user_id);
    const s_response = await axios.get(`${API_HOST_URL}/devb/ajax/login/` + user_id + `/delete`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const s_data = await s_response;
    // console.log(s_data.data.status);
    if (s_data.data.status === 1 || s_data.data.status === 0) {
      localStorage.removeItem("loginToken");
      localStorage.removeItem("user");
      localStorage.removeItem("mobile");
      setCookies("");
      router.push("/");
      window.location.reload()
    }
  }
  return (
    <>
      <LiveChat />
      <div className={headerStyles.header}>
        <div className={headerStyles.responsiveProfileSection}>
          {/* Mobile User Drop Down Menu */}
          <button className={headerStyles.dropbtn_21}>
            <FaUserCircle />
          </button>
          <div className={headerStyles.dropdown_content_1}>
            {isloggedin ? (
              <Link to="/account/user-account">
                <li> My Account</li>
              </Link>
            ) : null}

            {isloggedin ? (
              <Link to="/account/active-plan">
                <li> My Plan </li>
              </Link>
            ) : null}
            {isloggedin ? (
              <Link to="/watchlist">
                <li> My Watchlist</li>{" "}
              </Link>
            ) : null}
            <Link
              onClick={handleLogout}
            >
              <li>{loginCheck() ? "Logout" : "Login"}</li>
            </Link>
          </div>
        </div>
        <div className={headerStyles.header__logo_box}>
          <Link to="/">
            <img
              src={require("../../assets/img/logo.png")}
              alt="logo"
              className={headerStyles.header__logo}
            />
          </Link>
        </div>

        <div className={headerStyles.header__options}>
          <div className={headerStyles.header__options_primary}>
            <Link to="/">
              <a
                className={headerStyles.header__option}
                style={{ color: path === "/" ? "#e22728" : "" }}
              >
                Home
              </a>
            </Link>
            {menus.map((menu, index) => (
              <Link key={index} to={`/${menu.slug}`}>
                <a
                  className={headerStyles.header__option}
                  style={{ color: path === `/${menu.slug}` ? "#e22728" : "" }}
                >
                  {menu.name}
                </a>
              </Link>
            ))}
            <Link to="/plans">
              <a
                className={headerStyles.header__option}
                style={{ color: path === `/plans` ? "#e22728" : "" }}
              >
                Subscriptions
              </a>
            </Link>
          </div>

          <div className={headerStyles.header__searchbar}>
            <div className={headerStyles.container_1}>
              <div className={headerStyles.container_2}>
                {window.location.pathname !== "/signup" &&
                  window.location.pathname !== "/login" ? (
                  <>
                    <span className={headerStyles.searchIcon}>
                      <IoSearch />
                    </span>
                    <input
                      list="data"
                      className={headerStyles.input_search}
                      type="search"
                      value={search_text}
                      onClick={() => {
                        router.push(`/search`);
                      }}
                      onChange={(e) => getSearchData(e.target.value)}
                      id="search"
                      placeholder="Shows Name..."
                      autoFocus={props.focus ? true : false}
                    />
                  </>
                ) : null}
                {/* <datalist id="data">
									{searchedData.map((item, index) => (
										<option key={index} value={item.title} />
									))}
								</datalist> */}
              </div>
            </div>
          </div>
        </div>

        {isloggedin ? (
          <div className={headerStyles.dropdown}>
            {/* Desktop My Account Menu */}
            <>
              <Link to="/account/user-account" style={{ width: "100%" }}>
                <a href="#" className={headerStyles.dropbtn}>
                  <FaUserCircle className={headerStyles.userIcon} />
                  <span className={headerStyles.userIconText}> My Account</span>
                </a>
              </Link>
            </>

            <div className={headerStyles.dropdown_Content}>
              {isloggedin ? (
                <Link to="/account/user-account">My Account</Link>
              ) : null}


              <Link
                onClick={handleLogout}
              // onClick={() => {
              //   const token = await JSON.parse(localStorage.getItem("loginToken"));
              //   console.log(token);
              //   // localStorage.removeItem("loginToken");
              //   // localStorage.removeItem("user");
              //   // setCookies("");

              //   router.push("/login");
              // }}
              >
                {loginCheck() ? "Logout" : "Login"}
              </Link>

              <div className={headerStyles.dropdown_content2}>
                {isloggedin ? (
                  <Link to="/account/active-plan">My Plan</Link>
                ) : null}
                {/* {isloggedin ? (
                  <Link to="/account/change-password">Change Password</Link>
                ) : null} */}
                {isloggedin ? <Link to="/watchlist">Watchlist</Link> : null}
                {isloggedin ? <Link to="/contact-us">Support</Link> : null}
              </div>
            </div>
          </div>
        ) : (
          <Link
            className={headerStyles.dropdownLogin}
            onClick={() => {
              localStorage.removeItem("loginToken");
              localStorage.removeItem("user");
              setCookies("");

              router.push("/login");
            }}
          >
            {loginCheck() ? "Logout" : "Login"}
          </Link>
        )}
        <div id={headerStyles.navContainer}>
          <div className={headerStyles.bg}></div>
          <div className={headerStyles.buttons} tabIndex="0">
            <span className={headerStyles.icon_bar}></span>
            <span className={headerStyles.icon_bar}></span>
            <span className={headerStyles.icon_bar}></span>
          </div>
          <div id={headerStyles.navContent} tabIndex="0">
            {/* Mobile Navbar */}
            <ul>
              {" "}
              <li>
                <Link to="/">
                  <a className={headerStyles.header__option}>Home</a>
                </Link>
              </li>
              {menus.map((menu, index) => (
                <li key={index}>
                  <Link key={index} to={`/${menu.slug}`}>
                    <a className={headerStyles.header__option}>{menu.name}</a>
                  </Link>
                </li>
              ))}
              <ul>
                <li>
                  <Link to="/plans">
                    <a className={headerStyles.header__option}>Subscritions</a>
                  </Link>
                </li>
                <li>
                  {isloggedin ? (
                    <Link to="/watchlist">
                      <a className={headerStyles.header__option}>Watchlist</a>
                    </Link>
                  ) : null}
                </li>

                <li>
                  <Link to="/contact-us">
                    <a className={headerStyles.header__option}>Support</a>
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-use">
                    <a className={headerStyles.header__option}>Terms of Use</a>
                  </Link>
                </li>
              </ul>
              <li>
                <div className={headerStyles.dropdownResponsive}>
                  <div className={headerStyles.dropdownContent}>
                    {isloggedin ? (
                      <Link to="/account/active-plan"> My Plan</Link>
                    ) : null}

                    {isloggedin ? (
                      <Link to="/account/user-account"> My Account</Link>
                    ) : null}

                    {!isloggedin ? <Link to="/login">Login</Link> : null}
                    {isloggedin ? (
                      <Link
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    ) : null}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
