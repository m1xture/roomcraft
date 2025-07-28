export interface ActiveFurniture {
  id: string;
  title: string;
  tag: string;
  isLocked: boolean;
  angle: 0 | 90 | 180 | 270;
  angles: {
    "0": [string, [number, number]];
    "90": [string, [number, number]];
    "180": [string, [number, number]];
    "270": [string, [number, number]];
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
  tag: string;
  category: string;
  sizes: [
    [number, number],
    [number, number],
  ]
}
