import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const New = lazy(() => import("../pages/New"));

const Router = () => {
  return (
    <Suspense fallback="Loading...">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/new" component={New} />
      </Switch>
    </Suspense>
  );
};

export default Router;
