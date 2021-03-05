import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { AuthProvider } from "./Context/auth";
import AuthRoute from "./Util/AuthRoute";

import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

import NavBar from "./Components/NavBar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="ui container">
          <NavBar></NavBar>
          <Route exact path="/" component={Home}></Route>
          <AuthRoute exact path="/login" component={Login}></AuthRoute>
          <AuthRoute exact path="/register" component={Register}></AuthRoute>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
