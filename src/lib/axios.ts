// import config from "@/config"
// import axios from "axios"

// export const axiosInstance = axios.create({
//     baseURL: config.baserUrl,
//     withCredentials: true
// })




// // Add a request interceptor
// axiosInstance.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     console.log('axios', config);
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   },
// );



// // Add a response interceptor
// axiosInstance.interceptors.response.use(function onFulfilled(response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//      console.log('axios', response);
//     return response;
//   }, function onRejected(error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   });


import config from "@/config";
import axios, { type AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
});



// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // console.log("Axios", config);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);


let isRefreshing = false;

let pendingQueue: {
  resolve: (value: unknown) => void;
  reject: (value: unknown) => void;
}[] = [];

const processQueue = (error: unknown) => {
  pendingQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(null);
    }
  });

  pendingQueue = [];
};



// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // console.log("Request failed", error.response.data.message);

    const originalRequest = error.config as AxiosRequestConfig & {
      _retry: boolean;
    };

    if (
      error.response.status === 500 &&
      error.response.data.message === "jwt expired" &&
      !originalRequest._retry
    ) {
      console.log("Your token is expired");

      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((error) => Promise.reject(error));
      }

      isRefreshing = true;
      try {
        const res = await axiosInstance.post("/auth/refresh-token");
        console.log("New Token arrived", res);

        processQueue(null);

        return axiosInstance(originalRequest);

      } catch (error) {
        processQueue(error);
        return Promise.reject(error);

      } finally {
        isRefreshing = false;
      }
    }

    //* For Everything
    return Promise.reject(error);
  }
);











// Add a response interceptor
// axiosInstance.interceptors.response.use(
//   function onFulfilled(response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     // console.log("Axios", response);
//     return response;
//   },
//   function onRejected(error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );