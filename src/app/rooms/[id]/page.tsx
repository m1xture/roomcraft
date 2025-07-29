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
import { useGetRoomQuery } from "@/lib/redux/rooms/roomsApi";
import { createRoom, selectRoomById } from "@/lib/redux/rooms/roomsSlice";
import { nanoid } from "@reduxjs/toolkit";
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

const RoomPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const id = String(useParams()?.id || "");
  const { data, isLoading, isSuccess } = useGetRoomQuery(id);
  const roomFromStore = useSelector(selectRoomById(id));
  const room = roomFromStore || data?.room;
  const ref = useRef<Konva.Stage>(null);
  useEffect(() => {
    if (!roomFromStore) {
      if (!isLoading && !isSuccess) {
        router.replace("/rooms");
        return;
      }
      if (room) {
        dispatch(createRoom({
          ...room,
          _id: nanoid(),
        }))
        dispatch(setInitialFurnitures(room.furniture || []));
        dispatch(editW(room.width || 6));
        dispatch(editH(room.height || 6));
      }
    }
  }, [roomFromStore, room, isLoading, isSuccess, dispatch, router]);
  if (!room) return null;
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

export default RoomPage;