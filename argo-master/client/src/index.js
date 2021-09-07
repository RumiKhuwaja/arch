import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route } from "react-router-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
// import Firebase from './firebase/firebase'
// import FirebaseContext from './firebase/context'

ReactDOM.render(
  // <FirebaseContext.Provider value={new Firebase()}>
    <BrowserRouter>
      <Route component={App} />
    </BrowserRouter>,
  // </FirebaseContext.Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
