import React, { useReducer, useEffect } from "react";
import authReducer from "./authReducer.js";
import authContext from "./authContext.js";
import { GET_AUTHSTATE, SET_AUTHSTATE } from "../types";
const AuthState = (props) => {
  const initialState = { username: null };
  const [state, dispatch] = useReducer(authReducer, initialState);

  //check if user has userbname in localstorage
  useEffect(() => {
    getAuthState();
    console.log("se llama getAuhState");
  }, []);
  //get authstate from localstorage
  const getAuthState = () => {
    var username = localStorage.getItem("auth");

    dispatch({
      type: GET_AUTHSTATE,
      payload: username,
    });
  };

  //set authstate to local storage
  const setAuthState = (username) => {
    dispatch({
      type: SET_AUTHSTATE,
      payload: username,
    });
  };
  return (
    <authContext.Provider
      value={{ username: state.username, getAuthState, setAuthState }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
