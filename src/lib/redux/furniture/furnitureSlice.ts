import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
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

const generateRandomPosition = (
  state: typeof initialStateFurnitures,
  width: number,
  height: number
) => {
  const maxAttempts = 100;
  for (let i = 0; i < maxAttempts; i++) {
    const x = Math.floor(Math.random() * (state.w - width / 50)) * 50;
    const y = Math.floor(Math.random() * (state.h - height / 50)) * 50;

    const isOverlapping = state.furs.some((other) => {
      const otherW = other.angles[other.angle][1][0];
      const otherH = other.angles[other.angle][1][1];
      return !(
        x + width <= other.position.x ||
        x >= other.position.x + otherW ||
        y + height <= other.position.y ||
        y >= other.position.y + otherH
      );
    });
    if (!isOverlapping) return { x, y };
  }
  return { x: 0, y: 0 };
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
      const fur =
        state.furs[state.furs.findIndex((f) => f.id === action.payload.id)];
      const rotatedAngle = ((((fur?.angle +
        (action.payload.side === "right" ? 90 : -90)) %
        360) +
        360) %
        360) as 0 | 90 | 180 | 270;
      const fitsInBounds =
        fur.position.x + fur.angles[rotatedAngle][1][0] <= state.w * 50 &&
        fur.position.y + fur.angles[rotatedAngle][1][1] <= state.h * 50;
      if (fitsInBounds) {
        fur.angle = rotatedAngle;
      }
    },
    editW(state, action) {
      state.w = action.payload;
      state.furs = state.furs.filter((fur) => {
        const width = fur.angles[fur.angle][1][0];
        return fur.position.x + width <= state.w * 50;
      });
    },
    editH(state, action) {
      state.h = action.payload;
      state.furs = state.furs.filter((fur) => {
        const height = fur.angles[fur.angle][1][1];
        return fur.position.y + height <= state.h * 50;
      });
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
        position: generateRandomPosition(
          state,
          action.payload.sizes[0][0],
          action.payload.sizes[0][1]
        ),
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
