import axios from "axios";

export default await axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  method: "POST",

});