"use client";

import { useUpdateRoomMutation } from "@/lib/redux/rooms/roomsApi";
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { Room } from "@/types/Room-type";
import { RootState } from "@reduxjs/toolkit/query";

export default ({}) => {
  const rooms = useSelector((state: RootState) => state.rooms.rooms);
  const [trigger] = useUpdateRoomMutation();
  const prevRoomsRef = useRef<Room[]>([]);

  useEffect(() => {
    const prevRooms = prevRoomsRef.current;

    const changedRooms = rooms.filter((room: Room) => {
      const prev = prevRooms.find((r) => r.id === room.id);
      return !isEqual(prev, room);
    });

    changedRooms.forEach((room: Room) => {
      trigger({id: room.id, updatedRoom: room});
    });

    prevRoomsRef.current = rooms;
  }, [rooms]);
  return null;
};
