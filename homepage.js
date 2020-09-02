var element = document.getElementById("text");


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

  function signOut(){
    auth.signOut();
    alert("Signed out");
  }
  auth.onAuthStateChanged(function (user) {
      if (user) {
          // User is signed in.
          element.innerHTML = user.email;
          
      } else {
          // User is signed out.
      }
  });