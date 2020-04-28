import React, { useContext, useState } from "react";
//context
import authContext from "../context/auth/authContext";
import menusContext from "../context/menus/menusContext";
import firebase from "../firebase";
import LoadingAnimation from "./LoadingAnimation";
import { withRouter } from "react-router-dom";
//components

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
  const onClickJoinLobby = () => {};
  const onClickSearchForLobby = async () => {
    // showSearchLobby(true);
    setLookingForLobby(true);
    var result = await firebase.db.ref("queue").push({ user: username });

    result.ref.on("value", (snapshot) => {
      var data = snapshot.val();
      if (data != null) {
        if (data.lobbyId != undefined) {
          firebase.db
            .ref("lobbies")
            .child(data.lobbyId)
            .on("value", (snapshot) => {
              var tmp = snapshot.val();

              if (tmp.quote !== undefined) {
                props.history.push(`/game/${data.lobbyId}`);
              }
            });
        }
      }
    });
  };
  const onClickCreateLobby = () => {
    showCreateLobby(true);
  };

  return lookingForLobby ? (
    <LoadingAnimation text="searching for players..."></LoadingAnimation>
  ) : (
    <div className="container  d-flex justify-content-center ">
      <div className="button-container align-self-center">
        <div className="row  ">
          <div className="col-12">
            {/* <button type="button" className="btn btn-outline-light">
              Join Lobby
            </button> */}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={onClickSearchForLobby}
            >
              Quick match
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
