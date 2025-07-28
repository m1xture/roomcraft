"use client";
import { MouseEvent, useEffect, useState } from "react";
import { Stage, Layer, Rect, Image, Group } from "react-konva";
import useImage from "use-image";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllFurniture,
  selectH,
  selectSelectedId,
  selectW,
  setFurniturePosition,
  setSelectedID,
} from "@/lib/redux/furniture/furnitureSlice";
import { ImageConfig } from "konva/lib/shapes/Image";
import { selectRoomById } from "@/lib/redux/rooms/roomsSlice";
import { ActiveFurniture } from "@/types/Furniture-type";
import { KonvaEventObject } from "konva/lib/Node";

type Props = {
  image: string;
} & Omit<ImageConfig, "image">;

const URLImage = ({ image, ...rest }: Props) => {
  const [img] = useImage(image, "anonymous");
  return <Image image={img} {...rest} />;
};

const GRID_SIZE = 50;

const RoomCanvas = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const allFurniture = useSelector(selectAllFurniture);
  const selectedId = useSelector(selectSelectedId);
  const room = useSelector(selectRoomById(id));
  const stageWidth = useSelector(selectW) * GRID_SIZE;
  const stageHeight = useSelector(selectH) * GRID_SIZE;
  const gridLines = [];
  const handleDragEvt = (
    furniture: ActiveFurniture,
    e: KonvaEventObject<DragEvent>
  ) => {
    const furnitureWidth = furniture.angles[furniture.angle][1][0];
    const furnitureHeight = furniture.angles[furniture.angle][1][1];
    let newX = Math.max(0, Math.min(e.target.x(), stageWidth - furnitureWidth));
    let newY = Math.max(
      0,
      Math.min(e.target.y(), stageHeight - furnitureHeight)
    );
    const snappedX = snapToGrid(newX);
    const snappedY = snapToGrid(newY);
    const isOverlapping = allFurniture.some((other) => {
      if (other.id === furniture.id) return false;
      const otherX = other.position.x;
      const otherY = other.position.y;
      const otherW = other.angles[other.angle][1][0];
      const otherH = other.angles[other.angle][1][1];
      return !(
        snappedX + furnitureWidth <= otherX ||
        snappedX >= otherX + otherW ||
        snappedY + furnitureHeight <= otherY ||
        snappedY >= otherY + otherH
      );
    });
    if (isOverlapping) {
      e.target.position({
        x: furniture.position.x,
        y: furniture.position.y,
      });
      return;
    }
    e.target.position({ x: snappedX, y: snappedY });
    dispatch(
      setFurniturePosition({
        id: furniture.id,
        position: {
          x: snappedX,
          y: snappedY,
        },
      })
    );
  };
  for (let y = 0; y < stageHeight; y += GRID_SIZE) {
    for (let x = 0; x < stageWidth; x += GRID_SIZE) {
      gridLines.push(
        <Rect
          key={`grid-${x}-${y}`}
          x={x}
          y={y}
          width={GRID_SIZE}
          height={GRID_SIZE}
          stroke="#ccc"
          strokeWidth={1}
        />
      );
    }
  }

  const snapToGrid = (value: number) =>
    Math.round(value / GRID_SIZE) * GRID_SIZE;

  return (
    <div style={{ margin: "auto" }}>
      <Stage width={stageWidth + 2} height={stageHeight + 2}>
        <Layer onClick={() => dispatch(setSelectedID(""))}>{gridLines}</Layer>
        <Layer>
          {allFurniture.map((furniture) => (
            <Group
              key={furniture.id}
              x={furniture.position.x}
              y={furniture.position.y}
              draggable={!furniture.isLocked}
              onClick={() => dispatch(setSelectedID(furniture.id))}
              onDragEnd={(e) => handleDragEvt(furniture, e)}
              onMouseOver={() => (document.body.style.cursor = "grab")}
              onMouseOut={() => (document.body.style.cursor = "default")}
            >
              <URLImage
                width={furniture.angles[furniture.angle][1][0]}
                height={furniture.angles[furniture.angle][1][1]}
                image={furniture.angles[furniture.angle][0]}
              />
              {selectedId === furniture.id && (
                <Rect
                  x={0}
                  y={0}
                  width={furniture.angles[furniture.angle][1][0]}
                  height={furniture.angles[furniture.angle][1][1]}
                  stroke="red"
                  strokeWidth={2}
                  dash={[4, 4]}
                />
              )}
            </Group>
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default RoomCanvas;
