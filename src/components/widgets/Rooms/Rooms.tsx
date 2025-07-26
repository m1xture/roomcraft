"use client";

import CreateRoomBtn from "@/components/features/rooms/CreateRoomBtn/CreateRoomBtn";
import CreateRoomModal from "@/components/features/rooms/CreateRoomModal/CreateRoomModal";
import RoomsList from "@/components/features/rooms/RoomsList/RoomsList";
import Container from "@/components/shared/layout/Container/Container";
import styled from "styled-components";
import { useState } from "react";

const RoomsSection = styled.section`
  padding-top: 10vh;
  @media screen and (max-width: 767px) {
    padding-top: 5vh;
  }
`;

const Rooms = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <RoomsSection>
        <Container>
          <CreateRoomBtn openCb={() => setIsOpen(true)} />
          <RoomsList />
        </Container>
      </RoomsSection>
      <CreateRoomModal isOpen={isOpen} closeCb={() => setIsOpen(false)} />
    </>
  );
};

export default Rooms;
