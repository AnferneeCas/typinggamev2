import React, { useContext, useState } from "react";
//css
import "./Menu.css";
//context
import authContext from "../context/auth/authContext";
import menusContext from "../context/menus/menusContext";
//components
import MainMenu from "./MainMenu";
import MenuCreateLobby from "./MenuCreateLobby";

const Menu = () => {
  var AuthContext = useContext(authContext);
  var { username } = AuthContext;

  var MenusContext = useContext(menusContext);
  var { mainMenu, createLobby, searchLobby, joinLobby } = MenusContext;

  var LoadingComponent = null;

  if (createLobby === true) {
    LoadingComponent = <MenuCreateLobby></MenuCreateLobby>;
  } else if (mainMenu === true) {
    LoadingComponent = <MainMenu></MainMenu>;
  }

  return (
    <div className="main d-flex justify-content-center">
      <div className="headerMenu">TYPING GAME</div>
      <div className="align-self-center menu rounded">
        <div
          className="menu-top-corner rounded justify-content-center"
          style={{ color: "white" }}
        >
          Are you ready to type {username} ?
        </div>
        {LoadingComponent}
      </div>
    </div>
  );
};

export default Menu;
