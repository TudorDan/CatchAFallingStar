import React from "react";
import Navbar from "./common/Navbar";
import HomePage from "./HomePage";
import SchoolsPage from "./SchoolsPage";
import NotFoundPage from "./NotFoundPage";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <header className="fixed-top">
        <Navbar />
      </header>
      <main>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/schools" component={SchoolsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
    </>
  );
}

export default App;
