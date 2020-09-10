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
  const db=firebase.database();
  const storageRef = firebase.storage().ref();


    auth.onAuthStateChanged(function (user) {
        if (user) {
            console.log("logiran "+user.uid);
            // User is signed in.
           // element.innerHTML = user.email;
            
        } else {
            // User is signed out.
            console.log("izvrsih se");
           // element.innerHTML = "odjavljeno";
            window.location.replace("index.html");
        }
    });


    
  


  