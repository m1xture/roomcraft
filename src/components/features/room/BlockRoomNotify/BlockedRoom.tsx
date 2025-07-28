"use client";

import { RefObject } from "react";
import css from "./BlockedRoom.module.scss";
import { Slide, Typography, Button } from "@mui/material";
import Konva from "konva";

const BlockedRoomNotify = ({stageRef}: {stageRef: RefObject<Konva.Stage | null>}) => {
  return (
    <Slide direction="up" in={true} style={{ zIndex: 99 }}>
      <div className={css.dialogOverlay}>
        <div className={css.dialog}>
          <Typography
            padding="0px"
            color="primary"
            fontSize="1rem"
            textAlign="center"
            component="h2"
            width="100%"
          >
            Увага! Ця комната заблокована для редагування!
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mb: 2, width: '50%', display: 'block' }}
            onClick={() => {
              if (!stageRef.current) return;
              const uri = stageRef.current.toDataURL({
                mimeType: "image/jpeg",
                quality: 1,
              });
              const link = document.createElement("a");
              link.download = "room.jpg";
              link.href = uri;
              link.click();
            }}
          >
            Зберегти фото кімнати
          </Button>
        </div>
      </div>
    </Slide>
  );
};

export default BlockedRoomNotify;
