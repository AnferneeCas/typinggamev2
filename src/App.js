import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//COMPONENTES
import Welcome from "./Components/Welcome";
import Menu from "./Components/Menu";
import LoadingAnimation from "./Components/LoadingAnimation";
import Playground from "./Components/Playground";
//context
import authContext from "./context/auth/authContext";
import MenusState from "./context/menus/menusState";
function App() {
  const { username, getAuthState, checked } = useContext(authContext);
  var renderingComponent = null;

  //wait for getAuthState to run
  if (checked === false) {
    //loading animation
    renderingComponent = LoadingAnimation;
  } else {
    renderingComponent = username !== null ? Menu : Welcome;
  }

  return (
    <MenusState>
      <Router>
        <Switch>
          <Route exact path="/" component={renderingComponent} />
          <Route exact path="/game/*" component={Playground} />
        </Switch>
      </Router>
    </MenusState>
  );
}

export default App;
