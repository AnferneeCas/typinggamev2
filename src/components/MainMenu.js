import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
//context
import authContext from "../context/auth/authContext";
import menusContext from "../context/menus/menusContext";
//components
import firebase from "../firebase";
const MainMenu = (props) => {
  var AuthContext = useContext(authContext);
  var { username } = AuthContext;

  //menus context
  var MenusContext = useContext(menusContext);
  var {
    showCreateLobby,
    showJoinLobby,
    showMainMenu,
    showSearchLobby,
  } = MenusContext;

  var [lookingForLobby, setLookingForLobby] = useState(false);
  const onClickJoinLobby = () => {
    showJoinLobby(true);
    const player = localStorage.getItem("auth");
    firebase.queuePlayer(player, props);
  };
  const onClickSearchForLobby = () => {
    showSearchLobby(true);
  };
  const onClickCreateLobby = () => {
    showCreateLobby(true);
  };

  return (
    <div className="container  d-flex justify-content-center ">
      <div className="button-container align-self-center">
        <div className="row  ">
          <div className="col-12">
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={onClickJoinLobby}
            >
              Join Lobby
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={onClickSearchForLobby}
            >
              Search for a lobby
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={onClickCreateLobby}
            >
              Create lobby
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(MainMenu);
