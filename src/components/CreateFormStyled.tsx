import React, { useState, useCallback, Fragment } from "react";
import { useDispatch } from "react-redux";
import { addPhrases } from "../redux/actions/phrasesActions";

import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  TextField,
  withStyles,
  Paper,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
} from "@material-ui/core";
import ButtonCircularProgress from "../shared/components/ButtonCircularProgress";

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
  floatButtonWrapper: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1000,
  },
  rightSideButtons: {
    marginTop: "12px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  inputRoot: {
    width: 190,
    "@media (max-width:  400px)": {
      width: 160,
    },
    "@media (max-width:  360px)": {
      width: 140,
    },
    "@media (max-width:  340px)": {
      width: 120,
    },
  },
  numberInput: {
    width: 110,
  },
  numberInputInput: {
    padding: "9px 34px 9px 14.5px",
  },
  dNone: {
    display: "none",
  },
});
const inputOptionsCategory = [
  "Any",
  "Rain",
  "Sun",
  "Fog",
  "Storm",
  "Cloudy",
  "Snow",
  "Winds",
];
const inputOptionsHeat_Index = [
  "Any",
  "Freezing",
  "Cold",
  "Neutral",
  "Warm",
  "Hot",
];
const initPhrase = {
  phrase: "",
  subtext: "",
  category_id: "Any",
  heat_index: "Any",
  isExplicit: false,
};

function CreateFormStyled(props) {
  const { classes, onClose } = props;
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const [phrase, setPhrases] = useState(initPhrase);
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const newPhrase = {
      phrase: phrase.phrase,
      subtext: phrase.subtext,
      category_id: inputOptionsCategory.indexOf(phrase.category_id) + 1,
      heat_index: inputOptionsHeat_Index.indexOf(phrase.heat_index) + 1,
      isExplicit: phrase.isExplicit,
    };
    dispatch(addPhrases(newPhrase));
    onClose();
  };
  const handleChange = useCallback(
    (event) => {
      const { name, value, type, checked } = event.target;
      const valueToUse = type === "checkbox" ? checked : value;
      setPhrases({
        ...phrase,
        [name]: valueToUse,
      });
    },
    [phrase]
  );
  return (
    <div className={classes.wrapper}>
      <Box mt={4} mb={4}>
        <Paper>
          <Box p={4}>
            <List>
              <Typography paragraph variant="h6">
                Create Phrase
              </Typography>
              <ListItem disableGutters divider={false} key={0}>
                <ListItemText>
                  <Typography variant="body2">Main Text</Typography>
                  <TextField
                    id="phrase"
                    name="phrase"
                    value={phrase.phrase}
                    margin="normal"
                    onChange={handleChange}
                    label="Enter Text"
                    variant="outlined"
                    fullWidth
                  />
                </ListItemText>
              </ListItem>
              <ListItem disableGutters divider={false} key={1}>
                <ListItemText>
                  <Typography variant="body2">Subtext</Typography>
                  <TextField
                    id="subtext"
                    margin="normal"
                    name="subtext"
                    onChange={handleChange}
                    value={phrase.subtext}
                    label="Enter Sub-Text"
                    variant="outlined"
                    fullWidth
                  />
                </ListItemText>
              </ListItem>
            </List>
            <Typography paragraph variant="h6">
              Options
            </Typography>
            <List disablePadding>
              <ListItem
                className="listItemLeftPadding"
                disableGutters
                divider={true}
                key={2}
              >
                <ListItemText>
                  <Typography variant="body2">Explicit</Typography>
                </ListItemText>
                <FormControl variant="outlined">
                  <ListItemSecondaryAction>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={phrase.isExplicit}
                          id="explicit"
                          onChange={handleChange}
                          name="isExplicit"
                        />
                      }
                      label=""
                    />
                  </ListItemSecondaryAction>
                </FormControl>
              </ListItem>

              <ListItem
                className="listItemLeftPadding"
                disableGutters
                divider={true}
                key="category"
              >
                <ListItemText>
                  <Typography variant="body2">Category</Typography>
                </ListItemText>
                <FormControl variant="outlined">
                  <ListItemSecondaryAction>
                    <Select
                      value={phrase.category_id}
                      onChange={handleChange}
                      input={
                        <OutlinedInput
                          name="category_id"
                          labelWidth={0}
                          className={classes.numberInput}
                          classes={{ input: classes.numberInputInput }}
                        />
                      }
                      MenuProps={{ disableScrollLock: true }}
                    >
                      {inputOptionsCategory.map((innerElement) => (
                        <MenuItem value={innerElement} key={innerElement}>
                          {innerElement}
                        </MenuItem>
                      ))}
                    </Select>
                  </ListItemSecondaryAction>
                </FormControl>
              </ListItem>

              <ListItem
                className="listItemLeftPadding"
                disableGutters
                divider={true}
                key="heat_index"
              >
                <ListItemText>
                  <Typography variant="body2">Heat Index</Typography>
                </ListItemText>
                <FormControl variant="outlined">
                  <ListItemSecondaryAction>
                    <Select
                      value={phrase.heat_index}
                      onChange={handleChange}
                      input={
                        <OutlinedInput
                          name="heat_index"
                          labelWidth={0}
                          className={classes.numberInput}
                          classes={{ input: classes.numberInputInput }}
                        />
                      }
                      MenuProps={{ disableScrollLock: true }}
                    >
                      {inputOptionsHeat_Index.map((innerElement) => (
                        <MenuItem value={innerElement} key={innerElement}>
                          {innerElement}
                        </MenuItem>
                      ))}
                    </Select>
                  </ListItemSecondaryAction>
                </FormControl>
              </ListItem>
            </List>

            <Fragment>
              <Box className={classes.rightSideButtons}>
                <Button onClick={onClose} disabled={loading}>
                  Back
                </Button>

                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="secondary"
                  disabled={loading}
                >
                  Post {loading && <ButtonCircularProgress />}
                </Button>
              </Box>
            </Fragment>
          </Box>
        </Paper>
      </Box>
    </div>
  );
}
// @ts-ignore
export default withStyles(styles, { withTheme: true })(CreateFormStyled);
