import { userConstants } from "../actions/actionNames";

let token = localStorage.getItem("token")!;

const initialState = token ? { loggedIn: true, token } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggingIn: false,
        loggedIn: true,
        token: action.payload,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggingIn: false,
        loggedIn: false,
        message: action.payload,
      };
    case userConstants.LOGOUT:
      return {
        loggedIn: false,
      };
    default:
      return state;
  }
}
