import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:54719/api",
  responseType: "json",
});
