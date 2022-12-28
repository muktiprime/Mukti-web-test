import React from "react";
import resetStyles from "../styles/resetPassword.module.css";

const resetPassword = () => {
  return (
    <div>
      <div className={resetStyles.forgot}>
        <div className={resetStyles.forgot__bg} />
        <div className={resetStyles.forgot__container}>
          <div className={resetStyles.forgot__shadow}>
            <h1 className={resetStyles.forgot__title}>Reset Password</h1>

            <form>
              <div className={resetStyles.group}>
                <input className={resetStyles.form_input} />
                <label className={resetStyles.form_input_label}>
                  Old Password
                </label>
              </div>

              <div className={resetStyles.group}>
                <input className={resetStyles.form_input} />
                <label className={resetStyles.form_input_label}>
                  New Password
                </label>
              </div>

              <div className={resetStyles.group}>
                <input className={resetStyles.form_input} />
                <label className={resetStyles.form_input_label}>
                  Confirm Password
                </label>
              </div>

              <div className={resetStyles.forgot__btn_container}>
                <button
                  className={resetStyles.forgot__btn}
                  type="submit"
                  forgot
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default resetPassword;
