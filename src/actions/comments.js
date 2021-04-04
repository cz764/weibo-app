import { message } from "antd";
import * as api from "../api/comments";
import { SHOW_COMMENTS } from "../constants/actions";

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
  return async (dispatch) => {
    const { comments = [] } = await api.showComments(params);
    dispatch({
      type: SHOW_COMMENTS,
      payload: comments,
    });
  };
}
