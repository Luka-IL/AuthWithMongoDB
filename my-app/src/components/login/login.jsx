import React from "react";
import { Authorization } from "../authorization/authorization";
import { AppLoading } from "../app-loading/app-loading";
import { Router as BrowserRouter, Switch, Route } from "react-router-dom";
import { PasswordRecovery } from "../password-recovery/password-recovery";
import browserHistory from "../../browser-history";
import "materialize-css";

export function Login() {

  return (
    <div className="login">
      <div className="logo">
        <div className="logo__image"></div>
        <h2 className="logo__title">Корпоративная информационная система</h2>
      </div>
      <BrowserRouter history={browserHistory}>
        <Switch>
          <Route exact
            path="/"
            render={() => (
              <Authorization
              />
            )} />
          <Route exact
            path="/recovery"
            render={() => (
              <PasswordRecovery />
            )} />
          <Route exact
            path="/loading"
            render={() => (
              <AppLoading />
            )} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}