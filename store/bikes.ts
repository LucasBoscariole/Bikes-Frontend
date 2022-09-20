import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

interface BikeFormat {
  id: number,

}

interface BikesState {
 allBikes: BikeFormat[] | null
}

const initialState: BikesState = {
 allBikes: null
};

export const bikeSlice = createSlice({
  name: "bike",
  initialState,
  reducers: {
    setAllBikes(state, action) {
     state.allBikes = action.payload
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

export const { setAllBikes } = bikeSlice.actions;

export const selectBikeState = (state: AppState) => state.bike;

export default bikeSlice.reducer;
 