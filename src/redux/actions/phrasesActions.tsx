import { axiosWithAuth } from "../../axios/axios.utills";
import axios from "axios";
import { phraseConstants } from "../actions/actionNames";

export const getPhrases = () => {
  return (dispatch) => {
    dispatch({ type: phraseConstants.GET_PHRASE });
    axios
      .get("https://weather-against-humanity.herokuapp.com/api/phrases")
      .then((res) => {
        dispatch({
          type: phraseConstants.GET_PHRASES_SUCCESS,
          payload: res.data,
        });
      });
  };
};

export const addPhrases = (newPhrase) => {
  return (dispatch) => {
    dispatch({ type: phraseConstants.ADD_PHRASE });

    axiosWithAuth()
      .post(
        "https://weather-against-humanity.herokuapp.com/api/phrases",
        newPhrase
      )
      .catch((error) => {
        dispatch({
          type: phraseConstants.ADD_PHRASE_FAILURE,
          payload: error.message,
        });
      })
      .then((res) => {
        if (res) {
          dispatch({
            type: phraseConstants.ADD_PHRASES_SUCCESS,
            payload: res.data,
          });
        }
      });
  };
};

export const deletePhrase = (id) => {
  return (dispatch) => {
    dispatch({ type: phraseConstants.DELETE_PHRASE });

    axiosWithAuth()
      .delete(
        `https://weather-against-humanity.herokuapp.com/api/phrases/${id}`
      )
      .catch((error) => {
        dispatch({
          type: phraseConstants.DELETE_PHRASES_FAILURE,
          payload: error.message,
        });
      })
      .then(() => {
        dispatch({ type: phraseConstants.DELETE_PHRASES_SUCCESS, payload: id });
      });
  };
};

export const searchPhrases = (text: string) => {
  return (dispatch) => {
    dispatch({ type: phraseConstants.GET_PHRASE_SEARCH });
    const query = { query: text };
    axiosWithAuth()
      .get(
        `https://weather-against-humanity.herokuapp.com/api/phrases/search`,
        {
          params: {
            query: query,
          },
        }
      )
      .then((res) => {
        dispatch({
          type: phraseConstants.GET_PHRASES_SEARCH_SUCCESS,
          payload: res.data,
        });
      });
  };
};
