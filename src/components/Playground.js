import React, { useState, useEffect, useContext, Fragment } from "react";
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
  var [currentPlayer, setCurrentPlayer] = useState(null);
  var [textPlayer1, setTextPlayer1] = useState("");
  var [textPlayer2, setTextPlayer2] = useState("");
  var [quote, setQuote] = useState(null);
  var [bothText, setBothText] = useState("");
  var [gameQuote, setGameQuote] = useState(null);
  var [gameTextPlayer1, setGameTextPlayer1] = useState(null);
  var [gameTextPlayer2, setGameTextPlayer2] = useState(null);
  useEffect(() => {
    if (username !== null) {
      var game = firebase.db
        .ref("lobbies")
        .child(lobbyId)
        .once("value", (snapshot) => {
          var data = snapshot.val();

          //set player1 if not existant

          if (data.player1 == undefined) {
            snapshot.ref.update({ player1: username }).then(() => {
              setCurrentPlayer(1);
              snapshot.ref.onDisconnect().update({ player1: null });
            });
          } else if (data.player2 == undefined) {
            snapshot.ref.update({ player2: username }).then(() => {
              setCurrentPlayer(2);
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
            if (lobbydata.textPlayer1 !== undefined)
              setGameTextPlayer1(lobbydata.textPlayer1);
            if (lobbydata.textPlayer2 !== undefined)
              setGameTextPlayer2(lobbydata.textPlayer2);
            if (gameQuote === null) setGameQuote(lobbydata.quote);

            setLoading(false);
          });

          currentPlayer == 1
            ? snapshot.ref
                .onDisconnect()
                .update({ textPlayer1: "" })
                .then(() => {
                  if (gameQuote != null)
                    setQuote(gameQuote.replace(textPlayer2));

                  setTextPlayer1("");
                  setGameTextPlayer1(null);
                })
            : snapshot.ref
                .onDisconnect()
                .update({ textPlayer2: "" })
                .then(() => {
                  if (gameQuote != null)
                    setQuote(gameQuote.replace(textPlayer1));

                  setTextPlayer2("");
                  setGameTextPlayer2(null);
                });
        });
    }
  }, [username]);

  useEffect(() => {
    if (
      gameTextPlayer1 != null &&
      gameTextPlayer2 != null &&
      gameQuote != null
    ) {
      if (gameTextPlayer1.length >= gameTextPlayer2.length) {
        var both = "";
        var goodText = "";
        for (let index = 0; index <= gameTextPlayer1.length; index++) {
          if (
            gameTextPlayer1.charAt(index) == gameTextPlayer2.charAt(index) &&
            gameTextPlayer1.charAt(index) == gameQuote.charAt(index)
          ) {
            goodText = goodText + gameQuote.charAt(index);
            both = both + gameTextPlayer1.charAt(index);
          } else if (gameTextPlayer1.charAt(index) == gameQuote.charAt(index)) {
            goodText = goodText + gameQuote.charAt(index);
          } else {
            break;
          }
        }

        var rest = goodText.replace(both, "");

        setTextPlayer1(rest);
        setBothText(both);
        //quitarle lo restante al quote

        var written = both + rest;
        setQuote(gameQuote.replace(written, ""));
        console.log(`PLAYER 1 >= PLAYER2`);
        console.log("Player1: ", rest);
        console.log("Player2: ", rest);
        console.log("Both: ", both);
      } else {
        var goodText = "";
        var both = "";
        for (let index = 0; index < gameTextPlayer2.length; index++) {
          if (
            gameTextPlayer2.charAt(index) == gameTextPlayer1.charAt(index) &&
            gameTextPlayer2.charAt(index) == gameQuote.charAt(index)
          ) {
            goodText = goodText + gameQuote.charAt(index);
            both = both + gameTextPlayer2.charAt(index);
          } else if (gameTextPlayer2.charAt(index) == gameQuote.charAt(index)) {
            goodText = goodText + gameQuote.charAt(index);
          } else {
            break;
          }
        }
        var rest = goodText.replace(both, "");

        setTextPlayer2(rest);
        setBothText(both);
        //quitarle lo restante al quote

        var written = both + rest;
        setQuote(gameQuote.replace(written, ""));
      }
    } else if (gameQuote != null) {
      if (gameTextPlayer1 != null) {
        var goodText = "";
        for (let index = 0; index < gameQuote.length; index++) {
          if (gameTextPlayer1.charAt(index) === gameQuote.charAt(index)) {
            goodText = goodText + gameTextPlayer1.charAt(index);
          } else {
            break;
          }
        }
        setTextPlayer1(goodText);
        setQuote(gameQuote.replace(goodText, ""));
      }
      if (gameTextPlayer2 != null) {
        var goodText = "";
        for (let index = 0; index < gameQuote.length; index++) {
          if (gameTextPlayer2.charAt(index) === gameQuote.charAt(index)) {
            goodText = goodText + gameTextPlayer2.charAt(index);
          } else {
            break;
          }
        }
        setTextPlayer2(goodText);
        setQuote(gameQuote.replace(goodText, ""));
      }
    }
  }, [gameTextPlayer1, gameTextPlayer2]);

  var goodString = (text) => {
    var result = "";
    for (let index = 0; index < gameQuote.length; index++) {}
  };

  return loading ? (
    <LoadingAnimation></LoadingAnimation>
  ) : (
    <div className="main">
      <div className="container container-playground">
        <div
          className="paragraph"
          onCopy={(e) => {
            e.preventDefault();
            console.log("cheater");
          }}
        >
          <Fragment>
            <span id="both">{bothText}</span>

            <span
              id={textPlayer1.length >= textPlayer2 ? "player1" : "player2"}
            >
              {textPlayer1.length >= textPlayer2.length
                ? textPlayer1
                : textPlayer2}
            </span>

            <span id="general">{quote}</span>
          </Fragment>

          {/* {textPlayer1.length >= textPlayer2.length ? (
            <Fragment>
              <span id="both">{bothText}</span>
              <span id="player1">{textPlayer1}</span>
              <span id="player2">{textPlayer2}</span>
              <span id="general">{quote}</span>
            </Fragment>
          ) : (
            <Fragment>
              <span id="both">{bothText}</span>
              <span id="player2">{textPlayer2}</span>
              <span id="player1">{textPlayer1}</span>
              <span id="general">{quote}</span>
            </Fragment>
          )} */}

          {/* <textarea
            rows={12}
            readOnly={true}
            className="paragraph-textarea"
            value={quote}
            disabled
            onCopy={(e) => {
              e.preventDefault();
              console.log("cheaterrr");
            }}
          ></textarea> */}
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
            onChange={async (e) => {
              if (currentPlayer == 1) {
                firebase.db.ref("lobbies").child(lobbyId).update({
                  textPlayer1: e.target.value,
                });
              } else if (currentPlayer == 2) {
                firebase.db.ref("lobbies").child(lobbyId).update({
                  textPlayer2: e.target.value,
                });
              }
            }}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Playground;
