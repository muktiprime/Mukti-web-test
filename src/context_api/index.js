/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import Context from "./global";
import { getRequest, postRequest } from "../utilities/ApiCall";
import { setCookies } from "../utilities/auth";
import { getToken } from "../utilities/auth";
export default class GlobalContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // searchData: [],
      search_text: "",
      userData: {},
      plan: { billing: {}, plan: {} },
      userId: "",
      // refine: { series: true, movies: true },
      continue: [],
    };
    // this.fetchData = this.fetchData.bind(this);
    this.fetchPlanData = this.fetchPlanData.bind(this);
    this.handletextChange = this.handletextChange.bind(this);
    // this.setRefine = this.setRefine.bind(this);
  }

  // searchData = (parms) => {
  // 	this.fetchData(parms);
  // };

  componentDidMount() {
    // this.fetchData("");
    const isAuthenticated = localStorage.getItem("loginToken");
    if (!isAuthenticated) return;
    this.getUser();
    this.fetchPlanData();
    this.refreshToken();
  }

  contentContinue = async () => {
    try {
      const response = await getRequest(`/content/continue/`, true);

      if (response.status === 200) {
        const data = await response.json();
        this.setState({ continue: data });
      }
    } catch (err) {
      console.log(err);
    }
  };

  getHomePageBanner = async () => {
    try {
      const response = await getRequest(`/content/banners/`);
      const data = await response.json();
      // console.log("Home Banner data", data);
    } catch (err) {
      console.log(err);
    }
  };

  logoutFromAllDevices = async () => {
    try {
      const response = await postRequest(`/v1/auth/logout`, "", "POST", true);
      localStorage.removeItem("loginToken");
      setCookies("");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // async fetchData(val) {
  // 	try {
  // 		const { refine } = this.state;
  // 		const newdata = [];
  // 		const searchData = await getRequest(`/content/search/?q=${val}`);
  // 		const data = await searchData.json();
  // 		if (!refine["series"] && !refine["movies"]){
  // 			return this.setState({ searchData: data });
  // 		}
  // 		data.map((item, index) => {
  // 			if (refine['movies']){
  // 				if (item.type === "movies") {
  // 					newdata.push(item);
  // 				}
  // 			}
  // 			if (refine["series"]){
  // 				if (item.type === "series") {
  // 					newdata.push(item);

  // 				}
  // 			}
  // 			return null
  // 		});
  // 		this.setState({ searchData: newdata });
  // 	} catch (err) {
  // 		console.log(err);
  // 	}
  // }

  // setRefine = (val) => {
  // 	this.setState({ refine: val });
  // };

  handletextChange = (val) => {
    this.setState({ search_text: val });
  };

  getUser = async () => {
    try {
      const response = await getRequest("/user/profile/", true);
      const user = await response.json();
      this.setState({ userData: user, userId: user.id });
      // console.log("USER_DATA", user);
    } catch (err) {
      console.log(err);
    }
  };

  async fetchPlanData() {
    // console.log('CALLED PLAN DATA')
    try {
      const planData = await getRequest("/user/plan/", true);
      const data = await planData.json();
      // console.log('CALLED PLAN DATA TRY', data)
      // console.log('CALLED PLAN DATA PREVIOUS', this.state.plan)
      if (data) {
        this.setState({ plan: data });
      } else {
        this.setState({ plan: { plan: { is_expired: "True" } } });
      }
    } catch (err) {
      // console.log('CALLED PLAN DATA CATCH')
      console.log(err);
    }
  }

  refreshToken = async () => {
    try {
      const accessToken = await getToken();
      let token;
      if (accessToken) token = JSON.parse(accessToken).refresh;
      const body = {
        refresh: token,
      };
      const response = await postRequest(
        `/auth/token/refresh/`,
        JSON.stringify(body),
        "POST"
      );
      const data = await response.json();
      // console.log("REFRESH TOKEN", data, response)
      if (response.status === 200 || response.status === 201) {
        if (data.access)
          localStorage.setItem(
            "loginToken",
            JSON.stringify({ ...body, access: data.access })
          );
      } else {
        // localStorage.removeItem("loginToken");
        setCookies("");
        // window.location.reload();
        // console.log("REFRESH", response, this.props.history);
        this.props.history.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    // console.log("PROPS", this.props);
    const { search_text, userId, userData } = this.state;
    return (
      <Context.Provider
        value={{
          // searchdata: searchData,
          // fetchData: this.fetchData,
          getUser: this.getUser,
          userData: userData,
          plan: this.state.plan,
          fetchPlanData: this.fetchPlanData,
          // setRefine: this.setRefine,
          handletextChange: this.handletextChange,
          search_text: search_text,
          userId: userId,
          logoutFromAllDevices: this.logoutFromAllDevices,
          contentContinue: this.contentContinue,
          continueData: this.state.continue,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
