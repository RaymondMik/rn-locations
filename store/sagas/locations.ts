import { all, put, takeLatest, select } from "redux-saga/effects";
import * as actions from "../actions/locations";
import { toggleModal } from "../actions/modal"
import { FIREBASE_URI } from "../../constants";

import { Location } from "../../types";

function* fetchLocationsSaga() {
   yield takeLatest(actions.GET_LOCATIONS, function* () {
      try {
         const response = yield fetch(`${FIREBASE_URI}/locations.json`);
         const resData = yield response.json();
         let locations: Location[] = [];

         for (let key in resData) {
            if (resData.hasOwnProperty(key)) {
               locations.push({ _id: key, ...resData[key] });
            }
         }
 
         if (!response.ok) {
            throw `A ${response.status} error occured`
         }

         yield put(actions.getLocationsSuccess(locations));
      } catch(error) {
         yield put(actions.getLocationsFailure(error));
      }
   });
}

function* addLocationSaga() {
   yield takeLatest(actions.ADD_LOCATION, function* ({ payload }: any) {
      try {
         const { token } = yield select(state => state.auth);
         const { location, navigation } = payload;
         const response = yield fetch(`${FIREBASE_URI}/locations.json?auth=${token}`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(location)
         });

         if (!response.ok) {
            throw `A ${response.status} error occured`
         }

         yield all([
            put(actions.getLocations()),
            put(actions.addLocationSuccess()),
         ]);
         navigation.navigate("Home");
      } catch(error) {
         yield put(actions.addLocationFailure(error));
      }
   });
}

function* updateLocationSaga() {
   yield takeLatest(actions.UPDATE_LOCATION, function* ({ payload }: any) {
      try {
         const { token } = yield select(state => state.auth);
         const { location: { _id, title, description }, navigation } = payload;
   
         const response = yield fetch(`${FIREBASE_URI}/locations/${_id}.json?auth=${token}`, {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
               title,
               description
            })
         });

         if (!response.ok) {
            throw `A ${response.status} error occured`
         }

         yield all([
            put(actions.getLocations()),
            put(actions.updateLocationSuccess()),
         ]);

         navigation.goBack();
      } catch(error) {
         yield put(actions.updateLocationFailure(error));
      }
   });
}

function* deleteLocationSaga() {
   yield takeLatest(actions.DELETE_LOCATION, function* ({payload}: any) {
      try {
         const { token } = yield select(state => state.auth);
         const { location, navigation } = payload;
         const response = yield fetch(`${FIREBASE_URI}/locations/${location}.json?auth=${token}`, {
            method: "DELETE",
         });

         if (!response.ok) {
            throw `A ${response.status} error occured`
         }

         yield all([
            put(actions.getLocations()),
            put(actions.deleteLocationSuccess()),
            put(toggleModal()),
         ]);

         navigation.navigate("Home");
      } catch(error) {
         console.log(3344, error)
         yield put(actions.deleteLocationFailure(error));
      }
   });
}

export default function* locationsSaga() {
   yield all([
      fetchLocationsSaga(),
      addLocationSaga(),
      updateLocationSaga(),
      deleteLocationSaga()
   ]);
}
