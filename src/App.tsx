import React, { useState } from "react";
import "./App.scss";
import "../src/scss/toggleBtn.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import Footer from "./components/Common/Footer/Footer";
import Navbar from "./components/Common/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import { createHashHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { routes } from "./routes/AppRoutes";
import styled, { ThemeProvider } from "styled-components";
import { LightTheme, DarkTheme, GlobalStyles } from "./themes";
import Toggle from "react-toggle";
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
        <Toggle
          className=" mt-2 ml-2"
          id="cheese-status"
          onChange={themeToggler}
        />
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
