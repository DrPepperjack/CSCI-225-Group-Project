firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var userName = user.displayName;

        db.collection("blogPosts").where("blogUserName", "==", userName).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var blogData = doc.data();

                    var postDiv = document.createElement('div');
                    postDiv.className = 'blog-post';

                    var title = document.createElement('h3');
                    title.textContent = blogData.title;

                    var date = document.createElement('p');
                    date.textContent = "Date Created: " + blogData.date;

                    var content = document.createElement('p');
                    content.textContent = blogData.content;

                    // ... continue creating and appending elements

                    var blogPostBody = document.querySelector('blog-list'); // Update this selector to match your HTML structure
                    blogPostBody.appendChild(postDiv);
                });
            })
            .catch((error) => {
                console.log('Error getting documents:', error);
            });
    } else {
        console.log('No user is signed in');
    }
});
