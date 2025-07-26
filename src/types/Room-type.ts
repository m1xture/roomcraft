import { ActiveFurniture } from "./Furniture-type";

export interface Room {
  id: string;
  name: string;
  isPublic: boolean;
  isLocked: boolean;
  furniture: ActiveFurniture[];
  createdAt: Date;
}
