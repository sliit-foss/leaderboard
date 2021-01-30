import React from "react";
import "./App.scss";
import Footer from "./components/Common/Footer/Footer";
import Navbar from "./components/Common/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import { createHashHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { routes } from "./routes/AppRoutes";

/**
 * Create history object to pass into Router,
 * to allow navigating outside of react
 */
const history = createHashHistory();

function App() {
  return (
    <div>
      <Navbar />
      <Router history={history}>
        <Switch>
          {routes.map((route: { path: string; component: any }) => (
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
      <HomePage />
    </div>
  );
}

export default App;
