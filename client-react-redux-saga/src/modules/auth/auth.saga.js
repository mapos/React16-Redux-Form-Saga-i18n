import { push } from "react-router-redux";
import { all, put, takeLatest, fork, call } from "redux-saga/effects";

import api from "./auth.api";

import { AUTH_UNSET, REFRESH_TOKEN } from "./auth.constants";

import { setAuth } from "./auth.actions";

// import {unsetAuth} from './auth.actions'

/**
 * Logout User Saga Function
 * @param  {object} action         Logout function
 */

export function* refreshTokenAsync(action) {
  // We refresh Token
  const response = yield call(api.refreshToken, action.refreshToken);

  const token = response.data.token;
  const refreshToken = response.data.refreshToken;

  // yield put(LOGIN.success(response))
  yield put(setAuth(token, refreshToken));
}

/**
 * Watch Login User
 */

export function* watchRefreshToken() {
  yield takeLatest(REFRESH_TOKEN, refreshTokenAsync);
}

/**
 * Logout User Saga Function
 * @param  {object} action         Logout function
 */

export function* logoutUserAsync(action) {
  // yield put(unsetAuth())

  // This function is at saga because later will add logout date/time
  // !! TODO: Logout date/time.

  // remove our token
  // localStorage.removeItem('token')

  // redirect to the /login screen
  yield put(push("/"));
}

/**
 * Watch Login User
 */

export function* watchLogoutUser() {
  return; //Change later as below is redirecting all the time so no page switching works
  yield takeLatest(AUTH_UNSET, logoutUserAsync);
}

/**
 * Root Saga Function
 */

export default function* rootSaga() {
  yield all([fork(watchLogoutUser), fork(watchRefreshToken)]);
}
