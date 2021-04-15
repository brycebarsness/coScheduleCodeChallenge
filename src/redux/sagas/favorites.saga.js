import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchFavoritesSaga() {
  try {
    let response = yield axios.get("/api/favorite");
    yield put({ type: "SET_FAVORITES", payload: response.data });
  } catch (error) {
    console.log("Error in fetch", error);
  }
}

function* removeFavoriteSaga(action) {
  try {
    yield axios.delete(`/api/favorite/delete/${action.payload}`);
    yield put({ type: "FETCH_FAVORITES" });
  } catch (error) {
    console.log("Error in delete", error);
  }
}

function* addFavoriteSaga(action) {
  try {
    yield axios.post(`api/favorite/addfavorite`, { payload: action.payload });
    yield put({ type: "FETCH_FAVORITES" });
  } catch (error) {
    console.log("Error in add", error);
  }
}

function* setCaptionSaga(action) {
  try {
    yield axios.put(`api/favorite/caption/${action.payload.gifId}`, {
      payload: action.payload.caption,
    });
    yield put({ type: "FETCH_FAVORITES" });
  } catch (error) {
    console.log("Error in add", error);
  }
}

function* favoritesSaga() {
  yield takeEvery("FETCH_FAVORITES", fetchFavoritesSaga);
  yield takeEvery("REMOVE_FAVORITE", removeFavoriteSaga);
  yield takeEvery("ADD_FAVORITE", addFavoriteSaga);
  yield takeEvery("SET_CAPTION", setCaptionSaga);
}

export default favoritesSaga;
