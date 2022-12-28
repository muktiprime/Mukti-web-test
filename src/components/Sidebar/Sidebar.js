/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaHandPointDown } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import "../Sidebar/sidebar.css";
import Context from "../../context_api/global";

function Sidebar() {
  // const [activetab, setActiveTab] = useState("")
  const [current, setCurrent] = useState(window.location.pathname);
  const { logoutFromAllDevices } = useContext(Context);
  const [navbarOpen, setNavbarOpen] = useState(true);

  const handleToggle = () => {
    setNavbarOpen((prev) => !prev);
  };

  // import $ from 'jquery';
  // $('.toggleMenu').on('click', function(){
  //     $('.toggleList').slideToggle();
  // })

  return (
    <div style={{ padding: "0 15px" }}>
      <div className="row">
        <nav className="col-sm-10 m-auto col-md-3 col-10 d-sm-block bg-light sidebar">
          <button className="toggleMenu" onClick={handleToggle}>
            {navbarOpen ? "Show / Hide Menu -" : "Show / Hide Menu +"}
          </button>
          <ul
            className="nav nav-pills flex-column toggleList"
            style={{ display: navbarOpen ? "block" : "none" }}
          >
            <li className="nav-item">
              <Link
                className="nav-link active h7"
                style={{ backgroundColor: "#6c1515", padding: "5px" }}
                to="/account/profile-update"
              >
                <FaHandPointDown /> My account
              </Link>
              <li className="ml-4 text-white py-1">
                <Link
                  to="/account/user-account"
                  style={
                    current === "/account/user-account"
                      ? { color: "red" }
                      : null
                  }
                >
                  {" "}
                  My Account{" "}
                </Link>
              </li>
              <li className="ml-4 text-white py-1">
                <Link
                  to="/account/active-plan"
                  style={
                    current === "/account/active-plan" ? { color: "red" } : null
                  }
                >
                  My Plan
                </Link>
              </li>
              {/* <li className="ml-4 text-white py-1">
                  <Link
                    to="/account/profile-update"
                    style={
                      current === "/account/profile-update"
                        ? { color: "red"}
                        : null
                    }
                  >
                    Profile Update
                  </Link>
                </li> */}
              {/* <li className="ml-4 text-white py-1">
									<Link
										to="/account/transaction"
										style={
											current === "/account/transaction"
												? { color: "red" }
												: null
										}
									>
										Transactions
									</Link>
								</li> */}
              <li className="ml-4 text-white py-1">
                <Link
                  to="/account/change-password"
                  style={
                    current === "/account/change-password"
                      ? { color: "red" }
                      : null
                  }
                >
                  Change Password
                </Link>
              </li>
            </li>
            {/* <li className="nav-item">
                <Link className="nav-link bg1" to="/profile-update">
                  Profile Update
                </Link>
              </li> */}
            {/* <li className="nav-item">
                <Link className="nav-link bg1" to="/forgot-password">
                  Forgot Password
                </Link>
              </li> */}
            {/* <li className="nav-item">
                <Link className="nav-link bg1" to="/change-password">
                  Change Password
                </Link>
              </li> */}
            {/* <li className="nav-item">
                <Link className="nav-link bg1" to="/settings/preference">
                  Preferences
                </Link>
              </li> */}
            <Link
              className="nav-link active h7 mt-2"
              style={{ backgroundColor: "#6c1515", padding: "5px" }}
              to="/account/profile-update"
            >
              <FaHandPointDown /> Account settings
            </Link>

            <li className="nav-item">
              <Link
                className="nav-link bg1"
                to="/settings/preferences"
                style={
                  current === "/settings/preferences" ? { color: "red" } : null
                }
              >
                Preferences
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link bg1"
                to="/settings/close-account"
                style={
                  current === "/settings/close-account"
                    ? { color: "red" }
                    : null
                }
              >
                Close Account
              </Link>
            </li>
            {/* <br />
							<button
								onClick={() => logoutFromAllDevices()}
								type="button"
								className="btn btnssidebar"
							>
								<AiOutlineLogout className="iconsidebar" />
								Log out from all devices
							</button> */}
          </ul>
        </nav>
        {/* <main
            role="main"
            className="col-sm-9 ml-sm-auto col-md-10 pt-3 main"
          ></main> */}
      </div>
    </div>
  );
}

export default Sidebar;
