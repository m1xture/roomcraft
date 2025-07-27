"use client";
import { LuPaintbrush } from "react-icons/lu";
import { Button } from "@mui/material";
import styled from "styled-components";

const StyledBox = styled.div`
  display: flex;
justify-content: center;
`;

const CreateRoomBtn = ({ openCb }: { openCb: () => void }) => {
  return (
    <StyledBox>
      <Button
        variant="outlined"
        startIcon={<LuPaintbrush />}
        size="large"
        onClick={openCb}
        color="secondary"
      >
        Створити кімнату
      </Button>
    </StyledBox>
  );
};

export default CreateRoomBtn;
