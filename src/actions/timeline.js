import * as api from "../api/timeline";
import { GET_HOME_TIMELINE } from "../constants/actions";

export function getHomeTimeline(params = {}) {
  return async (dispatch) => {
    const result = await api.getHomeTimeline(params);
    dispatch({
      type: GET_HOME_TIMELINE,
      payload: result,
      params,
    });
  };
}
