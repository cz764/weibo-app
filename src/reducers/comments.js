import { SHOW_COMMENTS, RESET_COMMENTS } from "../constants/actions";

const initState = {
  comments: [],
  page: 1,
  total: 0,
};

export default function reducer(state = initState, action) {
  const { comments, total } = action.payload || {};
  const { page } = action.params || {};
  switch (action.type) {
    case SHOW_COMMENTS:
      return {
        ...state,
        comments: [...new Set([...state.comments, ...comments])],
        page,
        total,
      };
    case RESET_COMMENTS:
      return initState;
    default:
      return state;
  }
}
