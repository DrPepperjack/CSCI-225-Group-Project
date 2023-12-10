// add  a google login choice here 
$('#google-login-button').click(function () {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            var user = result.user;

            // User is signed in.
            console.log("Sign in through Google username: " + user.displayName);

            // Check if user document already exists
            var userDocRef = firebase.firestore().collection("UserData").doc(user.displayName);
            userDocRef.get().then((doc) => {
                if (doc.exists) {
                    // User document exists, redirect to index.html
                    window.location.href = "index.html";
                } else {
                    // User document does not exist, create it
                    userDocRef.set({
                        name: user.displayName,
                        email: user.email,
                        // add other user properties
                    })
                    .then(() => {
                        console.log("User successfully written!");
                        window.location.href = "html/createaccount.html";
                    })
                    .catch((error) => {
                        console.error("Error writing user: ", error);
                    });
                }
            }).catch((error) => {
                console.log("Error getting user document:", error);
            });

        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log("Error: " + errorMessage);
            // The email of the user's account used.
            var email = error.email;
            // ...
        });
});