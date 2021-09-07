import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { withRouter, Route, Switch, Redirect } from "react-router-dom"

import HomePage from "./homepage/HomePage"
import SignInPage from "./authentication/SignInPage"
import RegistrationPage from "./authentication/RegistrationPage"
import ConfirmationPage from "./authentication/ConfirmationPage"
import VerificationSentPage from "./authentication/VerificationSentPage"
import Report from "./report/Report"
import TraitBase from "./trait/TraitBase"
import GenericNotFound from "./navigation-error/GenericNotFound"
import withAuth from "./authentication/withAuth"

export default withRouter(function App(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Switch>
        <Route exact path="/" render={() => <HomePage />} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/register" component={RegistrationPage} />
        <Route path="/confirmation/:email/:token" component={ConfirmationPage} />
        <Route path="/verification-sent" component={VerificationSentPage} />
        <Route path="/report/trait" component={withAuth(TraitBase)} />
        <Route path="/report" component={withAuth(Report)} />
        <Route path="/404" component={GenericNotFound} />
        <Redirect to="/404" />
      </Switch>
    </React.Fragment>
  )
})