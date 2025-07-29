import { ActiveFurniture } from "@/types/Furniture-type";
import { ReducedRoom, Room } from "@/types/Room-type";
import {
  createSelector,
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { roomsApi } from "./roomsApi";
import { customAlphabet } from "nanoid";
import { RootState } from "../store";

const alphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const nanoid = customAlphabet(alphabet, 21);

const initialStateRooms: Room[] = [];

export const addRoomFlow = createAsyncThunk<
  void,
  { name: string },
  { state: RootState }
>("rooms/addRoomFlow", async ({ name }, { dispatch, getState }) => {
  // 1. Local update
  const tempRoom: Room = {
    id: nanoid(),
    name: name,
    isPublic: false,
    isLocked: false,
    furniture: [],
    createdAt: Date.now(),
    width: 6,
    height: 6,
  };
  dispatch(roomsSlice.actions.createRoom(tempRoom));

  // 2. Guard: only POST if user is authenticated
  const token = getState().auth.accessToken;
  if (!token) return;

  // 3. Fire the mutation
  try {
    await dispatch(roomsApi.endpoints.addRoom.initiate(tempRoom)).unwrap();
  } catch (err) {
    console.error("POST failed:", err);
  }
});

const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: initialStateRooms,
  },
  reducers: {
    // createRoom: {
    //   reducer(state, action: PayloadAction<Room>) {
    //     state.rooms.push(action.payload);
    //   },
    //   prepare(roomName: string): { payload: Room } {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         name: roomName,
    //         isPublic: false,
    //         isLocked: false,
    //         furniture: [],
    //         createdAt: Date.now(),
    //         width: 6,
    //         height: 6,
    //       },
    //     };
    //   },
    // },
    createRoom(state, action) {
      state.rooms.push(action.payload);
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
    editRSZ(
      state,
      action: PayloadAction<{ id: string; w: number; h: number }>
    ) {
      const idx = state.rooms.findIndex((r) => r.id === action.payload.id);
      state.rooms[idx].width = action.payload.w;
      state.rooms[idx].height = action.payload.h;
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
  editRSZ,
} = roomsSlice.actions;

export const selectAllRooms = createSelector(
  (state: RootState) => state.rooms.rooms,
  (rooms: Room[]): ReducedRoom[] => {
    return rooms.map((r) => {
      const copyRoom: ReducedRoom = {
        ...r,
        furniture:
          r.furniture.length === 0
            ? "No furniture added yet"
            : r.furniture.map((f) => f.title),
      };
      return copyRoom;
    });
  }
);

export const selectRoomById = (roomId: string) => {
  return createSelector(
    (state: RootState) => state.rooms.rooms,
    (rooms) => {
      return rooms.find((r) => r.id === roomId);
    }
  );
};
