//@ts-ignore
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App w-full h-screen ">
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
