import { ACCESS_TOKEN } from "../constants";

const responseInterceptors = [
  {
    name: "formatResponse",
    success(response) {
      return response.data;
    },
  },
];

const requestInterceptors = [
  {
    name: "addHttpRequestHeader",
    success(config) {
      config.headers["Authorization"] = `OAuth2 ${ACCESS_TOKEN}`;
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
