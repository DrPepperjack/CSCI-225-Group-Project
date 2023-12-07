// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD6KA0ECIAB3scXNUu7mxgjmbmnhjOSEVc",
    authDomain: "banksia-pages-database.firebaseapp.com",
    projectId: "banksia-pages-database",
    storageBucket: "banksia-pages-database.appspot.com",
    messagingSenderId: "239610874789",
    appId: "1:239610874789:web:80bcede53d7ef4ba26764c",
    measurementId: "G-JV3QXR7P2H"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  //Google login
  $('#google-login-button').click(function () {
    var provider = new firebase.auth.GoogleAuthProvider();
  
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
  
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      
      // User is signed in.
      console.log("Sign in through Google username: " + user.email);
  
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      console.log("Error: " + errorMessage);
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  });