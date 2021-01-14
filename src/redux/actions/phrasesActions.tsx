import { axiosWithAuth } from "../../axios/axios.utills";
import axios from "axios";
import {
  ADD_PHRASE,
  ADD_PHRASES_SUCCESS,
  DELETE_PHRASE,
  DELETE_PHRASES_SUCCESS,
  DELETE_PHRASES_FAILURE,
  GET_PHRASE,
  GET_PHRASES_SEARCH_SUCCESS,
  GET_PHRASES_SUCCESS,
  GET_PHRASE_SEARCH,
} from "../actions/actionNames";

export const getPhrases = () => {
  return (dispatch) => {
    dispatch({ type: GET_PHRASE });
    axios
      .get("https://weather-against-humanity.herokuapp.com/api/phrases")
      .then((res) => {
        dispatch({ type: GET_PHRASES_SUCCESS, payload: res.data });
      });
  };
};

export const addPhrases = (newPhrase) => {
  return (dispatch) => {
    dispatch({ type: ADD_PHRASE });

    axiosWithAuth()
      .post(
        "https://weather-against-humanity.herokuapp.com/api/phrases",
        newPhrase
      )
      .then((res) => {
        dispatch({ type: ADD_PHRASES_SUCCESS, payload: res.data });
      });
  };
};

export const deletePhrase = (id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_PHRASE });

    axiosWithAuth()
      .delete(
        `https://weather-against-humanity.herokuapp.com/api/phrases/${id}`
      )
      .catch((error) => {
        dispatch({ type: DELETE_PHRASES_FAILURE, payload: error.message });
      })
      .then(() => {
        dispatch({ type: DELETE_PHRASES_SUCCESS, payload: id });
      });
  };
};

export const searchPhrases = (text: string) => {
  return (dispatch) => {
    dispatch({ type: GET_PHRASE_SEARCH });
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
        dispatch({ type: GET_PHRASES_SEARCH_SUCCESS, payload: res.data });
      });
  };
};
