import axios from "axios";
import { userConstants } from "../actions/actionNames";
import history from "../../history";

export const login = (credentials) => {
  return (dispatch) => {
    dispatch({ type: userConstants.LOGIN_REQUEST });
    axios
      .post(
        "https://weather-against-humanity.herokuapp.com/api/auth/login",
        credentials
      )
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        dispatch({
          type: userConstants.LOGIN_SUCCESS,
          payload: res.data.token,
        });
      })
      .catch(function (error) {
        dispatch({
          type: userConstants.LOGIN_FAILURE,
          payload: error.message,
        });
      });

    console.log(credentials);
  };
};
export const logout = () => {
  return (dispatch) => {
    dispatch({ type: userConstants.LOGOUT });

    localStorage.removeItem("token");
    history.push("/login");
    // Logout, delete token
  };
};
