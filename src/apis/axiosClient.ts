/* eslint-disable @typescript-eslint/no-unused-expressions */
import axios from "axios";
import queryString from "query-string";

const baseURL = "http://52.200.132.159";

const axiosClient = axios.create({
  baseURL,
  paramsSerializer: (params) => {
    return queryString.stringify(params);
  },
});

axiosClient.interceptors.request.use(async (config: any) => {
  let localStorageData: any = window.localStorage.getItem("user");
  if (localStorageData && typeof localStorageData === "string") {
    localStorageData = JSON.parse(localStorageData);
  }

  console.log("access: ", localStorageData?.message);
  config.headers = {
    Authorization: localStorageData
      ? `Bearer ${localStorageData?.message}`
      : "",
    Accept: "application/json",
    ...config.headers,
  };

  config.data;

  return config;
});

axiosClient.interceptors.response.use(
  (res: any) => {
    if (res.data && res.status >= 200 && res.status < 300) {
      return res.data;
    } else {
      return Promise.reject(res.data);
    }
  },
  (error) => {
    const { response } = error;
    return Promise.reject(response.data);
  }
);

export default axiosClient;
