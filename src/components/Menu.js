import React, { useContext, useState } from "react";
//css
import "./Menu.css";
//context
import authContext from "../context/auth/authContext";

//components
import LoadingAnimation from "./LoadingAnimation";
const Menu = () => {
  var AuthContext = useContext(authContext);
  var { username } = AuthContext;

  var [lookingForLobby, setLookingForLobby] = useState(false);
  const onClickJoinLobby = () => {};
  const onClickSearchForLobby = () => {
    setLookingForLobby(true);
  };
  const onClickCreateLobby = () => {};

  return lookingForLobby ? (
    <LoadingAnimation></LoadingAnimation>
  ) : (
    <div className="main d-flex justify-content-center">
      <div className="headerMenu">TYPING GAME</div>
      <div className="align-self-center menu rounded">
        <div
          className="menu-top-corner rounded justify-content-center"
          style={{ color: "white" }}
        >
          Are you ready to type {username} ?
        </div>
        <div className="container  d-flex justify-content-center ">
          <div className="button-container align-self-center">
            <div className="row  ">
              <div className="col-12">
                <button type="button" class="btn btn-outline-light">
                  Join Lobby
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button
                  type="button"
                  class="btn btn-outline-light"
                  onClick={onClickSearchForLobby}
                >
                  Search for a lobby
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button type="button" class="btn btn-outline-light">
                  Create lobby
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
