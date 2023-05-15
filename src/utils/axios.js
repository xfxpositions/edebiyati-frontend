import axios from "axios";
const instance = axios.create({
  baseURL: "http://3.127.247.29",
  timeout: 30000,
  headers: { "X-Custom-Header": "foobar" },
});
export default instance;
