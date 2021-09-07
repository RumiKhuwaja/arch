// import app from 'firebase/app'
// import 'firebase/auth'

// const config = {
//   apiKey: "AIzaSyBRWA4ffogY8ebtf2YBIctSXgMPSnDeQU8",
//   authDomain: "argo-firebase.firebaseapp.com",
//   databaseURL: "https://argo-firebase.firebaseio.com",
//   projectId: "argo-firebase",
//   storageBucket: "argo-firebase.appspot.com",
//   messagingSenderId: "870940884156",
//   appId: "1:870940884156:web:759fcfa22dedbbfe1d64b9",
//   measurementId: "G-MY77JR8EMD"
// }

// class Firebase {
//   // tutorial here: https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial
//   constructor() {
//     app.initializeApp(config)

//     this.auth = app.auth()
//   }

//   // --- Authentication API ---
  
//   doCreateUserWithEmailAndPassword = (email, password) =>
//     this.auth.createUserWithEmailAndPassword(email, password)

//   doSignInWithEmailAndPassword = (email, password) =>
//     this.auth.signInWithEmailAndPassword(email, password)

//   doSignOut = () => this.auth.signOut()

//   doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

//   doPasswordUpdate = password =>
//     this.auth.currentUser.updatePassword(password)
// }

// export default Firebase