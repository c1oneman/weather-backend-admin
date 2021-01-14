import {
  ADD_PHRASE,
  ADD_PHRASES_SUCCESS,
  DELETE_PHRASE,
  DELETE_PHRASES_SUCCESS,
  DELETE_PHRASES_FAILURE,
  GET_PHRASE,
  GET_PHRASES_SUCCESS,
} from "../actions/actionNames";
const INITIALSTATE = {
  phrases: [],
};
interface Phrase {
  id: number;
}
export const phraseReducer = (state = INITIALSTATE, actions) => {
  switch (actions.type) {
    case GET_PHRASE:
      return state;
    case GET_PHRASES_SUCCESS:
      return {
        ...state,
        phrases: actions.payload,
      };
    case ADD_PHRASE:
      return state;
    case ADD_PHRASES_SUCCESS:
      return {
        ...state,
        phrases: [...state.phrases, actions.payload],
      };
    case DELETE_PHRASE:
      return state;
    case DELETE_PHRASES_SUCCESS:
      return {
        ...state,
        phrases: [
          ...state.phrases.filter((phrase: Phrase) => {
            return phrase.id !== actions.payload;
          }),
        ],
      };
    case DELETE_PHRASES_FAILURE:
      return {
        ...state,
        error: actions.payload,
      };
    default:
      return state;
  }
};
