import React from "react";
import Navbar from "./common/Navbar";
import HomePage from "./HomePage";
import SchoolsPage from "./SchoolsPage";
import NotFoundPage from "./NotFoundPage";
import { Route, Switch } from "react-router-dom";
import SchoolPage from "./SchoolPage";

function App() {
  return (
    <>
      <header className="fixed-top">
        <Navbar />
      </header>
      <main className="mt-5">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/schools" component={SchoolsPage} />
          <Route exact path="/schools-details/:id" component={SchoolPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
    </>
  );
}

export default App;
