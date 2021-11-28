import axios from "axios";

const baseAxios = axios.create({
  baseURL: "api/tdx/",
  timeout: 10000,
});

export default baseAxios;
