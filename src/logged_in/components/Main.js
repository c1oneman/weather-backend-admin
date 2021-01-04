import React, { memo, useCallback, useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core";
import Routing from "./Routing";
import NavBar from "./navigation/NavBar";
import ConsecutiveSnackbarMessages from "../../shared/components/ConsecutiveSnackbarMessages";
import smoothScrollTop from "../../shared/functions/smoothScrollTop";
import data from "../dummy_data/phrases";

const styles = (theme) => ({
  main: {
    marginLeft: theme.spacing(9),
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
});

function Main(props) {
  const { classes } = props;
  const [selectedTab, setSelectedTab] = useState(null);
  const [targets, setTargets] = useState([]);
  const [pushMessageToSnackbar, setPushMessageToSnackbar] = useState(null);

  const fetchRandomTargets = useCallback(() => {
    const targets = [];
    data.forEach(element => {
      const phrase = {
        id: element.id,
        phrase: element.phrase,
        subtext: element.subtext,
        category: element.category,
        heat_index: element.heat_index,
        explicit: element.explicit
      };
      targets.push(phrase);
    })

    setTargets(targets);
  }, [setTargets]);

  const selectDashboard = useCallback(() => {
    smoothScrollTop();
    document.title = "Admin - Dashboard";
    setSelectedTab("Dashboard");
  }, [
    setSelectedTab
  ]);

  const selectPosts = useCallback(() => {
    smoothScrollTop();
    document.title = "Admin - Phrases";
    setSelectedTab("Posts");
  }, [
    setSelectedTab
  ]);



  const getPushMessageFromChild = useCallback(
    (pushMessage) => {
      setPushMessageToSnackbar(() => pushMessage);
    },
    [setPushMessageToSnackbar]
  );

  useEffect(() => {
    fetchRandomTargets();
  }, [
    fetchRandomTargets,
  ]);

  return (
    <Fragment>
      <NavBar
        selectedTab={selectedTab}
      />
      <ConsecutiveSnackbarMessages
        getPushMessageFromChild={getPushMessageFromChild}
      />
      <main className={classNames(classes.main)}>
        <Routing

          pushMessageToSnackbar={pushMessageToSnackbar}

          targets={targets}
          selectDashboard={selectDashboard}
          selectPosts={selectPosts}

          setTargets={setTargets}
        />
      </main>
    </Fragment>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));
