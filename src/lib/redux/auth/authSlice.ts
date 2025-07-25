import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: "",
    refreshToken: "",
  },
  reducers: {
    setTokens(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setTokens } = authSlice.actions;
export const selectTokens = (state: RootState) => state.auth;
