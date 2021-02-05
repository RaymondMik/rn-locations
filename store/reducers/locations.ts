import { LocationsState, Location } from "../../types";
import * as actions from "../actions/locations";

const initialState: LocationsState = {
   items: [],
   isLoading: false,
   isRefreshing: false,
   hasError: false,
};

const locationsReducer = (state: LocationsState = initialState, action: any) => {
   switch (action.type) {
      case actions.GET_LOCATIONS:
         return {
            ...state, 
            isLoading: !action.payload,
            isRefreshing: action.payload,
            hasError: false
         };
      case actions.GET_LOCATIONS_SUCCESS:
         return {
            ...state, 
            isLoading: false,
            isRefreshing: false,
            hasError: false,
            items: action.payload 
         };
      case actions.GET_LOCATIONS_FAILURE:
         return {
            ...state, 
            isLoading: false,
            isRefreshing: false,
            hasError: true
         };
      case actions.ADD_LOCATION:
         return {
            ...state, 
            isLoading: true,
            isRefreshing: false,
            hasError: false
         };
      case actions.ADD_LOCATION_SUCCESS:
         return {
            ...state, 
            isLoading: false,
            isRefreshing: false,
            hasError: false
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
            hasError: false
         };
      case actions.UPDATE_LOCATION_SUCCESS:
         return {
            ...state, 
            isLoading: false,
            isRefreshing: false,
            hasError: false
         };
      case actions.UPDATE_LOCATION_FAILURE:
         return {
            ...state, 
            isLoading: false,
            isRefreshing: false,
            hasError: true
         };
      case actions.DELETE_LOCATION:
         return {
            ...state, 
            isLoading: true,
            isRefreshing: false,
            hasError: false
         };
      case actions.DELETE_LOCATION_SUCCESS:
         return {
            ...state, 
            isLoading: false,
            isRefreshing: false,
            hasError: false
         };
      case actions.DELETE_LOCATION_FAILURE:
         return {
            ...state, 
            isLoading: false,
            isRefreshing: false,
            hasError: true
         };
      default:
         return state;
   }
}

export default locationsReducer;