import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import View from "./Components/View";
import NotFound from "./Components/NotFound";
function App() {
     return (
          <div className="app">
               <Router>
                    <Switch>
                         <Route exact path="/" component={Home} />
                         <Route
                              exact
                              path="/:pokemonId"
                              render={(props) => <View {...props} />}
                         />
                         <Route exact path="*" component={NotFound} />
                    </Switch>
               </Router>
          </div>
     );
}

export default App;
