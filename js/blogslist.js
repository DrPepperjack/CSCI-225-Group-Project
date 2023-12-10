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

// Reference to the collection of featured blogs in Firebase
const featuredBlogsRef = db.collection('featuredBlogs');

// Fetch featured blogs from Firebase
featuredBlogsRef.get().then((querySnapshot) => {
    // Container to hold featured blogs
    const featuredBlogsContainer = document.querySelector('.featured-blogs');

    querySnapshot.forEach((doc) => {
        const blogData = doc.data();
        // Create HTML structure for each featured blog
        const blogHTML = `
            <div class="featured-blog">
                <img src="${blogData.imageUrl}" alt="Featured User Profile Image">
                <h3>${blogData.author}</h3>
                <p>${blogData.content}</p>
            </div>
        `;
        // Append the blog HTML to the featured blogs container
        featuredBlogsContainer.innerHTML += blogHTML;
    });
}).catch((error) => {
    console.error('Error getting featured blogs:', error);
});
