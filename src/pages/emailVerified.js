import React from "react";
import vStyles from "../styles/emailVerified.module.css";
import { BsStarFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";

export default function emailVerified() {
  return (
    <div>
      <section className={vStyles.main_section}>
        <div className={vStyles.checkmark}>
          <BsStarFill className={vStyles.star} />
          <BsStarFill className={vStyles.star} />
          <BsStarFill className={vStyles.star} />
          <BsStarFill className={vStyles.star} />
          <BsStarFill className={vStyles.star} />
          <BsStarFill className={vStyles.star} />
          <FaCheck className={vStyles.checkmark__check} />
          <svg
            className={vStyles.checkmark__background}
            height={115}
            viewBox="0 0 120 115"
            width={120}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M107.332 72.938c-1.798 5.557 4.564 15.334 1.21 19.96-3.387 4.674-14.646 1.605-19.298 5.003-4.61 3.368-5.163 15.074-10.695 16.878-5.344 1.743-12.628-7.35-18.545-7.35-5.922 0-13.206 9.088-18.543 7.345-5.538-1.804-6.09-13.515-10.696-16.877-4.657-3.398-15.91-.334-19.297-5.002-3.356-4.627 3.006-14.404 1.208-19.962C10.93 67.576 0 63.442 0 57.5c0-5.943 10.93-10.076 12.668-15.438 1.798-5.557-4.564-15.334-1.21-19.96 3.387-4.674 14.646-1.605 19.298-5.003C35.366 13.73 35.92 2.025 41.45.22c5.344-1.743 12.628 7.35 18.545 7.35 5.922 0 13.206-9.088 18.543-7.345 5.538 1.804 6.09 13.515 10.696 16.877 4.657 3.398 15.91.334 19.297 5.002 3.356 4.627-3.006 14.404-1.208 19.962C109.07 47.424 120 51.562 120 57.5c0 5.943-10.93 10.076-12.668 15.438z"></path>
          </svg>
        </div>
      </section>
      <h2 className="text-center text-white m-5">Email Verified</h2>
    </div>
  );
}
