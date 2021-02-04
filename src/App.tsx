import React, { useState } from "react";
import "./App.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import Footer from "./components/Common/Footer/Footer";
import Navbar from "./components/Common/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import { createHashHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { routes } from "./routes/AppRoutes";
import styled, { ThemeProvider } from "styled-components";
import { LightTheme, DarkTheme, GlobalStyles } from "./themes";
import DarkModeToggle from "react-dark-mode-toggle";
/**
 * Create history object to pass into Router,
 * to allow navigating outside of react
 */
const history = createHashHistory();
const queryClient = new QueryClient();

const StyledApp = styled.div``;

function App() {
  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <DarkModeToggle onChange={themeToggler} checked={theme} size={80} />

        <ThemeProvider theme={theme === "light" ? LightTheme : DarkTheme}>
          <GlobalStyles />
          <StyledApp>
            <Router history={history}>
              <Switch>
                {routes.map((route) => (
                  <Route
                    key={route.path}
                    exact
                    path={route.path}
                    component={route.component}
                  />
                ))}

                <Route key={""} exact path={""} component={HomePage} />
              </Switch>
            </Router>
            <Footer />
          </StyledApp>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
