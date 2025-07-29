"use client";
import BlockedRoomNotify from "@/components/features/room/BlockRoomNotify/BlockedRoom";
import FurnitureContextMenu from "@/components/features/room/FurnitureContextMenu/FurnitureContextMenu";
import RoomCanvas from "@/components/features/room/RoomCanvas/RoomCanvas";
import Container from "@/components/shared/layout/Container/Container";
import Header from "@/components/shared/layout/Header/Header";
import {
  editH,
  editW,
  setInitialFurnitures,
} from "@/lib/redux/furniture/furnitureSlice";
import { selectRoomById } from "@/lib/redux/rooms/roomsSlice";
import Konva from "konva";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
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
  const room = useSelector(selectRoomById(id));
  const ref = useRef<Konva.Stage>(null);
  useEffect(() => {
    if (!room) {
      router.replace("/rooms");
      return;
    }
    const furniture = room.furniture || [];
    const w = room.width || 6;
    const h = room.height || 6;
    dispatch(setInitialFurnitures(furniture));
    dispatch(editW(w));
    dispatch(editH(h));
  }, [dispatch, room, router]);

  if (!room) {
    return null;
  }
  return (
    <>
      <Header />
      <RoomSection>
        <Container>
          <ControlPanel>
            {!room.isLocked && <FurnitureContextMenu stageRef={ref} id={id} />}
            <RoomCanvas stageRef={ref} id={id} />
          </ControlPanel>
          {room.isLocked && <BlockedRoomNotify stageRef={ref} />}
        </Container>
      </RoomSection>
    </>
  );
};
