import React, { useState, useEffect, useContext } from "react";
import firebase from "../firebase";
//Contexts/
import authContext from "../context/auth/authContext";
//Components
import LoadingAnimation from "../components/LoadingAnimation";
//css
import "./Playground.css";
const Playground = (props) => {
  var AuthContext = useContext(authContext);
  var { username } = AuthContext;
  var lobbyId = props.match.params[0];
  var [loading, setLoading] = useState(true);
  var [player1, setPlayer1] = useState(null);
  var [player2, setPlayer2] = useState(null);
  const [quote, setQuote] = useState(null);
  console.log("username: " + username);
  useEffect(() => {
    if (username !== null) {
      var game = firebase.db
        .ref("lobbies")
        .child(lobbyId)
        .once("value", (snapshot) => {
          var data = snapshot.val();
          console.log("username: " + username);
          //set player1 if not existant

          console.log(data.player1);
          if (data.player1 == undefined) {
            snapshot.ref.update({ player1: username }).then(() => {
              snapshot.ref.onDisconnect().update({ player1: null });
            });
          } else if (data.player2 == undefined) {
            snapshot.ref.update({ player2: username }).then(() => {
              snapshot.ref.onDisconnect().update({ player2: null });
            });
          }

          snapshot.ref.on("value", (snapshot) => {
            var lobbydata = snapshot.val();
            setPlayer1(
              lobbydata.player1 != undefined
                ? lobbydata.player1
                : "waiting for player"
            );
            setPlayer2(
              lobbydata.player2 != undefined
                ? lobbydata.player2
                : "waiting for player"
            );
            setQuote(lobbydata.quote);

            setLoading(false);
          });

          console.log(snapshot.val());
        });
    }
  }, [username]);

  return loading ? (
    <LoadingAnimation></LoadingAnimation>
  ) : (
    <div className="main">
      <div className="container container-playground">
        <div className="paragraph">
          <textarea
            rows={12}
            readOnly={true}
            className="paragraph-textarea"
            value={quote}
            onCopy={(e) => {
              console.log("cheaterrr");
            }}
          ></textarea>
        </div>
        <div className="match-label">
          <div className="row">
            <div className="col-md-5">{player1}</div>
            <div className="col-md-2">
              <b>VS</b>
            </div>
            <div className="col-md-5">{player2}</div>
          </div>
        </div>
        <div className="textarea">
          <textarea
            rows={12}
            placeholder={"Write here"}
            className="textarea-input"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Playground;
