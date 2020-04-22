import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import authContext from "./context/auth/authContext";
function App() {
  const { username } = useContext(authContext);
  console.log(username);

  var renderingComponent = username !== null ? Welcome : Welcome;
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={renderingComponent} />
      </Switch>
    </Router>
  );
}

export default App;
