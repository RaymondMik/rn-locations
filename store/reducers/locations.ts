import { LocationsState, UserGPSLocation } from "../../types";
import * as actions from "../actions/locations";

const initialState: LocationsState = {
   items: [],
   isLoading: false,
   isRefreshing: false,
   hasError: null,
   userGPSLocation: null
};

const locationsReducer = (state: LocationsState = initialState, action: any) => {
   switch (action.type) {
      case actions.GET_LOCATIONS:
         return {
            ...state, 
            isLoading: !action.payload,
            isRefreshing: action.payload,
            hasError: null
         };
      case actions.GET_LOCATIONS_SUCCESS:
         return {
            ...state, 
            isLoading: false,
            isRefreshing: false,
            hasError: null,
            items: action.payload 
         };
      case actions.GET_LOCATIONS_FAILURE:
         return {
            ...state, 
            isLoading: false,
            isRefreshing: false,
            hasError: action.payload
         };
      case actions.ADD_LOCATION:
         return {
            ...state, 
            isLoading: true,
            isRefreshing: false,
            hasError: null
         };
      case actions.ADD_LOCATION_SUCCESS:
         return {
            ...state, 
            isLoading: false,
            isRefreshing: false,
            hasError: null
         };
      case actions.ADD_LOCATION_FAILURE:
         return {
            ...state, 
            isLoading: false,
            isRefreshing: false,
            hasError: true
         };
      case actions.UPDATE_LOCATION:
         return {
            ...state, 
            isLoading: true,
            isRefreshing: false,
            hasError: null
         };
      case actions.UPDATE_LOCATION_SUCCESS:
         return {
            ...state, 
            isLoading: false,
            isRefreshing: false,
            hasError: null
         };
      case actions.UPDATE_LOCATION_FAILURE:
         return {
            ...state, 
            isLoading: false,
            isRefreshing: false,
            hasError: action.payload
         };
      case actions.DELETE_LOCATION:
         return {
            ...state, 
            isLoading: true,
            isRefreshing: false,
            hasError: null
         };
      case actions.DELETE_LOCATION_SUCCESS:
         return {
            ...state, 
            isLoading: false,
            isRefreshing: false,
            hasError: null
         };
      case actions.DELETE_LOCATION_FAILURE:
         return {
            ...state, 
            isLoading: false,
            isRefreshing: false,
            hasError: action.payload
         };
      case actions.SET_USER_GPS_LOCATION:
         return {
            ...state,
            userGPSLocation: action.payload
         }
      default:
         return state;
   }
}

export default locationsReducer;