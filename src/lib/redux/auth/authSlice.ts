import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: "",
    refreshToken: "",
    profile: {
      username: "",
      avatar: "",
      id: ""
    }
  },
  reducers: {
    setTokens(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload
    },
    setProfile(state, action) {
      state.profile = action.payload
    }
  },
});

export const authReducer = authSlice.reducer;
export const { setTokens, setAccessToken, setProfile } = authSlice.actions;
export const selectTokens = (state: RootState) => state.auth;
