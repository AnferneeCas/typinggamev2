import React, { useReducer } from "react";
import authReducer from "./authReducer.js";
import authContext from "./authContext.js";
import { GET_AUTHSTATE } from "../types";
const AuthState = (props) => {
  console.log(authContext);
  const initialState = { username: "null" };
  const [state, dispatch] = useReducer(authReducer, initialState);

  //get authstate from localstorage
  const getAuthState = () => {};

  //set authstate to local storage
  const setAuthState = (username) => {
    dispatch({
      type: GET_AUTHSTATE,
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
