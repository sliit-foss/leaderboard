import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styled, { ThemeProvider } from "styled-components";
import useLocalState from "use-local-storage-state";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "./components/Common/Footer/Footer";
import Navbar from "./components/Common/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import { routes } from "./routes/AppRoutes";
import { pageTransition } from "./lib/animations";
import { TOAST_CONFIG } from "./lib/constants";
// @ts-expect-error - JS module without types
import { LightTheme, DarkTheme, GlobalStyles } from "./themes.js";
import "./App.scss";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const StyledApp = styled.div``;

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <route.component />
              </motion.div>
            }
          />
        ))}

        <Route
          path="/"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
            >
              <HomePage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [theme, setTheme] = useLocalState<string>("theme", {
    defaultValue: "light",
  });

  const themeToggler = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div data-theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme === "light" ? LightTheme : DarkTheme}>
          <GlobalStyles />
          <Toaster
            position={TOAST_CONFIG.position}
            toastOptions={{
              duration: TOAST_CONFIG.duration,
              style: TOAST_CONFIG.style,
            }}
          />
          <StyledApp>
            <Navbar theme={theme} onToggle={themeToggler} />
            <BrowserRouter>
              <AnimatedRoutes />
            </BrowserRouter>
            <Footer />
          </StyledApp>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;

