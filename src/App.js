import Header from "./Components/Header/Header";
import { Route, Switch } from "react-router-dom";
import Signup from "./Components/Pages/Signup";
function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </>
  );
}

export default App;
