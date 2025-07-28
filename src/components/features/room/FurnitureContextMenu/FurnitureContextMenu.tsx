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
import { RefObject, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import furnituresData from '../../../../lib/constants/furniture.json';
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
  setInitialFurnitures,
} from "@/lib/redux/furniture/furnitureSlice";
import {
  selectRoomById,
  editFurniture,
  editRSZ,
} from "@/lib/redux/rooms/roomsSlice";
import { ActiveFurniture, FurnitureInfo } from "@/types/Furniture-type";
import UnsavedChangesDialog from "@/components/features/room/UnsavedChangesDialog/UnsavedChangesDialog";
import FurnitureCard from "../FurnitureCard/FurnitureCard";
import Konva from "konva";

const StyledMenu = styled(MenuList)`
  width: 16vw;
  background-color: #1e2f3e;
  border-radius: 8px;
  padding: 0 1vw;
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

const Furnitures: FurnitureInfo[] = furnituresData as FurnitureInfo[];

const FurnitureContextMenu = ({ id, stageRef }: { id: string, stageRef: RefObject<Konva.Stage | null> }) => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const selectedId = useSelector(selectSelectedId);
  const furniture = useSelector(selectSelectedFurniture) as ActiveFurniture;
  const furnitures = useSelector(selectAllFurniture);
  const room = useSelector(selectRoomById(id));
  const gridWidth = useSelector(selectW);
  const gridHeight = useSelector(selectH);
  return (
    <>
      <UnsavedChangesDialog
        handleReset={() => dispatch(setInitialFurnitures(room?.furniture))}
        handleSave={() => {
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
        isOpen={JSON.stringify(room?.furniture) !== JSON.stringify(furnitures)}
      />
      <StyledMenu style={{ height: "min-content" }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          onClick={() => {
            if (!stageRef.current) return;
            const uri = stageRef.current.toDataURL({
              mimeType: "image/jpeg",
              quality: 1,
            });
            const link = document.createElement("a");
            link.download = "room.jpg";
            link.href = uri;
            link.click();
          }}
        >
          Зберегти фото кімнати
        </Button>
        <Box sx={{ mb: 2 }}>
          <Typography
            color="white"
            variant="body2"
            sx={{ width: "90%", mx: "auto" }}
          >
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
          <Typography
            color="white"
            variant="body2"
            sx={{ width: "90%", mx: "auto" }}
          >
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
            onChange={(evt: React.SyntheticEvent, newValue: number) =>
              setValue(newValue)
            }
            aria-label="furniture context tabs"
          >
            <Tab style={{ width: "50%" }} label="Додати" {...a11yProps(0)} />
            <Tab
              style={{ width: "50%" }}
              label="Редагувати"
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <Stack spacing={1}>
            {Furnitures.map((f: FurnitureInfo) => (
              <FurnitureCard
                key={f.id}
                data={f}
                handleSelect={() => dispatch(addNewFurniture(f))}
              />
            ))}
            {/* <FurnitureCard data={} /> */}
            {/* <Button
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
            </Button> */}
          </Stack>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <Typography color="primary" variant="subtitle1" sx={{ mb: 1 }}>
            {selectedId ? `Вибрано: ${furniture?.title}` : "Нічого не вибрано"}
          </Typography>
          {selectedId && (
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
                onClick={() =>
                  dispatch(setAngle({ id: selectedId, side: "left" }))
                }
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
                  dispatch(delFurniture(selectedId)),
                  dispatch(setSelectedID(""))
                )}
              >
                Видалити
              </Button>
            </Stack>
          )}
        </CustomTabPanel>
      </StyledMenu>
    </>
  );
};
export default FurnitureContextMenu;
