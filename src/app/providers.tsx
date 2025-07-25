"use client";
import { ReactNode } from "react";
import { persistor, store } from "@/lib/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const Providers = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor} loading={null}> */}
        {children}
      {/* </PersistGate> */}
    </Provider>
  );
};

export default Providers;
