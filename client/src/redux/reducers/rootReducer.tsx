import { combineReducers } from "redux";
import { phraseReducer } from "./phraseReducer";
import { authentication } from "./authenticationReducer";
export default combineReducers({
  //userType: userTypeReducer,
  userState: authentication,
  phrasesState: phraseReducer,
});
