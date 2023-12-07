// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firebaseConfig = {
  apiKey: "AIzaSyD6KA0ECIAB3scXNUu7mxgjmbmnhjOSEVc",
  authDomain: "banksia-pages-database.firebaseapp.com",
  projectId: "banksia-pages-database",
  storageBucket: "banksia-pages-database.appspot.com",
  messagingSenderId: "239610874789",
  appId: "1:239610874789:web:80bcede53d7ef4ba26764c",
  measurementId: "G-JV3QXR7P2H"
};

// Assuming you have a specific user ID (for demonstration purposes)
const userId = 'user123'; // Replace with your actual user ID

// User document reference
const userRef = db.collection('users').doc(userId);


// User Information
// Fetch user data from Firestore
userRef.get().then((doc) => {
    if (doc.exists) {
        // Get user data from the document
        const userData = doc.data();

        // Update HTML elements with user data
        const profilePic = document.querySelector('.profile-pic-container img');
        profilePic.src = userData.profilePicURL; // Update profile picture

        const blogUsername = document.querySelector('.blog_username');
        blogUsername.textContent = userData.username; // Update username

        const blogBio = document.querySelector('.blog_bio');
        blogBio.textContent = userData.bio; // Update bio
    } else {
        console.log('No such document!');
    }
}).catch((error) => {
    console.log('Error getting document:', error);
});

// Blog Creation
const createPostForm = document.getElementById('create-post-form');

createPostForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get input values
    const postTitle = document.getElementById('post-title').value;
    const postContent = document.getElementById('post-content').value;

    // Add post to Firestore
    db.collection('posts').add({
        title: postTitle,
        content: postContent,
        // Add other post details as needed
        // You might want to include author ID, timestamp, etc.
    })
    .then((docRef) => {
        console.log('Post added with ID: ', docRef.id);
        // Clear form after successful submission
        createPostForm.reset();
    })
    .catch((error) => {
        console.error('Error adding post: ', error);
    });
});

// sign out code
$("#signout").click(function() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(user, "Signed out");
      });
  });