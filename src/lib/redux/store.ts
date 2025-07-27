import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
  createTransform,
  persistReducer,
} from "redux-persist";
import { authReducer } from "./auth/authSlice";
import { furnitureReducer } from "./furniture/furnitureSlice";
import storage from "redux-persist-indexeddb-storage";
import { compressSync, decompressSync, strToU8, strFromU8 } from "fflate";
import { roomsReducer } from "./rooms/roomsSlice";

// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   storage,
// };

const compressionTransform = createTransform(
  (inboundState) =>
    Array.from(compressSync(strToU8(JSON.stringify(inboundState)))),
  (outboundState) =>
    JSON.parse(strFromU8(decompressSync(new Uint8Array(outboundState))))
);

const roomsPersistConfig = {
  key: "root",
  storage: storage("rooms"),
  transforms: [compressionTransform],
};

const persistedRoomsReducer = persistReducer(roomsPersistConfig, roomsReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    rooms: persistedRoomsReducer,
    furniture: furnitureReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
