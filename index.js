
(function(){
	   const config = {
    apiKey: "AIzaSyAxteQnfJWDilWg9SoCPX9kpB3RkTutde4",
    authDomain: "letmeet-bai.firebaseapp.com",
    databaseURL: "https://letmeet-bai.firebaseio.com",
    projectId: "letmeet-bai",
    storageBucket: "letmeet-bai.appspot.com",
    messagingSenderId: "688044304067"
    };
    firebase.initializeApp(config);
	var ref = firebase.database().ref();   
}());


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.displayName;
	  if (email_id!=null){
		  var email_id = user.displayName;
	  }else {
		  email_id = user.email;
	  }
      document.getElementById("user_para").innerHTML = "Welcome " + email_id;

    }

  } else {
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
  }
});
function letsmeet(){
	window.location.replace('addmeeting.html');
}
function tologinpage(){
	window.location.replace('login.html');
}
function toindexpage(){
	window.location.replace('index.html');
}
function login(){
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error : " + errorMessage);
   });
	//toindexpage();
}
function register(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error : " + errorMessage);
  });

}
function facelogin(){
	var provider = new firebase.auth.FacebookAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {
  var token = result.credential.accessToken;

  var user = result.user;

}).catch(function(error) {

  var errorCode = error.code;
  var errorMessage = error.message;
  var email = error.email;
  var credential = error.credential;
});
}
function googlogin(){
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');


   firebase.auth().signInWithRedirect(provider);
	firebase.auth().getRedirectResult().then(function(result)  {
        if (result.credential) {
          var token = result.credential.accessToken;
          document.getElementById('quickstart-oauthtoken').textContent = token;
        } else {
          document.getElementById('quickstart-oauthtoken').textContent = 'null';
        }
        var user = result.user;
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
         var email = error.email;
        var credential = error.credential;
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('You have already signed up with a different auth provider for that email.');
          // If you are using multiple auth providers on your app you should handle linking
          // the user's accounts here.
        } else {
          console.error(error);
        }
      });
}
window.fbAsyncInit = function() {
    FB.init({
      appId      : '1583806705075141',
      cookie     : true,
      xfbml      : true,
      version    : '{latest-api-version}'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
function logout(){
  firebase.auth().signOut();
}
function addevent(){
	function writeNewPost(uid, username, picture, title, body) {
  // A post entry.
  var postData = {
    author: username,
    uid: uid,
    body: body,
    title: title,
    starCount: 0,
    authorPic: picture
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('meetings').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}
}
function addmeeting1(){
	var ref = firebase.database().ref(); 
	var postsRef = ref.child("meetings");
  var newPostRef = postsRef.push();
  newPostRef.set({
    author: "gracehop",
    title: "Announcing COBOL, a New Programming Language"

});	
}

function addmeeting(){
	var ref = firebase.database().ref();
	var user = firebase.auth().currentUser;
	var meetUser = document.getElementById("meet_user").value;
	var meetName = document.getElementById("meet_name").value;
	var meetStartDate = document.getElementById("meet_from").value;
	var meetEndDate = document.getElementById("meet_until").value;
	var meetText = document.getElementById("meet_text").value;
	var meetLocation = document.getElementById("meet_location").value;

	var postsRef = ref.child("meetings");
  var newPostRef = postsRef.push();
  newPostRef.set({
    Nazwa: [meetName],
    DataOd: [meetStartDate],
    DataDo: [meetEndDate],
    Opis: [meetText],
    Lokalizacji: [meetLocation],
    Autor: [meetUser],	
  });
  
}
