import {
  SHOW_CREATE_LOBBY,
  SHOW_SEARCH_LOBBY,
  SHOW_JOIN_LOBBY,
  SHOW_MAIN_MENU,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SHOW_CREATE_LOBBY:
      return {
        ...state,
        createLobby: action.payload,
        mainMenu: !action.payload,
        joinLobby: !action.payload,
        searchLobby: !action.payload,
      };

    case SHOW_SEARCH_LOBBY:
      return {
        ...state,
        createLobby: !action.payload,
        mainMenu: !action.payload,
        joinLobby: !action.payload,
        searchLobby: action.payload,
      };

    case SHOW_JOIN_LOBBY:
      return {
        ...state,
        createLobby: !action.payload,
        mainMenu: !action.payload,
        joinLobby: action.payload,
        searchLobby: !action.payload,
      };

    case SHOW_MAIN_MENU:
      return {
        ...state,
        createLobby: !action.payload,
        mainMenu: action.payload,
        joinLobby: !action.payload,
        searchLobby: !action.payload,
      };
    default:
      return state;
  }
};
