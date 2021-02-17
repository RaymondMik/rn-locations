import * as actions from "../actions/auth";
import { AuthState } from "../../types";

const initialState: AuthState = {
   token: null,
   userId: null,
   username: null,
   isLoading: false,
   hasError: null,
   expiryDate: null
}

const auth = (state = initialState, action: any) => {
   switch (action.type) {
      case actions.AUTHENTICATE:
         return {
            ...state,
            isLoading: true,
            hasError: null
         }
      case actions.AUTHENTICATE_SUCCESS:
         return {
            ...state,
            userId: action.payload.userId,
            token: action.payload.token,
            username: action.payload.username,
            isLoading: false,
            hasError: null
         }
      case actions.AUTHENTICATE_FAILURE:
         return {
            ...state,
            userId: null,
            token: null,
            username: null,
            isLoading: false,
            hasError: action.payload
         }
      case actions.AUTHENTICATE_LOGOUT:
         return initialState;
      default:
         return state;
   }
};

export default auth;