import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
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
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EnhancedTableHead from "../shared/components/EnhancedTableHead";
import stableSort from "../shared/functions/stableSort";
import getSorting from "../shared/functions/getSorting";
import HighlightedInformation from "../shared/components/HighlightedInformation";
import { getPhrases, deletePhrase } from "../redux/actions/phrasesActions";

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

const TableComponentOrderable = () => {
  const { phrases } = useSelector((state) => state.phrasesState);
  const dispatch = useDispatch();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(null);
  const [page, setPage] = useState(0);

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
    console.log("called");
  }, [phrases.length]);
  return (
    <Box width="100%">
      <Paper>
        <Toolbar>
          <Typography variant="h6">Phrases</Typography>
          <TextField
            id="phrase"
            margin="normal"
            label="Search"
            variant="outlined"
          />
        </Toolbar>
        <Box width="100%">
          <div>
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
                            <DeleteIcon />
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
          <div>
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
    </Box>
  );
};

export default TableComponentOrderable;
