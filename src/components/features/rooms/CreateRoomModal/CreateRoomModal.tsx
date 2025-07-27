"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { createRoom, selectAllRooms } from "@/lib/redux/rooms/roomsSlice";
import { FormEvent, useMemo } from "react";
import { AppDispatch } from "@/lib/redux/store";
import styled from "styled-components";

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
      dispatch(createRoom(input.value.trim()));
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
            required
            margin="dense"
            id="name"
            name="name"
            type="text"
            color="secondary"
            placeholder={`Моя кімната #${nextRoomNumber}`}
            fullWidth
            variant="standard"
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
