"use client";

import { selectAllRooms } from "@/lib/redux/rooms/roomsSlice";
import { useSelector } from "react-redux";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import RoomItem from "../RoomItem/RoomItem";
import styled from "styled-components";

const StyledBox = styled.div`
  display: flex;
  justify-content: center;
`;

const RoomsList = () => {
  const rooms = useSelector(selectAllRooms);
  if (rooms.length === 0) {
    return (
      <Typography
        component={"p"}
        variant="h3"
        color="primary"
        textAlign={"center"}
        mt={"10rem"}
      >
        Ти не створив{"(-ла)"} жодної кімнати{":("}
      </Typography>
    );
  }
  return (
    <StyledBox>
      <List>
        {rooms.map((room) => (
          <RoomItem key={room.id} room={room} />
        ))}
      </List>
    </StyledBox>
  );
};

export default RoomsList;
