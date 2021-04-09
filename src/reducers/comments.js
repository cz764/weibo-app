import {
  SHOW_COMMENTS,
  RESET_COMMENTS,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "../constants/actions";

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
    case ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
