import { HashRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box } from "@primer/react";
import styled, { ThemeProvider } from "styled-components";
import Toggle from "react-toggle";
import useLocalState from "use-local-storage-state";
import Footer from "./components/Common/Footer/Footer";
import Navbar from "./components/Common/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import { routes } from "./routes/AppRoutes";
import { LightTheme, DarkTheme, GlobalStyles } from "./themes";
import "./App.scss";
import "../src/scss/toggleBtn.scss";

const queryClient = new QueryClient();

const StyledApp = styled.div``;

function App() {
  const [theme, setTheme] = useLocalState("theme", "light");

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Toggle className="mt-5" id="cheese-status" onChange={themeToggler} />
        </Box>
        <ThemeProvider theme={theme === "light" ? LightTheme : DarkTheme}>
          <GlobalStyles />
          <StyledApp>
            <HashRouter>
              <Routes>
                {routes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<route.component />}
                  />
                ))}

                <Route path="/" element={<HomePage />} />
              </Routes>
            </HashRouter>
            <Footer />
          </StyledApp>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
