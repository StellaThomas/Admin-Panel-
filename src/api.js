import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // ✅ only once
});

export default API;
