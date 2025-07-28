"use client";
import FurnitureContextMenu from "@/components/features/room/FurnitureContextMenu/FurnitureContextMenu";
import RoomCanvas from "@/components/features/room/RoomCanvas/RoomCanvas";
import Container from "@/components/shared/layout/Container/Container";
import Header from "@/components/shared/layout/Header/Header";
import { editH, editW, setInitialFurnitures } from "@/lib/redux/furniture/furnitureSlice";
import { selectRoomById } from "@/lib/redux/rooms/roomsSlice";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const RoomSection = styled.section`
  padding-top: 10vh;
  @media screen and (max-width: 767px) {
    padding-top: 5vh;
  }
`;

const ControlPanel = styled.div`
  display: flex;
  gap: 5vh;
`;

export default () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const id: string = String(useParams()?.id) || "";
  if (!id) {
    router.replace("/rooms");
  }
  const room = useSelector(selectRoomById(id));
  const furniture = room?.furniture;
  const w = room?.width;
  const h = room?.height;
  dispatch(setInitialFurnitures(furniture));
  dispatch(editW(w));
  dispatch(editH(h));
  return (
    <RoomSection>
      <Header />
      <Container>
        <ControlPanel>
          <FurnitureContextMenu id={id}/>
          <RoomCanvas id={id}/>
        </ControlPanel>
      </Container>
    </RoomSection>
  );
};

