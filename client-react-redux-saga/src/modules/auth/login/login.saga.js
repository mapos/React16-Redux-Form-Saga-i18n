import { push } from "react-router-redux";
import {
  all,
  call,
  put,
  takeLatest,
  cancelled,
  fork,
} from "redux-saga/effects";
import axios from "axios";
// Config
import api from "./login.api";
// Redux actions
import { LOGIN } from "./login.action";
import { setAuth, unsetAuth } from "../auth.actions";

// For Validation display
import { SubmissionError } from "redux-form";

/**
 * Login User Saga Function
 * @param  {object} action          Request to Api for JWT Token (Login)
 */

export function* loginUserAsync(action) {
  let token;
  // default field and error message - network error
  let field = "_error";
  let message = "Internet problems ?";
  try {
    const response = yield call(
      api.login,
      action.payload.email,
      action.payload.password
    );
    // console.log('api call login user!!!')
    // console.log(response)

    const token = response.data.token;
    const refreshToken = response.data.refreshToken;
    // yield put(LOGIN.success(response))
    // console.log('login SET AUTH')
    yield put(setAuth(token, refreshToken));

    axios.defaults.headers.common = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };

    yield put(push("/dashboard"));
    /// Because page didn't refresh only after click on page
    //  to investigate
    yield put(push("/dashboard"));
  } catch (e) {
    if (e.response) {
      field = e.response.data.field;
      message = e.response.data.message;
    }

    const formError = new SubmissionError({
      [field]: message,
      // _error: 'Login failed!'
    });

    // yield put(unsetAuth())
    yield put(LOGIN.failure(formError));
  } finally {
    if (yield cancelled()) {
      yield put(unsetAuth());
      yield put(push("/login"));
    }
  }

  return token;
}

/**
 * Watch Login User
 */

export function* watchLoginUser() {
  yield takeLatest(LOGIN.REQUEST, loginUserAsync);
}

/**
 * Root Saga Function
 */

export default function* rootSaga() {
  yield all([fork(watchLoginUser)]);
}
