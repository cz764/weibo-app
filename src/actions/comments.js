import { message } from "antd";
import * as api from "../api/comments";
import {
  SHOW_COMMENTS,
  RESET_COMMENTS,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "../constants/actions";

export function createComment(params = {}, isFirst) {
  return async (dispatch) => {
    try {
      const result = await api.createComment(params);
      if (result) {
        message.success("评论成功");
        // if (isFirst) {
        //   window.location.href = "/";
        // }
        if (!isFirst) {
          dispatch({
            type: ADD_COMMENT,
            payload: result,
          });
        }
      }
    } catch (ex) {
      console.log(ex);
      message.error(ex.message || "评论失败");
    }
  };
}

export function showComments(params = {}) {
  return async (dispatch) => {
    const { comments = [], total_number = 0 } = await api.showComments(params);
    dispatch({
      type: SHOW_COMMENTS,
      payload: {
        comments,
        total: total_number,
      },
      params,
    });
  };
}

export function resetComments(params = {}) {
  return (dispatch) => {
    dispatch({
      type: RESET_COMMENTS,
    });
  };
}

export function deleteComment(params = {}) {
  return async (dispatch) => {
    const { id } = await api.deleteComment(params);
    if (id) {
      message.success("删除评论成功！");
      dispatch({
        type: REMOVE_COMMENT,
        payload: id,
      });
    }
  };
}
