import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./common/Navbar";
import HomePage from "./pages/HomePage";
import SchoolsPage from "./pages/SchoolsPage";
import NotFoundPage from "./pages/NotFoundPage";
import SchoolPage from "./pages/SchoolPage";
import CoursePage from "./pages/CoursePage";
import CataloguePage from "./pages/CataloguePage";
import AddPersonPage from "./pages/AddPersonPage";
import AddCoursePage from "./pages/AddCoursePage";

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
          <Route
            exact
            path="/schools/:schoolId/catalogues/:catalogueId"
            component={CataloguePage}
          />
          <Route exact path="/schools/:id/persons" component={AddPersonPage} />
          <Route exact path="/schools/:id/courses" component={AddCoursePage} />
          <Route path="/*" component={NotFoundPage} />
        </Switch>
      </main>
    </>
  );
}

export default App;
