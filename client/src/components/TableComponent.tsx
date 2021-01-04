import React, { useState, useCallback, Fragment } from "react";
import data from "../data/data";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

const TableComponent = () => {
  return (
    <Box width="100%">
      <TableContainer component={Paper}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell key="id">ID</TableCell>
              <TableCell key="phrase">Phrase</TableCell>
              <TableCell key="subtext">Subtext</TableCell>
              <TableCell key="category">Category</TableCell>
              <TableCell key="heat_index">Heat Index</TableCell>
              <TableCell key="explicit">Explicit?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.phrase}</TableCell>
                <TableCell align="left">{row.subtext}</TableCell>
                <TableCell align="left">{row.category}</TableCell>
                <TableCell align="left">{row.heat_index}</TableCell>
                <TableCell align="left">
                  {row.explicit ? (
                    <p style={{ color: "red" }}>Explicit</p>
                  ) : (
                    <p>Clean</p>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableComponent;
