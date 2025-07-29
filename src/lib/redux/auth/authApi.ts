import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://roomcraft-backend.onrender.com/",
    credentials: "include",
    prepareHeaders(headers, api) {
        
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: "/auth/registration",
        method: "POST",
        body: userData,
      }),
    }),
    signin: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
    }),
    // changeData: builder.mutation<ChangeResp, ChangeBody>({
    //     async queryFn(
    //         arg,
    //         api,
    //         extraOptions,
    //     ): Promise<QueryReturnValue<ChangeResp, FetchBaseQueryError, FetchBaseQueryMeta>> {
    //         const formData = new FormData();
    //         if (arg.name) formData.append("name", arg.name);
    //         if (arg.avatar) formData.append("avatar", arg.avatar);
    //         const res = await baseQueryWithAuth(
    //             {
    //                 url: "/users/update",
    //                 method: "PUT",
    //                 body: formData,
    //             },
    //             api,
    //             extraOptions,
    //         );

    //         if (res.error) {
    //             return { error: res.error };
    //         }
    //         return { data: res.data as ChangeResp };
    //     },
    //     async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    //         try {
    //             const { data } = await queryFulfilled;
    //             // dispatch(setUser({ user: { name: data.name, avatarURL: data.avatarURL } }));
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     },
    // }),
    logout: builder.mutation({
      queryFn: (_arg, queryApi, _extraOptions, baseQuery) => {
        return baseQuery({
          url: "/auth/logout",
          method: "POST",
        });
      },
    }),
  }),
});

export const { useSignupMutation, useSigninMutation, useLogoutMutation } =
  authApi;
