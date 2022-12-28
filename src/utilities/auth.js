import { parseCookies, setCookie } from "nookies";
export const token_key = "muktiprimeToken";

export const loginCheck = () => {
  if (localStorage.getItem("loginToken")) {
    return true;
  } else {
    return false;
  }
};

export const is_logged_in = loginCheck();

export const getToken = async () => {
  const token = await localStorage.getItem("loginToken");
  return token;
};
export const setCookies = (value) => {
  setCookie(null, "muktiprimeToken", value, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
};

export const getTokenFromCookies = () => {
  const cookie = parseCookies();
  return JSON.parse(cookie["muktiprimeToken"]);
};
