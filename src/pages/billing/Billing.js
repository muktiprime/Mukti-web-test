import React, { useState, useEffect } from "react";
import billingStyle from "../../styles/billing.module.css";
import Receipt from "@mui/icons-material/Receipt";
import { api_url } from "../../utilities/constants";
import axios from "../../utilities/axios";
import Axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
  useHistory,
} from "react-router-dom";

const Billing = (props) => {
  const [f_name, setFname] = useState("");
  const [l_name, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [peraddress, setPerAddress] = useState("");

  const router = useHistory();

  useEffect(() => {
    //showRazorpay()
  }, []);

  const MakeBilling = async (e) => {
    e.preventDefault();
    var token = await JSON.parse(localStorage.getItem("loginToken")).access;

    let bodyData = {
      plan: props.match.params.billing,
      billing_address: `${address} `,
      billing_mobile: `${mobile}`,
      billing_name: `${f_name} ${l_name}`,
      status: true,
      billing_email: email,
    };

    var data = await Axios({
      url: `${api_url}/payment/bills/`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(bodyData),
    });
    data = await data.data;

    console.log("DATA", JSON.stringify(data));
    var href = `/payment/${data.id}`;

    router.push(href);
  };

  return (
    <div>
      <br /> <br />
      <form onSubmit={() => MakeBilling()} className={billingStyle.form}>
        <div>
          {/* <img
            src="https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/mail-letter-offer-256.png"
            alt="icon"
          /> */}
          <Receipt className={billingStyle.receipt} />
        </div>
        <span className={billingStyle.input}>
          <input
            onChange={(e) => setFname(e.target.value)}
            className={billingStyle.input_area}
            type="text"
            placeholder="First Name"
            required
          />
          <input
            className={billingStyle.input_area}
            type="text"
            onChange={(e) => setLname(e.target.value)}
            placeholder="Last name"
            required
          />
          <input
            className={billingStyle.input_area}
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
          />
          <input
            className={billingStyle.input_area}
            type="text"
            placeholder="Permanent Address"
            onChange={(e) => setPerAddress(e.target.value)}
            required
          />
          <input
            className={billingStyle.input_area}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className={billingStyle.input_area}
            type="text"
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Phone No."
          />
          <button className={billingStyle.button}>Submit</button>
        </span>
      </form>
    </div>
  );
};

export default Billing;
