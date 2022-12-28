/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import Header from "../Header/Header";
import SideBar from "../Sidebar/Sidebar";
import preStyles from "./Preference.module.css";
import { getRequest, postRequest } from "../../utilities/ApiCall";
import Context from "../../context_api/global";
import { Helmet } from "react-helmet";

const Preference = () => {
  const { userData } = useContext(Context);
  const [settings, setsettings] = useState({
    adult_lock: false,
    title: "",
    child_lock: false,
    promotional_email: true,
    user: userData.email,
    update_email: true,
  });

  useEffect(() => {
    userData.id && getSettingsPreferences();
  }, [userData]);

  const getSettingsPreferences = async () => {
    try {
      const response = await getRequest(
        `/user/${userData.id}/settings/preferences/`,
        true
      );
      const data = await response.json();
      setsettings({ ...data });
    } catch (err) {
      console.log(err);
    }
  };

  const savePreferences = async (body) => {
    try {
      const response = await postRequest(
        `/user/${userData.id}/settings/preferences/`,
        JSON.stringify(body),
        "PATCH",
        true
      );
      // console.log(response);
      const data = await response.json();
      // console.log("SETTING pref", data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateSettings = async (body) => {
    setsettings({ ...body });
    savePreferences({ ...body });
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Mukti Prime : Preference</title>
      </Helmet>
      <Header />
      <SideBar />
      <div className={preStyles.pref}>
        <h3 className="text-center">Account Privacy</h3>
        <div className="mx-5">
          {/* <div className="d-flex justify-content-between mt-5">
						<div className={preStyles.fonts}>Child Lock</div>
						<div>
							<div className="content">
								<label className={preStyles.switch}>
									<input
										value={settings.child_lock}
										onChange={(e) =>
											updateSettings({
												...settings,
												child_lock: !settings.child_lock,
											})
										}
										type="checkbox"
										checked={settings.child_lock}
									/>
									<span className={preStyles.slider}></span>
								</label>
							</div>
						</div>
					</div> */}
          <div className="d-flex justify-content-between mt-2">
            <div className={preStyles.fonts}>Family Protection</div>
            <div>
              <div className="content">
                <label className={preStyles.switch}>
                  <input
                    value={settings.adult_lock}
                    onChange={() =>
                      updateSettings({
                        ...settings,
                        adult_lock: !settings.adult_lock,
                      })
                    }
                    type="checkbox"
                    checked={settings.adult_lock}
                  />
                  <span className={preStyles.slider}></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <br />
        <h3 className="text-center mt-2">Email Preference</h3>
        <div className="mx-5">
          <div className="d-flex justify-content-between mt-5">
            <div className={preStyles.fonts}>Promotional Emails</div>
            <div>
              <div className="content">
                <label className={preStyles.switch}>
                  <input
                    value={settings.promotional_email}
                    onChange={() =>
                      updateSettings({
                        ...settings,
                        promotional_email: !settings.promotional_email,
                      })
                    }
                    type="checkbox"
                    checked={settings.promotional_email}
                  />
                  <span className={preStyles.slider}></span>
                </label>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <div className={preStyles.fonts}>Account Updates</div>
            <div>
              <div className="content">
                <label className={preStyles.switch}>
                  <input
                    value={settings.update_email}
                    onChange={() =>
                      updateSettings({
                        ...settings,
                        update_email: !settings.update_email,
                      })
                    }
                    type="checkbox"
                    checked={settings.update_email}
                  />
                  <span className={preStyles.slider}></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preference;
