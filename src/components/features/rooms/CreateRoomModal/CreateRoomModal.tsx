"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { createRoom, selectAllRooms } from "@/lib/redux/rooms/roomsSlice";
import { FormEvent, useMemo, useState } from "react";
import { AppDispatch } from "@/lib/redux/store";
import styled from "styled-components";
import z from "zod";

type ErrorProps =
  | {
      error: true;
      helperText: string;
    }
  | object;

const roomNameSchema = z
  .string({ error: "Недійсна назва кімнати" })
  .min(3, { error: "Надто коротка назва" })
  .max(35, { error: "Надто довга назва" });

const StyledDialog = styled(Dialog)`
  & .MuiDialog-paperWidthSm {
    background-color: var(--bg-color);
  }
`;

const StyledInput = styled(TextField)`
  .MuiInputBase-input {
    color: var(--primary-color);
  }
`;

const CreateRoomModal = ({
  isOpen,
  closeCb,
}: {
  isOpen: boolean;
  closeCb: () => void;
}) => {
  const allRooms = useSelector(selectAllRooms);
  const [error, setError] = useState<ErrorProps>({});
  const dispatch: AppDispatch = useDispatch();
  const nextRoomNumber: number = useMemo(() => {
    return allRooms.length + 1;
  }, [allRooms]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const input = (e.currentTarget as HTMLFormElement).elements.namedItem(
      "name"
    ) as HTMLInputElement;
    if (input) {
      const newRoomName = input.value.trim();
      const validationResult = roomNameSchema.safeParse(newRoomName);
      if (!validationResult.success) {
        const errObj: ErrorProps = {
          error: true,
          helperText: validationResult.error.issues[0]?.message,
        };
        setError(errObj);
        return;
      }
      setError({});
      dispatch(createRoom(newRoomName));
      closeCb();
    }
  };
  return (
    <StyledDialog open={isOpen} onClose={closeCb} color="primary">
      <DialogTitle color="primary" textAlign={"center"} fontSize={"1.8rem"}>
        Що це за кімната??
      </DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <form onSubmit={handleSubmit}>
          <StyledInput
            autoFocus={true}
            margin="dense"
            id="name"
            name="name"
            type="text"
            color="secondary"
            placeholder={`Моя кімната #${nextRoomNumber}`}
            fullWidth
            variant="standard"
            {...error}
          />
          <DialogActions>
            <Button onClick={closeCb}>Назад</Button>
            <Button type="submit">Створити</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </StyledDialog>
  );
};

export default CreateRoomModal;
