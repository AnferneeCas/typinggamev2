import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//COMPONENTES
import Welcome from "./components/Welcome";
import Menu from "./components/Menu";
import LoadingAnimation from "./components/LoadingAnimation";
//context
import authContext from "./context/auth/authContext";
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
    <Router>
      <Switch>
        <Route exact path="/" component={renderingComponent} />
      </Switch>
    </Router>
  );
}

export default App;
