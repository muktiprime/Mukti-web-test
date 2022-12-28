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
//import { propTypes } from "react-bootstrap/esm/Image";

export default function Header(props) {
  const [menus, setMenuData] = useState([]);
  const [show, setShow] = useState();
  // const [curPlan, setCurPlan] = useState([]);
  const [searchedData, setSearchData] = useState([]);
  const [isloggedin, setLoginStatus] = useState(false);
  const [searchResult, setSearchResult] = useState();
  const router = useHistory();
  const { search_text, handletextChange } = useContext(Context);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await axios.get(`${api_url}/content/category/`);
      const data = await response.data;
      setMenuData(data);
      setLoginStatus(await loginCheck());
      // handletextChange("");
    };
    fetchCategory();
  }, []);

  const getSearchData = async (val) => {
    // fetchData(val);
    handletextChange(val);
    // setSearchResult(val);
    router.push(`/search`);
  };

  return (
    <>
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
              onClick={() => {
                localStorage.removeItem("loginToken");
                setCookies("");

                router.push("/login");
              }}
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
            {/* <Link href="/category/movies"> */}
            <Link to="/">
              <a className={headerStyles.header__option}>Home</a>
            </Link>
            {/* {menus.map((menu, index) => (
							<Link key={index} to={`/${menu && menu.slug}`}>
								<a className={headerStyles.header__option}>{menu.name}</a>
							</Link>
						))} */}
            <Link to="/plans">
              <a className={headerStyles.header__option}>Subscriptions</a>
            </Link>

            {/* {isloggedin ? (
							<Link to="/watchlist">
								<a className={headerStyles.header__option}>Watchlist</a>
							</Link>
						) : null} */}
          </div>

          {/* {isloggedin ? (
            <div className={headerStyles.dropdown_1}>
              <button className={headerStyles.dropbtn_21}>
                <FaUserCircle />
              </button>
              <div className={headerStyles.dropdown_content_1}>
                {isloggedin ? (
                  <Link to="/plans">
                    <li> Plans</li>
                  </Link>
                ) : null}

                {isloggedin ? (
                  <Link to="/account/transaction">
                    <li>Transactions </li>
                  </Link>
                ) : null}
                {isloggedin ? (
                  <Link to="/account/user-account">
                    <li> Settings</li>{" "}
                  </Link>
                ) : null}
                <Link
                  onClick={() => {
                    localStorage.removeItem("loginToken");
                    setCookies("");

                    router.push("/login");
                  }}
                >
                  <li>{loginCheck() ? "Logout" : "Login"}</li>
                </Link>
              </div>
            </div>
          ) : (
            <div className={headerStyles.dropdown_1}>
              <button className={headerStyles.dropbtn_1} >
                <FaUserCircle />
              </button>
              <div className={headerStyles.dropdown_content_1}>
                {isloggedin ? (
                  <Link to="/plans">
                    <li> Plans</li>
                  </Link>
                ) : null}
                
                {isloggedin ? (
                  <Link to="/account/transaction">
                    <li>Transactions </li>
                  </Link>
                ) : null}
                {isloggedin ? (
                  <Link to="/account/user-account">
                    <li> Settings</li>{" "}
                  </Link>
                ) : null}
                <Link
                  onClick={() => {
                    localStorage.removeItem("loginToken");
                    setCookies("");

                    router.push("/login");
                  }}
                >
                  <li>{loginCheck() ? "Logout" : "Login"}</li>
                </Link>
              </div>
            </div>
          )} */}

          <div className={headerStyles.header__searchbar}>
            <div className={headerStyles.container_1}>
              <div className={headerStyles.container_2}>
                {window.location.pathname !== "/signup" &&
                window.location.pathname !== "/login" ? (
                  <>
                    <span className={headerStyles.searchIcon}>
                      <IoSearch />
                    </span>
                    <input--update-db--update-db--update-db
                      // className="d-none d-sm-block"
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
                <datalist id="data">
                  {searchedData.map((item, index) => (
                    <option key={index} value={item.title} />
                  ))}
                </datalist>
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
                <Link to="/watchlist">
                  {/* <FaUser /> */}
                  Watchlist
                </Link>
              ) : null}

              <Link
                onClick={() => {
                  localStorage.removeItem("loginToken");
                  setCookies("");

                  router.push("/login");
                }}
              >
                {loginCheck() ? "Logout" : "Login"}
              </Link>

              <div className={headerStyles.dropdown_content2}>
                {isloggedin ? (
                  <Link to="/account/active-plan">My Plan</Link>
                ) : null}
                {isloggedin ? <Link to="/contact-us">Support</Link> : null}
              </div>
            </div>
          </div>
        ) : (
          <Link
            className={headerStyles.dropdownLogin}
            onClick={() => {
              localStorage.removeItem("loginToken");
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
              {/* {menus.map((menu, index) => (
								<li key={index}>
									<Link key={index} to={`/${menu && menu.slug}`}>
										<a className={headerStyles.header__option}>{menu.name}</a>
									</Link>
								</li>
							))} */}
              <ul>
                {/* <li>
									{show ? (
										<Link to="/plans">
											<a className={headerStyles.header__option}>Plans</a>
										</Link>
									) : null}
								</li> */}
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
                <div className={headerStyles.dropp}>
                  {/* <li>
										{isloggedin ? (
											<>
												<a className={headerStyles.header__option}>
													Settings
													<i
														style={{ marginLeft: "3px" }}
														class="fa fa-caret-down"
														aria-hidden="true"
													></i>
												</a>
											</>
										) : null}
									</li> */}

                  <div className={headerStyles.dropContent}>
                    {/* <li>
											<Link to="/account/user-account">
												<a className={headerStyles.ram}>My Profile </a>
											</Link>
										</li> */}
                    {/* <li>
											<Link to="/account/active-plan">
												<a className={headerStyles.ram}>My Plan</a>
											</Link>
										</li> */}
                    {/* <li>
											{" "}
											<Link to="/account/transaction">
												<a className={headerStyles.ram}>Transactions</a>
											</Link>
										</li> */}
                    {/* <li>
											<Link to="/account/change-password">
												<a className={headerStyles.ram}>Change Password</a>
											</Link>
										</li> */}
                    {/* <li>
											<Link to="/settings/preferences">
												<a className={headerStyles.ram}>Preferences</a>
											</Link>
										</li> */}
                    {/* <li>
											<Link to="/settings/close-account">
												<a className={headerStyles.ram}>Close Account</a>
											</Link>
										</li> */}
                  </div>
                </div>
              </ul>
              <li>
                <div className={headerStyles.dropdownResponsive}>
                  <div className={headerStyles.dropdownContent}>
                    {/* {isloggedin ? <Link to="plans">Plans</Link> : null} */}
                    {/* {isloggedin ? <Link to="/watchlist">WatchList</Link> : null} */}
                    {isloggedin ? (
                      <Link to="/account/active-plan"> My Plan</Link>
                    ) : null}

                    {isloggedin ? (
                      <Link to="/account/user-account"> My Account</Link>
                    ) : null}
                    {/* <Link to="/plans">Plans</Link> */}
                    {/* {isloggedin ? (
											<Link to="/account/transaction">Transactions</Link>
										) : null} */}

                    {!isloggedin ? <Link to="/login">Login</Link> : null}
                    {isloggedin ? (
                      <Link
                        onClick={() => {
                          localStorage.removeItem("loginToken");
                          setCookies("");
                        }}
                        to="/login"
                      >
                        Logout
                      </Link>
                    ) : null}

                    {/* <Link to="#">
                      <a
                        href="#"
                        onClick={() => {
                          localStorage.removeItem("loginToken");
                          setCookies("");
                          console.log("logout");
                          return <Redirect to="/login" />;
                        }}
                      >
                        {is_logged_in ? "Logout" : 'null'}
                      </a>
                    </Link> */}
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
