import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Typography, Box } from "@material-ui/core";
import UserDataArea from "./UserDataArea";

function Dashboard(props) {
  const {
    selectDashboard,
    pushMessageToSnackbar,
    targets,
    setTargets,
  } = props;

  useEffect(selectDashboard, [selectDashboard]);

  return (
    <Fragment>
      <Box mt={4}>
        <Typography variant="subtitle1" gutterBottom>
          Phrase Management
        </Typography>
      </Box>

      <UserDataArea
        pushMessageToSnackbar={pushMessageToSnackbar}
        targets={targets}
        setTargets={setTargets}
      />
    </Fragment>
  );
}

Dashboard.propTypes = {
  CardChart: PropTypes.elementType,
  pushMessageToSnackbar: PropTypes.func,
  targets: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTargets: PropTypes.func.isRequired,
  selectDashboard: PropTypes.func.isRequired,
};

export default Dashboard;
