const navbar = document.getElementById('navbar');

firebase.auth().onAuthStateChanged((user)=>{ //listener for auth state change
  if(user){ /*changes navbar to include sign in or sign out
            buttons depending on auth state. other state-dependent scripts can also be added here*/
    navbar.innerHTML = `
    <a class="nav-title" href="#">Banksia<b>Pages</b></a>
    <div class="header-buttons">
      <a href="">sign in</a>

    </div>
    <div class="header-links">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="html/blogslist.html">Blogs</a></li>
        <li><a href="html/about.html">About</a></li>
      </ul>
    </div>
    `;
  }else{
    navbar.innerHTML = `
    <a class="nav-title" href="#">Banksia<b>Pages</b></a>
    <div class="header-buttons">
      <a href="" id="signout">sign out</a>

    </div>
    <div class="header-links">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="html/blogslist.html">Blogs</a></li>
        <li><a href="html/about.html">About</a></li>
      </ul>
    </div>
    `;
  }
});
$("#signout").click(function(){
  firebase.auth().signOut().then(()=>{
    console.log("user sign out");
    window.location.href("index.html");
  }).catch((error)=>{
    console.log(error.message);
  });
});
