import React, { Fragment, Suspense } from "react";
//import Table from "./components/TableComponent";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import PrivateRoute from "./components/PrivateRoute";

import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import Pace from "./shared/components/Pace";
import OrderTable from "./components/TableComponentOrderable";
import Login from "./components/Login";

function App() {
  return (
    <>
      <Router>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles />
          <Pace color={theme.palette.primary.light} />
          <div>
            <Suspense fallback={<Fragment />}>
              <Switch>
                <Route path="/login" component={Login} />
                <PrivateRoute exact path="/dashboard" component={OrderTable} />
              </Switch>
            </Suspense>
          </div>
        </MuiThemeProvider>
      </Router>
    </>
  );
}

export default App;
