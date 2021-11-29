import axios from "axios";

export default axios.create({
  baseURL: "https://apitestdjango.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
  },
});
