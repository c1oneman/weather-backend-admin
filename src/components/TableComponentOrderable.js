import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import AddPost from "../components/CreateFormStyled";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  IconButton,
  Toolbar,
  Typography,
  TextField,
  withStyles,
  Button
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EnhancedTableHead from "../shared/components/EnhancedTableHead";
import stableSort from "../shared/functions/stableSort";
import getSorting from "../shared/functions/getSorting";
import HighlightedInformation from "../shared/components/HighlightedInformation";
import { getPhrases, deletePhrase } from "../redux/actions/phrasesActions";
const styles = (theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    width: "auto",
    [theme.breakpoints.up("xs")]: {
      width: "95%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "82.5%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "60%",
      marginLeft: "auto",
      marginRight: "auto",
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
  smallIndent: {
    marginLeft: '24px',
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
// pre defined organization
const rows = [
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
const rowsPerPage = 10;

const TableComponentOrderable = (props) => {
  const { classes } = props;
  const { phrases, error } = useSelector((state) => state.phrasesState);
  const [isAddPostPaperOpen, setIsAddPostPaperOpen] = useState(false);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(null);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
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
  const handleChangePage = useCallback(
    (_, page) => {
      setPage(page);
    },
    [setPage]
  );
  useEffect(() => {
    dispatch(getPhrases());
  }, [phrases.length, dispatch]);
  const openAddPostModal = useCallback(() => {
    setIsAddPostPaperOpen(true);
  }, [setIsAddPostPaperOpen]);

  const closeAddPostModal = useCallback(() => {
    setIsAddPostPaperOpen(false);
  }, [setIsAddPostPaperOpen]);
  if (isAddPostPaperOpen) {
    return <>

      <AddPost
        onClose={closeAddPostModal}
      />


    </>
  }
  return (
    <div className={classes.wrapper}>
      <Box mt={4}>
        <Typography variant="subtitle1" gutterBottom>
          Phrase Management
        </Typography>
      </Box>
      <Paper>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6">Add a phrase?</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={openAddPostModal}
            disableElevation
          >
            Add Phrase
        </Button>
        </Toolbar>
      </Paper>
      <Box mt={2} mb={2}>
        <Paper>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6">Phrases</Typography>
            <TextField
              id="phrase"
              margin="normal"
              label="Search"
              variant="outlined"
            />
          </Toolbar>
          <Box width="100%">
            <div className={classes.tableWrapper}>
              {phrases.length > 0 ? (
                <Table aria-labelledby="tableTitle">
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    // @ts-ignore
                    rowCount={phrases.length}
                    rows={rows}
                  />
                  <TableBody>
                    {stableSort(phrases, getSorting(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => (
                        <TableRow hover tabIndex={-1} key={index}>

                          <TableCell className={classes.smallIndent} component="th" scope="row">
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
                                <p style={{ color: "red" }}>Explicit</p>
                              ) : (
                                  <p>Clean</p>
                                )}
                            </Box>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <IconButton
                              onClick={() => dispatch(deletePhrase(row.id))}
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
                      No phrases found/loading phrases.
                    </HighlightedInformation>
                  </Box>
                )}
            </div>
            <div className={classes.alignRight}>
              <TablePagination
                component="div"
                count={phrases.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  "aria-label": "Previous Page",
                }}
                nextIconButtonProps={{
                  "aria-label": "Next Page",
                }}
                onChangePage={handleChangePage}

                labelRowsPerPage=""
              />
            </div>
          </Box>



        </Paper>
      </Box >
      {error ? (
        <HighlightedInformation >
          Error: {error}
        </HighlightedInformation>
      ) : <></>}
    </div>
  );
};
TableComponentOrderable.propTypes = {
  classes: PropTypes.object.isRequired,
};
// @ts-ignore
export default withStyles(styles, { withTheme: true })(TableComponentOrderable);
