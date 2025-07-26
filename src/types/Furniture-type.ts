export interface ActiveFurniture {
  id: string;
  title: string;
  description: string;
  isLocked: boolean;
  angle: number;
  size: {
    width: number;
    height: number;
  };
  images: {
    "0": string;
    "90": string;
    "180": string;
    "270": string;
  };
  position: {
    x: number;
    y: number;
  };
}

export interface FurnitureInfo {
  id: string;
  title: string;
  description: string;
  image: string;
  size: {
    width: number;
    height: number;
  };
}
