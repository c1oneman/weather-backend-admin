import { phraseConstants } from "../actions/actionNames";
const INITIALSTATE = {
  phrases: [],
};
interface Phrase {
  id: number;
}
export const phraseReducer = (state = INITIALSTATE, actions) => {
  switch (actions.type) {
    case phraseConstants.GET_PHRASE:
      return state;
    case phraseConstants.GET_PHRASES_SUCCESS:
      return {
        ...state,
        phrases: actions.payload,
      };
    case phraseConstants.ADD_PHRASE:
      return state;
    case phraseConstants.ADD_PHRASES_SUCCESS:
      return {
        ...state,
        phrases: [...state.phrases, actions.payload],
      };
    case phraseConstants.ADD_PHRASE_FAILURE:
      return {
        ...state,
        error: actions.payload,
      };
    case phraseConstants.DELETE_PHRASE:
      return state;
    case phraseConstants.DELETE_PHRASES_SUCCESS:
      return {
        ...state,
        phrases: [
          ...state.phrases.filter((phrase: Phrase) => {
            return phrase.id !== actions.payload;
          }),
        ],
      };
    case phraseConstants.DELETE_PHRASES_FAILURE:
      return {
        ...state,
        error: actions.payload,
      };
    default:
      return state;
  }
};
