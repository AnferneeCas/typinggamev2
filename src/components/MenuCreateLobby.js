import React, { useState, Fragment } from "react";
import firebase from "../firebase";
import { withRouter } from "react-router-dom";
const MenuCreateLobby = (props) => {
  const [selected, setSelected] = useState("publica");
  const [lobbyName, setLobbyName] = useState("");
  const [password, setPassword] = useState("");

  const onCreateLobby = () => {
    if (lobbyName === "") {
      //error de nombre del lobby
    } else if (password === "" && selected === "privada") {
      //error de password
    } else {
      console.log("empiza la creacion");

      //crea lobby en db
      firebase.db
        .ref("lobbies")
        .push({ nombre: lobbyName, tipo: selected, password: password })
        .then((result) => {
          console.log(result.key);
          props.history.push(`/game/${result.key}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className="container  d-flex justify-content-center ">
      <div className="button-container align-self-center">
        <div className="row">
          <div className="col-12">
            <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">
                  Lobby name
                </span>
              </div>
              <input
                className="text"
                className="form-control"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                onChange={(e) => {
                  setLobbyName(e.target.value);
                }}
              ></input>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div
              className="btn-group btn-group-toggle"
              style={{ width: "inherit" }}
              data-toggle="buttons"
            >
              <label className="btn btn-secondary active" id="publica">
                <input
                  type="radio"
                  name="options"
                  id="option1"
                  autoComplete="off"
                  checked={selected === "publica"}
                  onChange={() => {
                    setSelected("publica");
                    document.getElementById("publica").classList.add("active");
                    document
                      .getElementById("privada")
                      .classList.remove("active");
                  }}
                ></input>
                Publica
              </label>
              <label className="btn btn-secondary" id="privada">
                <input
                  checked={selected === "privada"}
                  type="radio"
                  className="options"
                  id="option2"
                  autoComplete="off"
                  onChange={() => {
                    console.log("test");
                    setSelected("privada");
                    document
                      .getElementById("publica")
                      .classList.remove("active");
                    document.getElementById("privada").classList.add("active");
                  }}
                ></input>
                Privada
              </label>
            </div>
          </div>
          {selected === "privada" ? (
            <Fragment>
              <div className="col-6">
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                ></input>
              </div>

              <div className="col-12" style={{ marginTop: "15px" }}>
                <button className="btn btn-info" onClick={onCreateLobby}>
                  PLAY!
                </button>
              </div>
            </Fragment>
          ) : (
            <div className="col-6">
              <button className="btn btn-info" onClick={onCreateLobby}>
                PLAY!
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(MenuCreateLobby);
