import { message } from "antd";
import * as api from "../api/account";

export function getAccess(params = {}) {
  return async () => {
    try {
      const { access_token } = await api.getAccess(params);
      localStorage.setItem("weibo_app_access_token", access_token);
    } catch (ex) {
      message.error("Login Fail.");
    }
    window.location.href = "/";
  };
}
