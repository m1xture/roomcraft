import { deleteRoom, toggleRoomLocked } from "@/lib/redux/rooms/roomsSlice";
import { AppDispatch } from "@/lib/redux/store";
import { ReducedRoom } from "@/types/Room-type";
import { ListItem, ListItemText, IconButton, Box } from "@mui/material";
import Link from "next/link";
import { MouseEvent, useCallback } from "react";
import { FaTrash, FaLock, FaLockOpen } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const StyledListItemText = styled(ListItemText)`
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  && {
    color: var(--secondary-color);
  }

  .MuiListItemText-primary,
  .MuiListItemText-secondary {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .MuiListItemText-primary {
    margin-bottom: 1em;
    font-size: large;
  }

  .MuiListItemText-secondary {
    color: var(--primary-color);
    opacity: 0.7;
  }
`;

const RoomItem = ({ room }: { room: ReducedRoom }) => {
  const dispatch: AppDispatch = useDispatch();
  const handleDeleteRoom = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      dispatch(deleteRoom(room.id));
    },
    [dispatch, room]
  );
  const handleLockRoom = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      dispatch(toggleRoomLocked(room.id));
    },
    [dispatch, room]
  );
  return (
    <ListItem
      sx={{
        backgroundColor: "#25394b",
        marginBottom: "2em",
        borderRadius: "6px",
        width: "50vw",
      }}
      secondaryAction={
        <>
          <IconButton
            edge="end"
            aria-label="lock"
            onClick={handleLockRoom}
            color="primary"
            sx={{ marginRight: "0.03em", opacity: 0.9 }}
          >
            {room.isLocked ? <FaLock /> : <FaLockOpen />}
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={handleDeleteRoom}
            color="primary"
            sx={{ opacity: 0.9 }}
          >
            <FaTrash />
          </IconButton>
        </>
      }
    >
      <Box sx={{ position: "relative", width: "100%" }}>
        <Link
          href={`/rooms/${room.id}`}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
        />
        <StyledListItemText
          primary={room.name}
          secondary={
            typeof room.furniture === "string"
              ? room.furniture
              : room.furniture.join(", ")
          }
        />
      </Box>
    </ListItem>
  );
};

export default RoomItem;
