"use client";
import { useState } from "react";
import { Stage, Layer, Rect, Image } from "react-konva";
import Konva from "konva";
import useImage from "use-image";
import { ImageConfig } from "konva/lib/shapes/Image";

// const GRID_SIZE = 40;

// const RoomCanvas = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [chairPos, setChairPos] = useState({ x: 0, y: 0 });
//   const [maxPos, setMaxPos] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const maxX = Math.floor(canvas.width / GRID_SIZE) - 1;
//     const maxY = Math.floor(canvas.height / GRID_SIZE) - 1;
//     setMaxPos({ x: maxX, y: maxY });

//     const img = new Image();
//     img.src = "/office-chair/office-chair0.png";
//     img.onload = () => drawCanvas(ctx, img, chairPos);
//   }, [chairPos]);

//   const drawCanvas = (
//     ctx: CanvasRenderingContext2D,
//     img: HTMLImageElement,
//     pos: { x: number; y: number }
//   ) => {
//     // Очистка
//     ctx.fillStyle = "#333";
//     ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

//     // Сетка
//     for (let x = 0; x <= ctx.canvas.width; x += GRID_SIZE) {
//       ctx.moveTo(x, 0);
//       ctx.lineTo(x, ctx.canvas.height);
//     }
//     for (let y = 0; y <= ctx.canvas.height; y += GRID_SIZE) {
//       ctx.moveTo(0, y);
//       ctx.lineTo(ctx.canvas.width, y);
//     }
//     ctx.strokeStyle = "black";
//     ctx.stroke();

//     // Стул
//     ctx.drawImage(
//       img,
//       pos.x * GRID_SIZE,
//       pos.y * GRID_SIZE,
//       GRID_SIZE,
//       GRID_SIZE
//     );
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
//     setChairPos((prev) => {
//       let { x, y } = prev;
//       if (e.key === "ArrowUp") y = Math.max(y - 1, 0);
//       if (e.key === "ArrowDown") y = Math.min(y + 1, maxPos.y);
//       if (e.key === "ArrowLeft") x = Math.max(x - 1, 0);
//       if (e.key === "ArrowRight") x = Math.min(x + 1, maxPos.x);
//       return { x, y };
//     });
//   };

//   return (
//     <div tabIndex={0} onKeyDown={handleKeyDown} style={{ outline: "none" }}>
//       <canvas ref={canvasRef} width={400} height={400} />
//     </div>
//   );
// };

interface Box {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
}

type Props = {
  image: string;
} & Omit<ImageConfig, "image">;

const URLImage = ({ image, ...rest }: Props) => {
  const [img] = useImage(image, "anonymous");
  return <Image image={img} {...rest} />;
};

const RoomCanvas = () => {
  const colors = [
    "/office-chair/office-chair0.png",
    "/closet/closet0.png",
    "/nightstand/nightstand0.png",
    "/bed/bed0.png",
    "/sofa/sofa0.png",
  ];
  const initialBoxes: Box[] = colors.map((color, i) => ({
    id: i.toString(),
    x: i * 30 + 50,
    y: i * 18 + 40,
    width: 100,
    height: 50,
    fill: color,
    stroke: "black",
    strokeWidth: 0,
  }));
  const [boxes, setBoxes] = useState<Box[]>(initialBoxes);

  // Initialize boxes with proper IDs and positions

  const handleDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
    // Move the dragged box to the end of the array to simulate moveToTop
    if (!(e.target instanceof HTMLElement)) {
      return;
    }
    const id = e.target.id();
    const box = boxes.find((b) => b.id === id) ?? null;
    const filteredBoxes: Box[] = boxes.filter((b) => b.id !== id);
    if (box !== null && filteredBoxes.length !== 0) {
      setBoxes([...filteredBoxes, box]);
    }
  };

  const handleDragMove = (e: Konva.KonvaEventObject<DragEvent>) => {
    if (!(e.target instanceof HTMLElement)) return;

    const id = e.target.id;

    const newBoxes = boxes.map((box) => {
      if (box.id === id) {
        return {
          ...box,
          x: e.target.x(),
          y: e.target.y(),
        };
      }
      return box;
    });

    setBoxes(newBoxes);
  };

  const handleDoubleClick = (id: string) => {
    // Remove the box on double click
    setBoxes(boxes.filter((box) => box.id !== id));
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {boxes.map((box) => (
          <URLImage
            key={box.id}
            // id={box.id}
            x={box.x}
            y={box.y}
            width={box.width}
            height={box.height}
            // fill={box.fill}
            image={box.fill}
            stroke={box.stroke}
            strokeWidth={box.strokeWidth}
            draggable
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDblClick={() => handleDoubleClick(box.id)}
            onDblTap={() => handleDoubleClick(box.id)}
            onMouseOver={(e) => {
              document.body.style.cursor = "pointer";
            }}
            onMouseOut={(e) => {
              document.body.style.cursor = "default";
            }}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default RoomCanvas;
