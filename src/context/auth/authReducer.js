import { GET_AUTHSTATE } from "../types";
export default (state, action) => {
  switch (action.type) {
    case GET_AUTHSTATE:
      localStorage.setItem("auth", action.payload);
      return {
        ...state,
        username: action.payload,
      };

    default:
      return state;
  }
};
