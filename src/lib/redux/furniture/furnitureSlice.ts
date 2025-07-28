import { createSlice, nanoid } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { act } from "react";
import { Root } from "react-dom/client";
import { stat } from "fs";
import { ActiveFurniture } from "@/types/Furniture-type";

const initialStateFurnitures: {
  selectId: string;
  furs: ActiveFurniture[];
  w: number;
  h: number;
} = {
  selectId: "",
  furs: [],
  w: 6,
  h: 6,
};

const furnitureSlice = createSlice({
  name: "furniture",
  initialState: initialStateFurnitures,
  reducers: {
    setFurniturePosition(state, action) {
      const furnitureIndex = state.furs.findIndex(
        (f) => f.id === action.payload.id
      );
      state.furs[furnitureIndex].position = action.payload.position;
    },
    delFurniture(state, action) {
      state.furs = state.furs.filter((fur) => fur.id !== action.payload);
    },
    toggleBanFur(state, action) {
      const furnitureIndex = state.furs.findIndex(
        (f) => f.id === action.payload
      );
      state.furs[furnitureIndex].isLocked =
        !state.furs[furnitureIndex].isLocked;
    },
    setInitialFurnitures(state, action) {
      state.furs = action.payload;
    },
    setSelectedID(state, action) {
      state.selectId = action.payload;
    },
    setAngle(state, action) {
      const furnitureIndex = state.furs.findIndex(
        (f) => f.id === action.payload.id
      );
      const ang = state.furs[furnitureIndex].angle;
      let newAngle = action.payload.side === "right" ? ang + 90 : ang - 90;
      newAngle = ((newAngle % 360) + 360) % 360;
      state.furs[furnitureIndex].angle = newAngle;
    },
    editW(state, action) {
      state.w = action.payload;
    },
    editH(state, action) {
      state.h = action.payload;
    },
    addNewFurniture(state, action) {
      state.furs.push({
        id: nanoid(),
        title: action.payload.title,
        isLocked: false,
        tag: action.payload.tag,
        angle: 0,
        angles: {
          "0": [
            `/${action.payload.tag}/${action.payload.tag}0.png`,
            action.payload.sizes[0],
          ],
          "90": [
            `/${action.payload.tag}/${action.payload.tag}90.png`,
            action.payload.sizes[1],
          ],
          "180": [
            `/${action.payload.tag}/${action.payload.tag}180.png`,
            action.payload.sizes[0],
          ],
          "270": [
            `/${action.payload.tag}/${action.payload.tag}270.png`,
            action.payload.sizes[1],
          ],
        },
        position: {
          x: 0,
          y: 0,
        },
      });
    },
  },
});

export const furnitureReducer = furnitureSlice.reducer;
export const {
  setFurniturePosition,
  setInitialFurnitures,
  addNewFurniture,
  setSelectedID,
  delFurniture,
  toggleBanFur,
  setAngle,
  editW,
  editH,
} = furnitureSlice.actions;
export const selectAllFurniture = (state: RootState) => state.furniture.furs;
export const selectSelectedId = (state: RootState) => state.furniture.selectId;
export const selectH = (state: RootState) => state.furniture.h;
export const selectW = (state: RootState) => state.furniture.w;
export const selectSelectedFurniture = (state: RootState) =>
  state.furniture.furs.find((fur) => fur.id === state.furniture.selectId);
