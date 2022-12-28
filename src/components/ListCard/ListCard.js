/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styles from "./ListCard.module.css";
import { parseCookies } from "nookies";
import { Link } from "react-router-dom";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api_url, image_base } from "../../utilities/constants";
import { loginCheck } from "../../utilities/auth";

const ListCard = (props) => {
  // console.log("List_Card", props.data);

  const [islogg, setIsLogg] = useState(loginCheck);

  //add to watchlist
  const addtoWatch = async (row) => {
    if (loginCheck()) {
      const datas = {
        slug: row.slug,
        content_type: row.type,
      };

      const cookies = parseCookies();
      const tok = JSON.parse(cookies.muktiprimeToken);
      const res = await fetch(`${api_url}/content/watchlist/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tok.access}`,
        },
        body: JSON.stringify(datas),
      });
      const response = await res.json();

      toast.dark(response.message);
    } else {
      toast.error("Please Login to continue");
    }
  };
  // console.log('PROPS DATA: ',props.data)
  return (
    <>
      <ToastContainer position={islogg ? "top-center" : "top-right"} />
      <div className={styles.mediaScreen}>
        <div className={styles.banner}>
          {props.data ? (
            props.data.map((item, index) => (
              <div key={index} className={styles.mediaDiv}>
                {item.PosterUrl ? (
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={`/content/${item.type}/${item.slug}`}
                  >
                    <img
                      alt="img"
                      src={`${item.PosterUrl}`}
                      className={styles.mediaImg}
                    />
                  </Link>
                ) : (
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={`/content/${item.type}/${item.slug}`}
                  >
                    <img
                      alt="img"
                      src={`${item.poster}`}
                      className={styles.mediaImg}
                    />
                  </Link>
                )}

                <div className={styles.displayhoverScreen}>
                  <div className={styles.hoverScreen}>
                    <div>
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to={`/content/${item.type}/${item.slug}`}
                      >
                        {item.PosterUrl ? (
                          <img
                            alt="img"
                            src={`${item.PosterUrl}`}
                            className={styles.mediaHoverImg}
                          />
                        ) : (
                          <img
                            alt="img"
                            src={`${item.poster}`}
                            className={styles.mediaHoverImg}
                          />
                        )}
                      </Link>
                    </div>
                    <div className={styles.hoverData}>
                      <div className={styles.hoverHeading}>
                        <div className={styles.playDiv}>
                          <div className={styles.playIcon}>
                            <PlayCircleFilledWhiteOutlinedIcon
                              className={styles.playButton}
                            />
                          </div>
                          <div className={styles.playtext}>Play</div>
                        </div>
                        <div>
                          <div
                            className={styles.addIcon1}
                            onClick={() => addtoWatch(item)}
                          >
                            <AddOutlinedIcon
                              className={styles.addIcon}
                            ></AddOutlinedIcon>
                            <span className={styles.tooltiptext}>
                              {islogg
                                ? "Add to watchlist"
                                : "Login to continue"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Link
                          style={{ textDecoration: "none", color: "white" }}
                          to={`/content/${item.type}/${item.slug}`}
                        >
                          <div className={styles.title}>{item.title}</div>
                          <div className={styles.overview}>
                            {item.description.length > 90
                              ? item.description.substr(0, 89) + "..."
                              : item.description}
                          </div>
                          <div className={styles.footerScreen}>
                            <div className={styles.runTime}>{item.length}</div>
                            <div className={styles.releaseYear}>
                              {item.released}
                            </div>
                            {/* <div>
															<ChatBubbleIcon className={styles.messageIcon} />
														</div> */}
                            <div className={styles.rated}>
                              {item.age_limit}+
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>No data available</h1>
          )}
        </div>
      </div>{" "}
    </>
  );
};

export default ListCard;
