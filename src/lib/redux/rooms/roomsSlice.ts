import { ActiveFurniture } from "@/types/Furniture-type";
import { Room } from "@/types/Room-type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { customAlphabet } from "nanoid";

const alphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const nanoid = customAlphabet(alphabet, 21);

const initialStateRooms: Room[] = [];

const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: initialStateRooms,
  },
  reducers: {
    createRoom: {
      reducer(state, action: PayloadAction<Room>) {
        state.rooms.push(action.payload);
      },
      prepare(roomName: string): { payload: Room } {
        return {
          payload: {
            id: nanoid(),
            name: roomName,
            isPublic: false,
            isLocked: false,
            furniture: [],
            createdAt: new Date(),
          },
        };
      },
    },
    editRoomName(state, action: PayloadAction<{ id: string; name: string }>) {
      const idx = state.rooms.findIndex((r) => r.id === action.payload.id);
      if (idx === -1) return;
      state.rooms[idx].name = action.payload.name;
    },
    editFurniture(
      state,
      action: PayloadAction<{ id: string; furniture: ActiveFurniture[] }>
    ) {
      const idx = state.rooms.findIndex((r) => r.id === action.payload.id);
      if (idx === -1) return;
      state.rooms[idx].furniture = action.payload.furniture;
    },
    toggleRoomLocked(state, action: PayloadAction<string>) {
      const idx = state.rooms.findIndex((r) => r.id === action.payload);
      if (idx === -1) return;
      state.rooms[idx].isLocked = !state.rooms[idx].isLocked;
    },
    toggleRoomPublic(state, action: PayloadAction<string>) {
      const idx = state.rooms.findIndex((r) => r.id === action.payload);
      if (idx === -1) return;
      state.rooms[idx].isPublic = !state.rooms[idx].isPublic;
    },
    deleteRoom(state, action: PayloadAction<string>) {
      state.rooms = state.rooms.filter((r: Room) => r.id !== action.payload);
    },
  },
});

export const roomsReducer = roomsSlice.reducer;
export const {
  createRoom,
  toggleRoomPublic,
  toggleRoomLocked,
  editRoomName,
  editFurniture,
  deleteRoom,
} = roomsSlice.actions;
