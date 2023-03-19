import { createHashHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Flex } from "@primer/components";
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

/**
 * Create history object to pass into Router,
 * to allow navigating outside of react
 */
const history = createHashHistory();
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
        <Flex
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Toggle className="mt-5" id="cheese-status" onChange={themeToggler} />
        </Flex>
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
