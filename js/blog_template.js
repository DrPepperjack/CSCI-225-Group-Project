// Initialize firebase

// sign out code
$("#signout").click(function() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error.message);
      });
  });