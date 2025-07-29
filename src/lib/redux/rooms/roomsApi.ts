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
    getRoom: builder.query<{room: Room}, string>({
      query: (id) => ({
        url: `rooms/${id}`,
        method: "GET",
      }),
    }),
    updateRoom: builder.mutation<Room, { id: string; updatedRoom: Partial<Room> }>({
      query: ({ id, updatedRoom }) => ({
        url: `rooms/${id}`,
        method: "PUT",
        body: updatedRoom,
      }),
      invalidatesTags: [{ type: "Rooms", id: "LIST" }],
    }),
    deleteRoom: builder.mutation<void, string>({
      query: (id) => ({
        url: `rooms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Rooms", id: "LIST" }],
    }),
  }),
});

export const {
  useAddRoomMutation,
  useGetRoomQuery,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = roomsApi;
