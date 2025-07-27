import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const furnitureSlice = createSlice({
  name: "furniture",
  initialState: [
    {
      icon: "/chair.png",
      id: "1",
      size: { width: 1, height: 1 },
      position: { x: 0, y: 0 },
    },
  ],
  reducers: {
    setFurniturePosition(state, action) {
      const furnitureIndex = state.findIndex((f) => f.id === action.payload.id);
      state[furnitureIndex].position = action.payload.position;
    },
  },
});

export const furnitureReducer = furnitureSlice.reducer;
export const { setFurniturePosition } = furnitureSlice.actions;
export const selectAllFurniture = (state: RootState) => state.furniture;
