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

  var mnameSurname= document.getElementById("nameSurname");
    var mcapitalCatch=document.getElementById("capitalCatch");
    var mfavouriteFish= document.getElementById("favouriteFish");
    var memail= document.getElementById("email");
    var musername= document.getElementById("username");
    var mpassword= document.getElementById("password");
    var mrepassword= document.getElementById("repassword");
    var mdesc= document.getElementById("desc");
    var image= document.getElementById("img");


  auth.onAuthStateChanged(function (user) {
    if (user) {
        console.log("logiran "+user.uid);

        
            db.ref('/users/' + user.uid).once('value').then(function(snapshot) {
                
             
                mnameSurname.value=snapshot.val().person.nameSurname;
                memail.value=snapshot.val().person.email;
                mcapitalCatch.value=snapshot.val().person.capitalCatch;
                mfavouriteFish.value=snapshot.val().person.favouriteFish;
                mdesc.value=snapshot.val().person.desc;


              /* s */
              });

          
        // User is signed in.
        
    } else {
        // User is signed out.
        console.log("izvrsih se");
        window.location.replace("index.html");
    }
});

function save(){

    console.log(firebase.auth().currentUser.uid);

    if((memail.value=="" || mpassword.value=="" || mrepassword.value=="" || mdesc.value=="" || mnameSurname.value=="" || mcapitalCatch.value=="" || mfavouriteFish.value=="")){alert("Please enter all data.");return;}
    if(mpassword.value.localeCompare(mrepassword.value)){alert("Passwords are not same");return;}
    if(mdesc.value.length<2){alert("Please write minimum 20 characters about yourself.");return;}

    var user = auth.currentUser;

    user.updateEmail(memail.value).then(function() {
        // Update successful.
        console.log("mail updated");

        user.updatePassword(mpassword.value).then(function() {
            // Update successful.
            console.log("pass updated");

            var person = {
                nameSurname: mnameSurname.value,
                email: memail.value,
                desc: mdesc.value,
                capitalCatch: mcapitalCatch.value,
                favouriteFish: mfavouriteFish.value,
                
              };
            
              db.ref('/users/'+user.uid).set(
                {
                    person: person
                }).then(function() {
                    console.log("Data updated");
                    alert("Updated");
                    window.location.href="home.html";
                })





          }).catch(function(error) {
            // An error happened.
            alert("Error: " + error);

          });





      }).catch(function(error) {
        // An error happened.
        alert("Error: " + error);
      });



}


function myProfile(){

}

/* 

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateUsername(username){
    return username.includes(" ")
} */