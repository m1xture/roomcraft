import { ActiveFurniture } from "./Furniture-type";

export interface Room {
  id: string;
  name: string;
  isPublic: boolean;
  isLocked: boolean;
  furniture: ActiveFurniture[];
  createdAt: number;
  width: number;
  height: number;
}

export interface ReducedRoom {
  id: string;
  name: string;
  isPublic: boolean;
  isLocked: boolean;
  furniture: string[] | "No furniture added yet";
  createdAt: number;
}
