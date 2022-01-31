import './App.css';
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import Header from "./containers/Header/Header";
import HomePage from './containers/HomePage/HomePage';
import SwapPage from './containers/Swap/SwapPage';
import TradePage from './containers/Trade/TradePage';
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
      <Route
        exact
        path="/swap"
        render={props => <SwapPage {...props} />}
      />
      <Route
        exact
        path="/trade"
        render={props => <TradePage {...props} />}
      />
    </div>
  );
}

export default withRouter(App);
