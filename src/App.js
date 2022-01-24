import './App.css';
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import Header from "./containers/Header/Header";
import HomePage from './containers/HomePage/HomePage';
import Game from './containers/Game/Game';

function App() {
  return (
    <div className="App">
      <Route
        path="/"
        render={props => <Header {...props} />}
      />
      <Route
        exact
        path="/"
        render={props => <HomePage {...props} />}
      />
      <Route
        exact
        path="/farm"
        render={props => <Game {...props} />}
      />
    </div>
  );
}

export default withRouter(App);
