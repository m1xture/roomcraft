import { createApi } from "@reduxjs/toolkit/query/react";
import { Room } from "@/types/Room-type";
import { baseQueryWithAuth } from "@/components/features/auth/auth";

interface ICreateRoomCResponse {
  room: Room;
}

export const roomsApi = createApi({
  reducerPath: "roomsApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Rooms"],
  endpoints: (builder) => ({
    addRoom: builder.mutation<Partial<ICreateRoomCResponse>, Room>({
      query: (newRoom) => ({
        url: "rooms",
        method: "POST",
        body: newRoom,
      }),
      invalidatesTags: [{ type: "Rooms", id: "LIST" }],
    }),
  }),
});

export const { useAddRoomMutation } = roomsApi;
