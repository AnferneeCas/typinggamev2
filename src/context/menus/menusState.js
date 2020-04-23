import React, { useReducer } from "react";
import menusReducer from "./menusReducer";
import menusContext from "./menusContext";
import {
  SHOW_CREATE_LOBBY,
  SHOW_SEARCH_LOBBY,
  SHOW_JOIN_LOBBY,
  SHOW_MAIN_MENU,
} from "../types";
const MenusState = (props) => {
  const initialState = {
    mainMenu: true,
    createLobby: false,
    searchLobby: false,
    joinLobby: false,
  };
  const [state, dispatch] = useReducer(menusReducer, initialState);

  const showCreateLobby = (bool) => {
    dispatch({
      type: SHOW_CREATE_LOBBY,
      payload: bool,
    });
  };

  const showJoinLobby = (bool) => {
    dispatch({
      type: SHOW_JOIN_LOBBY,
      payload: bool,
    });
  };

  const showSearchLobby = (bool) => {
    dispatch({
      type: SHOW_SEARCH_LOBBY,
      payload: bool,
    });
  };

  const showMainMenu = (bool) => {
    dispatch({ type: SHOW_MAIN_MENU, payload: bool });
  };

  return (
    <menusContext.Provider
      value={{
        mainMenu: state.mainMenu,
        createLobby: state.createLobby,
        searchLobby: state.searchLobby,
        joinLobby: state.joinLobby,
        showCreateLobby,
        showJoinLobby,
        showMainMenu,
        showSearchLobby,
      }}
    >
      {props.children}
    </menusContext.Provider>
  );
};

export default MenusState;
