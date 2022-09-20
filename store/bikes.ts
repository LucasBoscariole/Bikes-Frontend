import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

export interface BikeFormat {
  id: number,
  description: string,
  image_url: string,
  is_rented: boolean,
  name: string,
  owner_id: number,
  price: number 
}

interface BikesState {
 allBikes: BikeFormat[] | null,
 bikesByUser: BikeFormat[] | null
}

const initialState: BikesState = {
 allBikes: [],
 bikesByUser: []
};

export const bikeSlice = createSlice({
  name: "bike",
  initialState,
  reducers: {
    setAllBikes(state, action) {
     state.allBikes = action.payload
    },
    setUserBikes(state, action) {
     state.bikesByUser = action.payload
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", action.payload);
      return {
        ...state,
        ...action.payload.bike,
      };
    },
  },
});

export const { setAllBikes, setUserBikes } = bikeSlice.actions;

export const selectBikeState = (state: AppState) => state.bike;

export default bikeSlice.reducer;
 