import './App.css';
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import Header from "./containers/Header/Header";
import HomePage from './containers/HomePage/HomePage';

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
    </div>
  );
}

export default withRouter(App);
