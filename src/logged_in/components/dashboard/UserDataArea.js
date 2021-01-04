import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { fade } from '@material-ui/core/styles';
import AddPost from "../posts/AddPost";
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  IconButton,
  Box,
  Toolbar,
  Paper,
  Button,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EnhancedTableHead from "../../../shared/components/EnhancedTableHead";
import stableSort from "../../../shared/functions/stableSort";
import getSorting from "../../../shared/functions/getSorting";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import ConfirmationDialog from "../../../shared/components/ConfirmationDialog";

const styles = (theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableWrapper: {
    overflowX: "auto",
  },
  alignRight: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
  },
  blackIcon: {
    color: theme.palette.common.black,
  },
  avatar: {
    width: 28,
    height: 28,
  },
  firstData: {
    paddingLeft: theme.spacing(3),
  },
  iconButton: {
    padding: theme.spacing(1),
  },
  dBlock: {
    display: "block",
  },
  dNone: {
    display: "none",
  },
  toolbar: {
    justifyContent: "space-between",
  }
});

const rows = [
  {
    id: "icon",
    numeric: true,
    label: "",
  },
  {
    id: "id",
    numeric: false,
    label: "ID",
  },
  { id: "phrase", numeric: false, label: "Phrase" },
  { id: "subtext", numeric: false, label: "Subtext" },
  { id: "category", numeric: false, label: "Weather Type" },
  {
    id: "heat_index",
    numeric: false,
    label: "Heat Index",
  },
  {
    id: "explicit",
    numeric: false,
    label: "Explicit?",
  },
];

const rowsPerPage = 25;

function CustomTable(props) {
  const { pushMessageToSnackbar, classes, targets, setTargets } = props;
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(null);
  const [page, setPage] = useState(0);
  const [isAddPostPaperOpen, setIsAddPostPaperOpen] = useState(false);
  const [isDeleteTargetDialogOpen, setIsDeleteTargetDialogOpen] = useState(
    false
  );
  const [deleteTargetDialogRow, setDeleteTargetDialogRow] = useState(null);
  const [isDeleteTargetLoading, setIsDeleteTargetLoading] = useState(false);

  const openAddPostModal = useCallback(() => {
    setIsAddPostPaperOpen(true);
  }, [setIsAddPostPaperOpen]);

  const closeAddPostModal = useCallback(() => {
    setIsAddPostPaperOpen(false);
  }, [setIsAddPostPaperOpen]);
  const handleRequestSort = useCallback(
    (__, property) => {
      const _orderBy = property;
      let _order = "desc";
      if (orderBy === property && order === "desc") {
        _order = "asc";
      }
      setOrder(_order);
      setOrderBy(_orderBy);
    },
    [setOrder, setOrderBy, order, orderBy]
  );

  const deleteTarget = useCallback(() => {
    setIsDeleteTargetLoading(true);
    setTimeout(() => {
      setIsDeleteTargetDialogOpen(false);
      setIsDeleteTargetLoading(false);
      const _targets = [...targets];
      const index = _targets.findIndex(
        (element) => element.id === deleteTargetDialogRow.id
      );
      _targets.splice(index, 1);
      setTargets(_targets);
      pushMessageToSnackbar({
        text: "Phrase has been (locally) removed",
      });
    }, 1500);
  }, [
    setIsDeleteTargetDialogOpen,
    setIsDeleteTargetLoading,
    pushMessageToSnackbar,
    setTargets,
    deleteTargetDialogRow,
    targets,
  ]);
  const handlePost = content => {
    alert(`Logging in with content '${JSON.stringify(content)}'`);
  };
  const handleChangePage = useCallback(
    (_, page) => {
      setPage(page);
    },
    [setPage]
  );

  const handleDeleteTargetDialogClose = useCallback(() => {
    setIsDeleteTargetDialogOpen(false);
  }, [setIsDeleteTargetDialogOpen]);

  const handleDeleteTargetDialogOpen = useCallback(
    (row) => {
      setIsDeleteTargetDialogOpen(true);
      setDeleteTargetDialogRow(row);
    },
    [setIsDeleteTargetDialogOpen, setDeleteTargetDialogRow]
  );

  if (isAddPostPaperOpen) {
    return <AddPost
      onClose={closeAddPostModal}
      pushMessageToSnackbar={pushMessageToSnackbar}
    />
  }
  return (
    <>
      <Paper>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6">Add a phrase?</Typography>
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            onClick={openAddPostModal}
          >
            Add Phrase
        </Button>
        </Toolbar>
      </Paper>
      <Box mt={2}>
        <Paper>

          <Toolbar className={classes.toolbar}>
            <Typography variant="h6">Phrases</Typography>
            <TextField id="phrase" margin="normal" label="Search" variant="outlined" />
          </Toolbar>


          <ConfirmationDialog
            open={isDeleteTargetDialogOpen}
            title="Confirmation"
            content={
              deleteTargetDialogRow ? (
                <span>
                  {"Do you really want to remove the phrase "}
                  <b>{deleteTargetDialogRow.id}</b>
                  {" from the database?"}
                </span>
              ) : null
            }
            onClose={handleDeleteTargetDialogClose}
            onConfirm={deleteTarget}
            loading={isDeleteTargetLoading}
          />
          <Box width="100%">
            <div className={classes.tableWrapper}>
              {targets.length > 0 ? (
                <Table aria-labelledby="tableTitle">
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={targets.length}
                    rows={rows}
                  />
                  <TableBody>
                    {stableSort(targets, getSorting(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => (
                        <TableRow hover tabIndex={-1} key={index}>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.firstData}
                          >
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.id}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.phrase}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.subtext}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.category}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.heat_index}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Box display="flex" justifyContent="flex-start">
                              {row.explicit ? (
                                <p style={{ color: 'red' }}>Explicit</p>
                              ) : (
                                  <p>Clean</p>
                                )}

                            </Box>

                          </TableCell>
                          <TableCell component="th" scope="row">
                            <IconButton
                              className={classes.iconButton}
                              onClick={() => {
                                handleDeleteTargetDialogOpen(row);
                              }}
                              aria-label="Delete"
                            >
                              <DeleteIcon className={classes.blackIcon} />
                            </IconButton>
                          </TableCell>

                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              ) : (
                  <Box m={2}>
                    <HighlightedInformation>
                      No phrases found.
              </HighlightedInformation>
                  </Box>
                )}
            </div>
            <div className={classes.alignRight}>
              <TablePagination
                component="div"
                count={targets.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  "aria-label": "Previous Page",
                }}
                nextIconButtonProps={{
                  "aria-label": "Next Page",
                }}
                onChangePage={handleChangePage}
                classes={{
                  select: classes.dNone,
                  selectIcon: classes.dNone,
                  actions: targets.length > 0 ? classes.dBlock : classes.dNone,
                  caption: targets.length > 0 ? classes.dBlock : classes.dNone,
                }}
                labelRowsPerPage=""
              />
            </div>
          </Box>
        </Paper>
      </Box>



    </>

  );
}

CustomTable.propTypes = {
  openAddPostModal: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  targets: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTargets: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(CustomTable);
