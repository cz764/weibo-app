import { message } from "antd";
import * as api from "../api/comments";

export function createComment(params = {}, isFirst) {
  return async () => {
    try {
      const { id } = await api.createComment(params);
      if (id) {
        message.success("评论成功");
        // if (isFirst) {
        //   window.location.href = "/";
        // }
      }
    } catch (ex) {
      console.log(ex);
      message.error(ex.message || "评论失败");
    }
  };
}

export function showComments(params = {}) {
  return async () => {
    const result = await api.showComments(params);
    console.log(result);
  };
}
