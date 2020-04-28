import React, { useState, useEffect, useContext, Fragment } from "react";
import firebase from "../firebase";
//Contexts/
import authContext from "../context/auth/authContext";
//Components
import LoadingAnimation from "../components/LoadingAnimation";
//css
import "./Playground.css";
import { Redirect } from "react-router-dom";
const Playground = (props) => {
  var AuthContext = useContext(authContext);
  var { username, setAuthState } = AuthContext;
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
  var [gameTextPlayer1, setGameTextPlayer1] = useState("");
  var [gameTextPlayer2, setGameTextPlayer2] = useState("");
  var [goodTextPlayer1, setGoodTextPlayer1] = useState("");
  var [goodTextPlayer2, setGoodTextPlayer2] = useState("");
  var [status, setStatus] = useState("");
  var [winner, setWinner] = useState(null);
  var [ready, setReady] = useState(false);
  useEffect(() => {
    if (username !== null) {
      var game = firebase.db
        .ref("lobbies")
        .child(lobbyId)
        .once("value", (snapshot) => {
          var data = snapshot.val();

          if (true) {
            setReady(true);
            if (data.quote !== undefined) {
              //set player1 if not existant

              if (data.player1 == undefined) {
                snapshot.ref.update({ player1: username }).then(() => {
                  firebase.db
                    .ref("countdown")
                    .child(lobbyId)
                    .update({ player1: username })
                    .then(() => {
                      setCurrentPlayer(1);
                    });

                  firebase.db
                    .ref("countdown")
                    .child(lobbyId)
                    .onDisconnect()
                    .update({ player1: null });
                  snapshot.ref.onDisconnect().update({ player1: null });
                });
              } else if (data.player2 === undefined) {
                snapshot.ref.update({ player2: username }).then(() => {
                  firebase.db
                    .ref("countdown")
                    .child(lobbyId)
                    .update({ player2: username })
                    .then(() => {
                      setCurrentPlayer(2);
                    });

                  firebase.db
                    .ref("countdown")
                    .child(lobbyId)
                    .onDisconnect()
                    .update({ player2: null });
                  snapshot.ref.onDisconnect().update({ player2: null });
                });
              }

              snapshot.ref.on("value", (snapshot) => {
                var lobbydata = snapshot.val();

                if (lobbydata.winner != undefined) {
                  setWinner(lobbydata.winner);
                }
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
                if (quote == null) setQuote(lobbydata.quote);
                if (lobbydata.textPlayer1 !== undefined)
                  setGameTextPlayer1(lobbydata.textPlayer1);
                if (lobbydata.textPlayer2 !== undefined)
                  setGameTextPlayer2(lobbydata.textPlayer2);
                if (gameQuote === null || gameQuote != lobbydata.quote)
                  setGameQuote(lobbydata.quote);
                if (lobbydata.quote != undefined) {
                }
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
            }
          }
        });
    } else {
      var auth = localStorage.getItem("auth");
      if (auth === null) {
        setAuthState("Anonymous");
      }
    }
  }, [username]);

  useEffect(() => {
    firebase.db
      .ref("countdown")
      .child(lobbyId)
      .on("value", (snapshot) => {
        var countDownData = snapshot.val();
        if (countDownData != null) {
          if (countDownData.countDown === 0) {
            setLoading(false);
            document.querySelector("h1").innerHTML = "READY";
            document.querySelector(".banner").classList.add("show");
          } else if (countDownData.countDown === 1) {
            document.querySelector("h1").innerHTML = "SET";
          } else if (countDownData.countDown === 2) {
            document.querySelector("h1").innerHTML = "TYPE!";
            document.querySelector(".banner").classList.remove("show");
            setStatus("playing");
            document.getElementById("textareainput").click();
          } else if (countDownData.countDown === 3) {
            setStatus("playing");
            setLoading(false);
            document.getElementById("textareainput").click();
          }
        }
      });
  }, []);
  useEffect(() => {
    if (
      gameTextPlayer1 != null &&
      gameTextPlayer2 != null &&
      gameQuote != null
    ) {
      var goodTextP1 = goodString(gameTextPlayer1);
      var goodTextP2 = goodString(gameTextPlayer2);
      if (goodTextP1.length > goodTextP2.length) {
        var missingQuote = gameQuote.replace(goodTextP1, "");
        var textP1 = goodTextP1.replace(goodTextP2, "");
        var textP2 = goodTextP2;
        var both = goodTextP2;
        setQuote(missingQuote);
        setTextPlayer1(textP1);
        setTextPlayer2(textP2);
        setBothText(both);
        setGoodTextPlayer1(goodTextP1);
        setGoodTextPlayer2(goodTextP2);
      } else {
        var missingQuote = gameQuote.replace(goodTextP2, "");
        var textP1 = goodTextP1;
        var textP2 = goodTextP2.replace(goodTextP1, "");
        var both = goodTextP1;
        setQuote(missingQuote);
        setTextPlayer1(textP1);
        setTextPlayer2(textP2);
        setBothText(both);
        setGoodTextPlayer1(goodTextP1);
        setGoodTextPlayer2(goodTextP2);
      }
    } else if (gameQuote != null) {
      if (gameTextPlayer1 != null) {
        console.log("firesttttttttt");
        var goodTextP1 = goodString(gameTextPlayer1);
        setTextPlayer1(goodTextP1);
        setGoodTextPlayer1(goodTextP1);
        var missingQuote = gameQuote.replace(goodTextP1, "");
        setQuote(missingQuote);
      } else {
        var goodTextP2 = goodString(gameTextPlayer2);
        setTextPlayer2(goodTextP2);
        setGoodTextPlayer2(goodTextP2);
        var missingQuote = gameQuote.replace(goodTextP2, "");
        setQuote(missingQuote);
      }
    }
  }, [gameTextPlayer1, gameTextPlayer2]);

  useEffect(() => {
    if (gameQuote != null && winner == null) {
      if (goodTextPlayer1 === gameQuote) {
        setWinner(player1);
        firebase.db.ref("lobbies").child(lobbyId).update({ winner: player1 });
      }
      if (goodTextPlayer2 === gameQuote) {
        setWinner(player2);
        firebase.db.ref("lobbies").child(lobbyId).update({ winner: player2 });
      }
    }
  }, [goodTextPlayer1, goodTextPlayer2]);

  var goodString = (text) => {
    if (gameQuote != null) {
      var result = "";
      for (let index = 0; index < gameQuote.length; index++) {
        if (text.charAt(index) === gameQuote.charAt(index)) {
          result = result + text.charAt(index);
        } else {
          break;
        }
      }
      return result;
    }
    return "";
  };

  var getLongerGoodText = () => {
    if (goodTextPlayer1.length > goodTextPlayer2.length) {
      console.log(textPlayer1);
      return textPlayer1;
    }
    if (goodTextPlayer2.length > goodTextPlayer1.length) {
      console.log(textPlayer2);
      return textPlayer2;
    }
    return null;
  };

  return loading ? (
    <LoadingAnimation text="setting up the lobby"></LoadingAnimation>
  ) : winner !== null ? (
    <div className="main d-flex justify-content-center win-box ">
      <div className="row">
        <div
          className="col-12"
          style={{ color: "white", fontSize: "xxx-large" }}
        >{`THE WINNER IS : ${winner}`}</div>
        <div className="col-12">
          <button
            className="btn btn-light"
            onClick={() => {
              document.location.href = "https://typinggamev2.web.app/";
            }}
          >
            Play Again
          </button>{" "}
        </div>
      </div>
    </div>
  ) : (
    <div className="main">
      <div className="banner showMe">
        <h1></h1>
      </div>

      <div className="container container-playground">
        <div
          className="paragraph"
          onCopy={(e) => {
            e.preventDefault();
          }}
        >
          <Fragment>
            <span id="both">{bothText}</span>

            <span
              id={
                goodTextPlayer1.length >= goodTextPlayer2.length
                  ? "player1"
                  : "player2"
              }
            >
              {getLongerGoodText()}
            </span>

            <span id="general">{quote}</span>
          </Fragment>
        </div>
        <div className="match-label">
          <div className="row">
            <div className="col-md-5" style={{ position: "inherit" }}>
              {player1}
            </div>
            <div className="col-md-2" style={{ position: "inherit" }}>
              <b>VS</b>
            </div>
            <div className="col-md-5" style={{ position: "inherit" }}>
              {player2}
            </div>
          </div>
        </div>
        <div className="textarea">
          <textarea
            id="textareainput"
            rows={12}
            placeholder={"Write here"}
            className="textarea-input"
            disabled={status === "playing" ? false : true}
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
