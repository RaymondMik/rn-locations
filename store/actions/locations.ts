import { Location, UserGPSLocation } from "../../types";

export const GET_LOCATIONS: string = "GET_LOCATIONS";
export const GET_LOCATIONS_SUCCESS: string = "GET_LOCATIONS_SUCCESS";
export const GET_LOCATIONS_FAILURE: string = "GET_LOCATIONS_FAILURE";

export const ADD_LOCATION: string = "ADD_LOCATION";
export const ADD_LOCATION_SUCCESS: string = "ADD_LOCATION_SUCCESS";
export const ADD_LOCATION_FAILURE: string = "ADD_LOCATION_FAILURE";

export const UPDATE_LOCATION: string = "UPDATE_LOCATION";
export const UPDATE_LOCATION_SUCCESS: string = "UPDATE_LOCATION_SUCCESS"; 
export const UPDATE_LOCATION_FAILURE: string = "UPDATE_LOCATION_FAILURE";

export const DELETE_LOCATION: string = "DELETE_LOCATION";
export const DELETE_LOCATION_SUCCESS: string = "DELETE_LOCATION_SUCCESS";
export const DELETE_LOCATION_FAILURE: string = "DELETE_LOCATION_FAILURE";

export const SET_USER_GPS_LOCATION: string = "SET_USER_GPS_LOCATION";

export const getLocations = (refresh?: boolean) => ({
   type: GET_LOCATIONS,
   payload: refresh
});

export const getLocationsSuccess = (payload: Location[]) => ({
   type: GET_LOCATIONS_SUCCESS,
   payload
});

export const getLocationsFailure = (payload: string) => ({
   type: GET_LOCATIONS_FAILURE,
   payload
});

export const addLocation = (location: any, navigation: any) => ({
   type: ADD_LOCATION,
   payload: {
      location,
      navigation
   }
});

export const addLocationSuccess = () => ({
   type: ADD_LOCATION_SUCCESS
});

export const addLocationFailure = (payload: string) => ({
   type: ADD_LOCATION_FAILURE,
   payload
});

export const updateLocation = (location: any, navigation: any) => ({
   type: UPDATE_LOCATION,
   payload: {
      location,
      navigation
   }
});

export const updateLocationSuccess = () => ({
   type: UPDATE_LOCATION_SUCCESS
});

export const updateLocationFailure = (payload: string) => ({
   type: UPDATE_LOCATION_FAILURE,
   payload
});

export const deleteLocation = (location: string, navigation: any) => ({
   type: DELETE_LOCATION,
   payload: {
      location,
      navigation
   }
});

export const deleteLocationSuccess = () => ({
   type: DELETE_LOCATION_SUCCESS
});

export const deleteLocationFailure = (payload: string) => ({
   type: DELETE_LOCATION_FAILURE,
   payload
});

export const setUserGPSLocation = (payload: UserGPSLocation) => ({
   type: SET_USER_GPS_LOCATION,
   payload
});

