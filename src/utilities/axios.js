import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  //baseURL: "https://muktiprime.herokuapp.com/v1"
});

export default instance;
