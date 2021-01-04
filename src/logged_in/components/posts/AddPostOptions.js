import React, { Fragment, useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
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
  FormControlLabel,
  Checkbox
} from "@material-ui/core";

const styles = (theme) => ({
  floatButtonWrapper: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1000,
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

const inputOptionsCategory = ["Any", "Rain", "Sun", "Fog", "Storm", "Cloudy"];
const inputOptionsHeat_Index = ["Any", "Freezing", "Cold", "Neutral", "Warm", "Hot"]

function AddPostOptions(props) {
  const {
    classes
  } = props;
  const [category, setCategory] = useState("Any");
  const [heat_index, setHeat_Index] = useState("Any");
  const [explicit, setExplicit] = useState(false);
  const phrase = useRef();
  const subtext = useRef();
  const handleChange = useCallback(
    (event) => {
      const { name, value, checked } = event.target;
      switch (name) {
        case "category":
          setCategory(value);
          break;
        case "heat_index":
          setHeat_Index(value);
          break;
        case "explicit":
          setExplicit(checked);
          break;
        default:
          throw new Error("No branch selected in switch-statement.");
      }
      console.log()
    },
    [setCategory, setHeat_Index, setExplicit]
  );

  const inputs =
    [
      {
        state: category,
        label: "Category",
        stateName: "category",
        options: inputOptionsCategory
      },
      {
        state: heat_index,
        label: "Heat Index",
        stateName: "heat_index",
        options: inputOptionsHeat_Index
      }
    ];

  return (
    <Fragment>
      <Typography paragraph variant="h6">
        Phrase Text
         <List>
          <ListItem
            disableGutters
            divider={false}
            key={0}
          >
            <ListItemText>
              <Typography variant="body2">Title</Typography>
              <TextField inputRef={phrase} margin="normal" label="Enter Text" variant="outlined" fullWidth />
            </ListItemText>





          </ListItem>
          <ListItem
            disableGutters
            divider={false}
            key={1}
          >
            <ListItemText>
              <Typography variant="body2">Subtext</Typography>
              <TextField inputRef={subtext} margin="normal" label="Enter Sub-Text" variant="outlined" fullWidth />
            </ListItemText>

          </ListItem>



        </List>
      </Typography>
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
                control={<Checkbox checked={explicit} id="explicit" onChange={handleChange} name="explicit" />}
                label=""
              />
            </ListItemSecondaryAction>
          </FormControl>
        </ListItem>
        {inputs.map((element, index) => (
          <ListItem
            className="listItemLeftPadding"
            disableGutters
            divider={index !== inputs.length - 1}
            key={index}
          >
            <ListItemText>
              <Typography variant="body2">{element.label}</Typography>
            </ListItemText>
            <FormControl variant="outlined">
              <ListItemSecondaryAction>
                <Select
                  value={element.state}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      name={element.stateName}
                      labelWidth={0}
                      className={classes.numberInput}
                      classes={{ input: classes.numberInputInput }}
                    />
                  }
                  MenuProps={{ disableScrollLock: true }}
                >
                  {element.options.map((innerElement) => (
                    <MenuItem value={innerElement} key={innerElement}>
                      {innerElement}
                    </MenuItem>
                  ))}
                </Select>

              </ListItemSecondaryAction>
            </FormControl>
          </ListItem>
        ))}



      </List>
    </Fragment>
  );
}

AddPostOptions.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles, { withTheme: true })(AddPostOptions);
