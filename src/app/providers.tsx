"use client";
import { ReactNode } from "react";
import { persistor, store } from "@/lib/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Bounce, ToastContainer } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Providers = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#fafbfe",
      },
      secondary: {
        main: "#12a4d5",
        contrastText: "#fafbfe",
      },
      background: {
        default: "#172430",
      },
    },
    typography: {
      fontFamily: "var(--font-roboto-mono)",
      h1: { fontFamily: "var(--font-jetbrains-mono)" },
      h2: { fontFamily: "var(--font-jetbrains-mono)" },
      h3: { fontFamily: "var(--font-jetbrains-mono)" },
      h4: { fontFamily: "var(--font-jetbrains-mono)" },
      h5: { fontFamily: "var(--font-jetbrains-mono)" },
      h6: { fontFamily: "var(--font-jetbrains-mono)" },
      fontSize: 14,
    },
    spacing: 8,
  });
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default Providers;
