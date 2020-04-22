import React, { useContext } from "react";
import authContext from "../context/auth/authContext";
const Welcome = () => {
  console.log(authContext);
  const { username, getAuthState, setAuthState } = useContext(authContext);

  return <div>teswet</div>;
};

export default Welcome;
