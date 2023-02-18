import axios from "axios";
import { addAuthInterceptor } from "./authIntecepter";
import { addResponseInterceptor } from "./responseInteceptor";

const apiInstance = axios.create({
  baseURL: "INVALID_URL",
});

addAuthInterceptor(apiInstance);
addResponseInterceptor(apiInstance);

apiInstance.interceptors.request.use(
  async function (config) {
    config.baseURL = "https://serverless-iota-indol.vercel.app/api";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { apiInstance };
