"use client";

import { MenuItem, MenuList, Typography } from "@mui/material";
import {
  FaArrowRotateRight,
  FaArrowRotateLeft,
  FaLock,
  FaTrash,
} from "react-icons/fa6";
import styled from "styled-components";

const StyledMenu = styled(MenuList)`
  width: 16vw;
  background-color: #1e2f3e;
  border-radius: 8px;
`;

const MenuIcon = styled(FaArrowRotateRight)`
  width: 1.8vw;
  margin-right: 0.9vw;
`;

const StyledMenuItem = styled(MenuItem)`
  transition: background-color 225ms;
  &:hover {
    background-color: #2b4359;
  }
`;

const FurnitureContextMenu = () => {
  return (
    <StyledMenu>
      <StyledMenuItem>
        <MenuIcon fill="var(--primary-color)" />
        <Typography color="primary" component="p" fontSize={"1vw"}>
          на 90° вправо
        </Typography>
      </StyledMenuItem>
      <StyledMenuItem>
        <MenuIcon as={FaArrowRotateLeft} fill="var(--primary-color)" />
        <Typography color="primary" component="p" fontSize={"1vw"}>
          на 90° вліво
        </Typography>
      </StyledMenuItem>
      <StyledMenuItem>
        <MenuIcon as={FaLock} fill="var(--primary-color)" />
        <Typography color="primary" component="p" fontSize={"1vw"}>
          Заблокувати
        </Typography>
      </StyledMenuItem>
      <StyledMenuItem>
        <MenuIcon as={FaTrash} fill="var(--primary-color)" />
        <Typography color="primary" component="p" fontSize={"1vw"}>
          Видалити
        </Typography>
      </StyledMenuItem>
    </StyledMenu>
  );
};

export default FurnitureContextMenu;
