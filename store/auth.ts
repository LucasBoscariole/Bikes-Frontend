import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

export interface AuthState {
  authenticated: boolean;
  user: {
    first_name: string;
    last_name: string;
    email: string;
    id: number | null;
  };
}

const initialState: AuthState = {
  authenticated: false,
  user: {
    first_name: "",
    last_name: "",
    email: "",
    id: null
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.authenticated = action.payload.authenticated;
      state.user =  {
       first_name: action.payload.first_name,
       last_name: action.payload.last_name,
       email: action.payload.email,
       id: action.payload.id
     }
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", action.payload);
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setAuthState } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth;

export default authSlice.reducer;
