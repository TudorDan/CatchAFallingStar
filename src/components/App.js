import React from "react";
import Navbar from "./common/Navbar";
import HomePage from "./HomePage";
import SchoolsPage from "./SchoolsPage";
import NotFoundPage from "./NotFoundPage";
import { Route, Switch } from "react-router-dom";
import SchoolPage from "./SchoolPage";
import CoursePage from "./CoursePage";

function App() {
  return (
    <>
      <header className="fixed-top">
        <Navbar />
      </header>
      <main>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/schools" component={SchoolsPage} />
          <Route exact path="/schools/:id" component={SchoolPage} />
          <Route
            exact
            path="/schools/:schoolId/courses/:courseId"
            component={CoursePage}
          />
          <Route path="/*" component={NotFoundPage} />
        </Switch>
      </main>
    </>
  );
}

export default App;
