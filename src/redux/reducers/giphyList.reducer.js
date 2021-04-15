import { combineReducers } from "redux";

const giphyListReducer = (state = { data: [] }, action) => {
  if (action.type === "SET_LIST") {
    return action.payload;
  }
  return state;
};

export default combineReducers({
  giphyListReducer,
});
