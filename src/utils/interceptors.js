import { ACCESS_TOKEN_KEY } from "../constants";

const responseInterceptors = [
  {
    name: "formatResponse",
    success(response) {
      if (response.status === 200) {
        return response.data;
      }
      return Promise.reject(response);
    },
    fail(err) {
      return Promise.reject({
        code: err.response.status,
        message: err.response.statusText,
      });
    },
  },
];

const requestInterceptors = [
  {
    name: "addHttpRequestHeader",
    success(config) {
      config.headers["Authorization"] = `OAuth2 ${localStorage.getItem(
        ACCESS_TOKEN_KEY
      )}`;
      return config;
    },
    fail(err) {
      console.err("request error: ", err);
      return Promise.reject(err);
    },
  },
];

const interceptors = {
  response: responseInterceptors,
  request: requestInterceptors,
};

function doInstall(instance, option = {}) {
  const { type } = option;
  interceptors[type].forEach((interceptor) => {
    const { success, fail } = interceptor;
    instance.interceptors[type].use(success, fail);
  });
}

export function install(instance, option = {}) {
  doInstall(instance, {
    type: "response",
  });
  doInstall(instance, {
    type: "request",
  });
}
