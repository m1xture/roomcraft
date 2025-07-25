"use client";
import { useEffect, useMemo, useRef, useState } from "react";

const GRID_SIZE = 40;

const RoomCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chairPos, setChairPos] = useState({ x: 0, y: 0 });
  const [maxPos, setMaxPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const maxX = Math.floor(canvas.width / GRID_SIZE) - 1;
    const maxY = Math.floor(canvas.height / GRID_SIZE) - 1;
    setMaxPos({ x: maxX, y: maxY });

    const img = new Image();
    img.src = "/chair.png";
    img.onload = () => drawCanvas(ctx, img, chairPos);
  }, [chairPos]);

  const drawCanvas = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    pos: { x: number; y: number }
  ) => {
    // Очистка
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Сетка
    for (let x = 0; x <= ctx.canvas.width; x += GRID_SIZE) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, ctx.canvas.height);
    }
    for (let y = 0; y <= ctx.canvas.height; y += GRID_SIZE) {
      ctx.moveTo(0, y);
      ctx.lineTo(ctx.canvas.width, y);
    }
    ctx.strokeStyle = "black";
    ctx.stroke();

    // Стул
    ctx.drawImage(
      img,
      pos.x * GRID_SIZE,
      pos.y * GRID_SIZE,
      GRID_SIZE,
      GRID_SIZE
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    setChairPos((prev) => {
      let { x, y } = prev;
      if (e.key === "ArrowUp") y = Math.max(y - 1, 0);
      if (e.key === "ArrowDown") y = Math.min(y + 1, maxPos.y);
      if (e.key === "ArrowLeft") x = Math.max(x - 1, 0);
      if (e.key === "ArrowRight") x = Math.min(x + 1, maxPos.x);
      return { x, y };
    });
  };

  return (
    <div tabIndex={0} onKeyDown={handleKeyDown} style={{ outline: "none" }}>
      <canvas ref={canvasRef} width={400} height={400} />
    </div>
  );
};

export default RoomCanvas;
