import React, { useState, useCallback, Fragment } from "react";
import { Redirect } from 'react-router-dom';
import { login } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import {
    Typography,
    List,
    ListItem,
    ListItemText,
    TextField,
    withStyles,
    Paper,
    Box,
    Button,
} from "@material-ui/core";
import ButtonCircularProgress from "../shared/components/ButtonCircularProgress";

const initLogin = {
    username: "",
    password: ""
};
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
            width: "450px",
            marginLeft: "auto",
            marginRight: "auto",
        },
        [theme.breakpoints.up("lg")]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            width: "450px",
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    rightSideButtons: {
        marginTop: "12px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    padding: {
        padding: "12px",
    },
    flexrow: {
        display: "flex",
        flexDirection: "column"
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
    dNone: {
        display: "none",
    },
});
function Login(props) {
    const { classes } = props;
    const { loggingIn, token } = useSelector((state) => state.userState);
    const dispatch = useDispatch();
    const [loginCreds, setLogin] = useState(initLogin);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginCreds));
    };
    const handleChange = useCallback(
        (event) => {
            const { name, value, type, checked } = event.target;
            const valueToUse = type === "checkbox" ? checked : value;
            setLogin({
                ...loginCreds,
                [name]: valueToUse,
            });
        },
        [loginCreds]
    );
    return (
        <div className={classes.wrapper}>
            <Paper className={classes.padding}>
                <Box>
                    <List>

                        <Typography paragraph variant="h4">
                            Admin - Login
                       </Typography>
                        <Typography paragraph variant="h6">
                            Weather Against Humans
                       </Typography>

                        <ListItem disableGutters divider={false} key={0}>
                            <ListItemText>
                                <TextField
                                    id="username"
                                    name="username"
                                    value={loginCreds.username}
                                    margin="normal"
                                    onChange={handleChange}
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                />
                            </ListItemText>
                        </ListItem>
                        <ListItem disableGutters divider={false} key={1}>
                            <ListItemText>
                                <TextField
                                    id="password"
                                    name="password"
                                    value={loginCreds.password}
                                    margin="normal"
                                    onChange={handleChange}
                                    label="Password"
                                    variant="outlined"
                                    type='password'
                                    fullWidth
                                />
                            </ListItemText>
                        </ListItem>
                    </List>
                    <Fragment>
                        <Box className={classes.rightSideButtons}>


                            <Button
                                onClick={handleSubmit}
                                variant="contained"
                                color="secondary"
                                disabled={loggingIn}
                            >
                                Login {loggingIn && <ButtonCircularProgress />}
                            </Button>
                        </Box>
                    </Fragment>
                </Box>
            </Paper>

            {(localStorage.getItem('token') || token) && <Redirect to="/dashboard" />}
        </div>

    );
}

// @ts-ignore
export default withStyles(styles, { withTheme: true })(Login);
