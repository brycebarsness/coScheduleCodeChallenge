import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchCategorySaga() {
  try {
    let response = yield axios.get("/api/category");
    yield put({ type: "SET_CATEGORIES", payload: response.data });
  } catch (error) {
    console.log("Error in fetch", error);
  }
}

function* setCategorySaga(action) {
  try {
    yield axios.put(`api/favorite/category/${action.payload.gifId}`, {
      payload: action.payload.categoryId,
    });
    yield put({ type: "FETCH_FAVORITES" });
  } catch (error) {
    console.log("Error in add", error);
  }
}

function* categorySaga() {
  yield takeEvery("SET_CATEGORYID", setCategorySaga);
  yield takeEvery("FETCH_CATEGORIES", fetchCategorySaga);
}

export default categorySaga;
