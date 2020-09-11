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

    function homePage(){

      window.location.href="home.html";
    }


    function signOut(){
        auth.signOut();
        alert("Signed out");
      }


    
      function settings(){


        window.location.href="settings.html";
      }



      function uploadPost(){
        var image= document.getElementById("img");
        var imgDesc=document.getElementById("imgDesc");
        var radio1=document.getElementById("radio1");
        var radio2=document.getElementById("radio2");
        var privacy;





        if(image.files.length===0 || !image.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)){alert("Please upload profile photo."); return;}
        if(imgDesc.value==0){alert("Please write description."); return;}
        if(radio1.checked){privacy=1;}
        if(radio2.checked){privacy=0;}
        

        var image= document.getElementById("img").files[0];
        var uid= auth.currentUser.uid;
        
        storageRef.child("posts/"+uid).put(image);






      }

    
  


  