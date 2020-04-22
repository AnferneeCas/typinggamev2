import { GET_AUTHSTATE, SET_AUTHSTATE } from "../types";
export default (state, action) => {
  switch (action.type) {
    case SET_AUTHSTATE:
      localStorage.setItem("auth", action.payload);
      return {
        ...state,
        username: action.payload,
      };

    case GET_AUTHSTATE:
      return {
        ...state,
        username: action.payload,
      };

    default:
      return state;
  }
};
