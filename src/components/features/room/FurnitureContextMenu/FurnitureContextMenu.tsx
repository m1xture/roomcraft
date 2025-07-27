"use client";

import {
  FaArrowRotateRight,
  FaArrowRotateLeft,
  FaLock,
  FaTrash,
  FaPlus,
  FaChair,
  FaCouch,
  FaBed,
} from "react-icons/fa6";
import styled from "styled-components";
import {
  Stack,
  Box,
  Tab,
  Tabs,
  MenuList,
  Button,
  Typography,
  Slider,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewFurniture,
  delFurniture,
  selectAllFurniture,
  selectSelectedFurniture,
  selectSelectedId,
  setAngle,
  setSelectedID,
  toggleBanFur,
  editW,
  editH,
  selectW,
  selectH,
} from "@/lib/redux/furniture/furnitureSlice";
import {
  selectRoomById,
  editFurniture,
  editRSZ,
} from "@/lib/redux/rooms/roomsSlice";

const StyledMenu = styled(MenuList)`
  width: 206px;
  background-color: #1e2f3e;
  border-radius: 8px;
  padding: 1vw;
`;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </Box>
  );
};

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
  sx: {
    color: "primary.main",
    "&.Mui-selected": {
      color: "secondary.main",
    },
  },
});

const FurnitureContextMenu = ({ id }: { id: string }) => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const selectedId = useSelector(selectSelectedId);
  const furniture = useSelector(selectSelectedFurniture);
  const furnitures = useSelector(selectAllFurniture);
  const room = useSelector(selectRoomById(id));
  const gridWidth = useSelector(selectW);
  const gridHeight = useSelector(selectH);
  return (
    <StyledMenu style={{ height: "min-content" }}>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => {
          dispatch(
            editFurniture({
              id: room?.id || "",
              furniture: furnitures,
            })
          );
          dispatch(
            editRSZ({
              id: room?.id || "",
              w: gridWidth,
              h: gridHeight,
            })
          );
        }}
      >
        Зберегти кімнату
      </Button>

      <Box sx={{ mb: 2 }}>
        <Typography color="white" variant="body2">
          Ширина сітки: {gridWidth}
        </Typography>
        <Box sx={{ width: "90%", mx: "auto" }}>
          <Slider
            value={gridWidth}
            onChange={(_, newVal) => dispatch(editW(newVal as number))}
            min={6}
            max={30}
            step={1}
          />
        </Box>
        <Typography color="white" variant="body2">
          Висота сітки: {gridHeight}
        </Typography>
        <Box sx={{ width: "90%", mx: "auto" }}>
          <Slider
            value={gridHeight}
            onChange={(_, newVal) => dispatch(editH(newVal as number))}
            min={6}
            max={30}
            step={1}
          />
        </Box>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={(event: React.SyntheticEvent, newValue: number) =>
            setValue(newValue)
          }
          aria-label="furniture context tabs"
        >
          <Tab label="Додати" {...a11yProps(0)} />
          <Tab label="Редагувати" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <Stack spacing={1}>
          <Button
            variant="outlined"
            startIcon={<FaChair />}
            onClick={() =>
              dispatch(
                addNewFurniture({
                  id: "68838aaea4b26f770c036b01",
                  tag: "office-chair",
                  title: "Жовтий, як сонце, офісний стул",
                  description:
                    "Обіцяє вам прослужити ще декілька світових років (напевно бреше)",
                  category: "Стільці",
                  sizes: [
                    [50, 100],
                    [50, 100],
                  ],
                })
              )
            }
          >
            Додати стілець
          </Button>
          <Button
            variant="outlined"
            startIcon={<FaCouch />}
            onClick={() =>
              dispatch(
                addNewFurniture({
                  id: "ZTWQTqxCXQu1FsrONUee0",
                  tag: "sofa",
                  title: "Затишний синій диван",
                  description:
                    "Обіцяє вам прослужити ще декілька світових років (напевно бреше)",
                  category: "Дивани",
                  sizes: [
                    [100, 50],
                    [50, 100],
                  ],
                })
              )
            }
          >
            Додати диван
          </Button>
          {/* <Button variant="outlined" startIcon={<FaBed />}>
            Додати кровать
          </Button> */}
        </Stack>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <Typography color="primary" variant="subtitle1" sx={{ mb: 1 }}>
          {selectedId ? `Вибрано: ${furniture?.title}` : "Нічого не вибрано"}
        </Typography>
        <Stack spacing={1}>
          <Button
            variant="outlined"
            startIcon={<FaArrowRotateRight />}
            onClick={() =>
              dispatch(setAngle({ id: selectedId, side: "right" }))
            }
          >
            Повернути на 90° вправо
          </Button>
          <Button
            variant="outlined"
            startIcon={<FaArrowRotateLeft />}
            onClick={() => dispatch(setAngle({ id: selectedId, side: "left" }))}
          >
            Повернути на 90° вліво
          </Button>
          <Button
            variant="outlined"
            startIcon={<FaLock />}
            onClick={() => dispatch(toggleBanFur(selectedId))}
          >
            {furniture?.isLocked ? "Розблокувати" : "Заблокувати"}
          </Button>
          <Button
            variant="outlined"
            startIcon={<FaTrash />}
            onClick={() => (
              dispatch(delFurniture(selectedId)), dispatch(setSelectedID(0))
            )}
          >
            Видалити
          </Button>
        </Stack>
      </CustomTabPanel>
    </StyledMenu>
  );
};
export default FurnitureContextMenu;
