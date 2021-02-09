export interface Location {
   _id: string;
   createdBy: string,
   title: string;
   description: string;
   pictures: any[];
   latitude: string;
   longitude: string;
   isAssigned: boolean;
   isOpen: boolean;
};

export interface LocationsState {
   items: Location[];
   isLoading: boolean;
   isRefreshing: boolean;
   hasError: string | null;
};

export interface AuthState {
   userId: string | null;
   token: string | null;
   username: string | null;
   isLoading: boolean;
   hasError: string | null;
};

export interface ModalState {
   show: boolean;
}

export interface Navigation {
   route: any,
   navigation: {
      navigate: (route: string, params: any) => void,
      setOptions: (params: any) => void,
      setParams: (params: any) => void,
      addListener: (type: string, params: () => void) => void,
   }
}

export enum LocationScreenStatus {
   View = "view",
   Create = "create",
   Edit = "edit"
}

export enum AuthStates {
   SignUp = "signup",
   SignIn = "signin"
}