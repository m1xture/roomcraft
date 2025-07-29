import { setAccessToken } from "../../../lib/redux/auth/authSlice";
import { RootState } from "../../../lib/redux/store";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
// import deleteRefreshToken from "./deleteRefreshToken";
// import saveRefreshToken from "./saveRefreshToken";

type TokensResponse = {
  accessToken: string;
  refreshToken: string;
};

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  fetchBaseQuery({
    baseUrl: "https://roomcraft-backend.onrender.com/",
    prepareHeaders: (headers, { getState }) => {
      // this method should retrieve the token without a hook
      const state = getState() as RootState;
      const token = state?.auth?.accessToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include",
  });

export const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "GET",
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { accessToken, refreshToken } =
        refreshResult.data as TokensResponse;
      // store the new token in the store or wherever you keep it
      api.dispatch(setAccessToken(accessToken));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("redirect test");
      // refresh failed - do something like redirect to login or show a "retry" button
      // deleteRefreshToken();
      // redirect('/start');
      // if (typeof window !== "undefined") {
      //     window.location.href = "/start";
      // }
    }
  }
  return result;
};
