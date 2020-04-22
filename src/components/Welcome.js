import React, { useContext, useState } from "react";
import authContext from "../context/auth/authContext";
import "./Welcome.css";
const Welcome = () => {
  const { username, getAuthState, setAuthState } = useContext(authContext);
  const [user, setUser] = useState(null);
  console.log(username);
  const onButtonClick = (e) => {
    e.preventDefault();

    setAuthState(user);
  };

  return (
    <div className="main">
      <div className="header">TYPING GAME</div>
      <div className="banner">
        <div className="container container-form d-flex justify-content-center">
          <div className="row align-self-center row-form ">
            <div className=" col-xs-12 col-sm-12 col-md-6  ">
              <h1 className="display-4">Write your username</h1>
            </div>
            <div
              className=" col-xs-12 col-sm-12 col-md-4 "
              style={{ paddingTop: "20px" }}
            >
              <form>
                <span className="input-group">
                  <input
                    onChange={(e) => {
                      setUser(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    required
                  ></input>
                  <span className="input-group-append">
                    <button
                      type="submit"
                      className="btn btn-info"
                      onClick={onButtonClick}
                    >
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
