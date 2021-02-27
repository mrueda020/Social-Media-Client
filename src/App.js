import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

import NavBar from "./Components/NavBar";

function App() {
  return (
    <>
      <Router>
        <div className="ui container">
          <NavBar></NavBar>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
        </div>
      </Router>
    </>
  );
}

export default App;
