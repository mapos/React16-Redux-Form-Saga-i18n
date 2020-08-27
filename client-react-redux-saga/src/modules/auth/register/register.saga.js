import { all, call, put, takeLatest, fork } from "redux-saga/effects";
import { push } from "react-router-redux";
// import axios from 'axios'

import { USER_REGISTER } from "./register.action";
import { setAuth } from "../auth.actions";

import api from "./register.api";

import { SubmissionError } from "redux-form";

import localStorage from "../../../lib/localStorage";

export function* registerUserAsync(action) {
  try {
    const response = yield call(
      api.register,
      action.payload.email,
      action.payload.password,
      action.payload.username
    );
    const token = response.data.token;
    console.log("REGISTER !!! ", token);
    yield put(USER_REGISTER.success(response));

    yield put(setAuth(token));

    try {
      localStorage.setItem("token", JSON.stringify(token));
    } catch (e) {
      console.warn("Problem with localStorage.setItem:", e);
    }

    yield put(push("/dashboard"));
    yield put(push("/dashboard"));
  } catch (e) {
    // console.log('----catch---register')
    // console.log(e)

    let message = e.response.data.message;
    let field = e.response.data.field;

    const formError = new SubmissionError({
      [field]: message,
      // _error: 'Login failed!'
    });

    yield put(USER_REGISTER.failure(formError));

    // yield put(unsetAuth())

    localStorage.removeItem("token");

    // yield put({type: REGISTER_USER_FAILED, response: response.data})

    // yield put(USER_REGISTER.failure(e))
  }
}

// 2 watcher saga spawn a new asynchrous ACTION
export function* watchRegisterUser() {
  yield takeLatest(USER_REGISTER.REQUEST, registerUserAsync);
}

// 3 root saga Start all sagas here
export default function* rootSaga() {
  yield all([fork(watchRegisterUser)]);
}
