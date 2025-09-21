// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000", // ✅ only once
// });

// export default API;


// // src/api.js
// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://127.0.0.1:5000", // your Node backend base
//   timeout: 10000,
// });

// const translatorApi = axios.create({
//   baseURL: "http://127.0.0.1:8000", // FastAPI translate
//   timeout: 8000,
// });

// export default API;
// export { translatorApi };




import axios from "axios";
const API = axios.create({
  baseURL: "http://127.0.0.1:5000" // backend base
});
export default API;
