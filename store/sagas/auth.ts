import { all, put, takeLatest } from "redux-saga/effects";
import * as actions from "../actions/auth";
import { FIREBASE_SIGNUP_URI, FIREBASE_SIGNIN_URI } from "../../constants";
import { FIREBASE_API_KEY } from "../../secrets";

import { AuthStates } from "../../types";

function* createUserSaga() {
   yield takeLatest(actions.AUTHENTICATE, function* ({ payload }: any) {
      try {
         const { username, email, password, type } = payload;
         const uri: string = type === AuthStates.SignUp ? FIREBASE_SIGNUP_URI+FIREBASE_API_KEY : FIREBASE_SIGNIN_URI+FIREBASE_API_KEY;

         const apiPayload = type === AuthStates.SignUp ? {
            displayName: username,
            email,
            password,
            returnSecureToken: true
         } : {
            email,
            password,
            returnSecureToken: true
         };

         const response = yield fetch(uri, {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(apiPayload)
         });

         console.log(2222, response);

         if (!response.ok) {
            const errorResData = yield response.json();
            const errorId = errorResData.error.message;
            let message = "Something went wrong!";

            if (errorId === "EMAIL_EXISTS") {
               message = "This email exists already!";
            } else if (errorId === "EMAIL_NOT_FOUND") {
               message = "This email could not be found!";
            } else if (errorId === "INVALID_PASSWORD") {
               message = "This password is not valid!";
            }

            throw message;
         }

         const resData = yield response.json();

         yield put(actions.authenticateSuccess({ userId: resData.localId, token: resData.idToken, username: resData.displayName }));
      } catch(error) {
         yield put(actions.authenticateFailure(error));
      }
   });
}

export default function* authSaga() {
   yield all([
      createUserSaga()
   ]);
}