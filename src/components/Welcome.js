import React, { useContext, useState } from "react";
import authContext from "../context/auth/authContext";
import "./Welcome.css";
const Welcome = () => {
  const { username, getAuthState, setAuthState } = useContext(authContext);
  const [user, setUser] = useState(null);
  console.log(username);
  const onButtonClick = (e) => {
    setAuthState();
  };

  return (
    <div className="main">
      <div className="header">TYPING GAME</div>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <div className="row ">
            <div className=" col-xs-12 col-sm-12 col-md-6  align-self-center">
              <h1 className="display-4">Write your username</h1>
            </div>
            <div className=" col-xs-12 col-sm-12 col-md-4 align-self-center">
              <form>
                <span className="input-group">
                  <input
                    onChange={(e) => {
                      setUser();
                    }}
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    required
                  ></input>
                  <span className="input-group-append">
                    <button type="submit" className="btn btn-outline-secondary">
                      Play
                    </button>
                  </span>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
