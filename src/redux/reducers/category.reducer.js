import { combineReducers } from "redux";

const categoryReducer = (state = [], action) => {
  if (action.type === "SET_CATEGORIES") {
    return action.payload;
  }

  return state;
};

export default combineReducers({
  categoryReducer,
});
