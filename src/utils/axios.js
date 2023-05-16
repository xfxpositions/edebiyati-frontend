import axios from "axios";
const instance = axios.create({
  baseURL: "https://altaic.org",
  timeout: 30000,
  headers: { "X-Custom-Header": "foobar" },
});
export default instance;
