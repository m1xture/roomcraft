"use client";

import css from "./UnsavedChangesDialog.module.scss";
import { forwardRef, Ref, ReactElement } from "react";
import { TransitionProps } from "@mui/material/transitions";
import {
  Slide,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Box,
} from "@mui/material";



const UnsavedChangesDialog = ({
  isOpen,
  handleReset,
  handleSave,
}: {
  isOpen: boolean;
  handleClose: () => void;
  handleReset: () => void;
  handleSave: () => void;
}) => {
  return (
    <Slide direction="up" in={isOpen}>
      <div className={css.dialogOverlay}>
        <div className={css.dialog}>
          <DialogTitle padding={"0px"} color="primary" fontSize={"1rem"}>
            Агов! У тебе є незбережені зміни
          </DialogTitle>
          <DialogActions>
            <Button variant="text" size="small" onClick={handleReset}>
              Скасувати
            </Button>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={handleSave}
            >
              Зберегти
            </Button>
          </DialogActions>
        </div>
      </div>
    </Slide>
  );
};

export default UnsavedChangesDialog;
