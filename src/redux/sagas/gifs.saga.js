import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchGiphyListSaga(action) {
  console.log("newGif", action.payload);
  try {
    let response = yield axios.get(`/api/favorite/search/${action.payload}`);
    yield put({ type: "SET_LIST", payload: response.data });
  } catch (error) {
    console.log(`Error getting new gif`, error);
  }
}

function* gifsSaga() {
  yield takeEvery("NEW_GIPHY", fetchGiphyListSaga);
}

export default gifsSaga;
