import { ActiveFurniture } from "./Furniture-type";

export interface Room {
  id: string;
  name: string;
  isPublic: boolean;
  furniture: ActiveFurniture[];
  createdAt: Date;
}
