export const AUTHENTICATE: string = "AUTHENTICATE";
export const AUTHENTICATE_SUCCESS: string = "AUTHENTICATE_SUCCESS";
export const AUTHENTICATE_FAILURE: string = "AUTHENTICATE_FAILURE";

export const authenticate = (payload: any) => ({
   type: AUTHENTICATE,
   payload
});

export const authenticateSuccess = (payload: any) => ({
   type: AUTHENTICATE_SUCCESS,
   payload
});

export const authenticateFailure = (payload: any) => ({
   type: AUTHENTICATE_FAILURE,
   payload
});

