import { SHOW_COMMENTS } from "../constants/actions";

const initState = {};

export default function reducer(state = initState, action) {
  const comments = action.payload || {};
  switch (action.type) {
    case SHOW_COMMENTS:
      return {
        ...state,
        comments,
      };
    default:
      return state;
  }
}
