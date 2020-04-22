import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import AuthState from "./context/auth/authState";
function App() {
  return (
    <AuthState>
      <Router>
        <Switch>
          <Route exact path="/" component={Welcome} />
        </Switch>
      </Router>
    </AuthState>
  );
}

export default App;
