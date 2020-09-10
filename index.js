  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA_gwf-PQi2KF05BWsgNN3sZGGEbgCqR_8",
    authDomain: "wp2020-5c662.firebaseapp.com",
    databaseURL: "https://wp2020-5c662.firebaseio.com",
    projectId: "wp2020-5c662",
    storageBucket: "wp2020-5c662.appspot.com",
    messagingSenderId: "273725891895",
    appId: "1:273725891895:web:ee673b14702d513f36a6b2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth=firebase.auth();

  var currentUser = auth.currentUser;
  console.log("trenutni index"+currentUser);


  

  function signIn(){
  
    var email= document.getElementById("email").value;
    var password= document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password).then( function a(){
      //then
      console.log("signin metoda");
      window.location.href = "home.html"; 
    }).catch(error=>alert(error.message));




    
  }
    






function signOut(){
  auth.signOut();
  alert("Signed out");
}
auth.onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        window.location.replace("home.html");
    } else {
        // User is signed out.
    }
});

function forgotPassword(){
  console.log("Trazim");
  var email= document.getElementById("email").value;

  
  auth.sendPasswordResetEmail(email).then( function a(){
    //then
    alert("A password reset link was sent.");
  }).catch(error=>alert(error.message));
}