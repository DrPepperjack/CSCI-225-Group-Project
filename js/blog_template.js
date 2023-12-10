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

// View Post and view more posts of users
const blogContainer = document.querySelector('.blog-lists');
const loadMoreButton = document.querySelector('.load-more-button');

// Function to fetch and display blog posts from Firebase
function fetchBlogPosts() {
    // Fetch blog posts from Firebase (example)
    firebase.database().ref('blogPosts').once('value', (snapshot) => {
        snapshot.forEach((postSnapshot) => {
            const post = postSnapshot.val();

            // Create HTML structure for each blog post
            const postHTML = `
                <div class="blog-post">
                    <div class="blog-post-header">
                        <h1>${post.title}</h1>
                        <p>Author: ${post.author}</p>
                        <p>Date: ${post.date}</p>
                        <!-- Additional content -->
                    </div>
                    <!-- Additional content -->
                </div>
            `;

            // Append the HTML for each post to the blog container
            blogContainer.innerHTML += postHTML;
        });
    });
}

// Initial load of blog posts
fetchBlogPosts();

// Event listener for "Load More" button
loadMoreButton.addEventListener('click', () => {
    // Fetch more posts or load more content here
    // For example, you can implement pagination or load additional posts on button click
    // Fetching more posts will depend on your Firebase database structure
    // and the logic for retrieving the next set of posts
    // Ensure to append new posts to the blog container
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