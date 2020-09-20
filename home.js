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

            var fullName= document.getElementById("fullName");
            var email= document.getElementById("email");
            var capitalCatch= document.getElementById("capitalCatch");
            var favFish= document.getElementById("favFish");
            var des=document.getElementById("description");

            

            var persona;
            db.ref('/users/' + user.uid).once('value').then(function(snapshot) {
                persona=snapshot.val().person;
                console.log(persona);
                fullName.innerHTML=snapshot.val().person.nameSurname;
                email.innerHTML=snapshot.val().person.email;
                capitalCatch.innerHTML=snapshot.val().person.capitalCatch;
                favFish.innerHTML=snapshot.val().person.favouriteFish;
                des.innerHTML=snapshot.val().person.desc;
              });


              







            // User is signed in.
            
        } else {
            // User is signed out.
            console.log("izvrsih se");
            window.location.replace("index.html");
        }
    });

    function myProfile(){

      window.location.href="myprofile.html";
    }


    function signOut(){
        auth.signOut();
        alert("Signed out");
      }


    
      function settings(){


        window.location.href="settings.html";
      }


      function listBtn(){
        document.getElementById('divPost1').setAttribute('class', 'col-md-7 border');
        document.getElementById('divPost2').setAttribute('class', 'col-md-7 border');
        document.getElementById('divPost3').setAttribute('class', 'col-md-7 border');
        document.getElementById('divPost4').setAttribute('class', 'col-md-7 border');
        document.getElementById('divPost5').setAttribute('class', 'col-md-7 border');
        document.getElementById('divPost6').setAttribute('class', 'col-md-7 border');
        document.getElementById('divPost7').setAttribute('class', 'col-md-7 border');
        document.getElementById('divPost8').setAttribute('class', 'col-md-7 border');
        document.getElementById('divPost9').setAttribute('class', 'col-md-7 border');
      }

      function gridBtn(){
        document.getElementById('divPost1').setAttribute('class', 'col-md-3 border');
        document.getElementById('divPost2').setAttribute('class', 'col-md-3 border');
        document.getElementById('divPost3').setAttribute('class', 'col-md-3 border');
        document.getElementById('divPost4').setAttribute('class', 'col-md-3 border');
        document.getElementById('divPost5').setAttribute('class', 'col-md-3 border');
        document.getElementById('divPost6').setAttribute('class', 'col-md-3 border');
        document.getElementById('divPost7').setAttribute('class', 'col-md-3 border');
        document.getElementById('divPost8').setAttribute('class', 'col-md-3 border');
        document.getElementById('divPost9').setAttribute('class', 'col-md-3 border');
      }



    
  


  