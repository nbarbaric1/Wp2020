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





  function signUp(person, pass){


        auth.createUserWithEmailAndPassword(person.email, pass).then(function d(){
                                                                    alert("registritrano");
                                                                    var image= document.getElementById("img").files[0];
                                                                    var uid= auth.currentUser.uid;

                                                                    storageRef.child("profilePhotos/"+auth.currentUser.uid).put(image).then(function e(){

                                                                        
                                                            
                                                                        db.ref('/users/'+uid).set(
                                                                            {
                                                                                person: person
                                                                            }
                                                                        )
                                                                        .then(function g(){
                                                                           window.location.replace("index.html");
                                                                        })



                                                                    })
                                                                    
                                                                    
                                                                    .catch(error=>alert(error));
                                                                    
                                                                    

                                                                    //

                                                                   
                                                                
                                                                
                                                                
                                                                })
        
        
        .catch(e=> alert(e.message));



        




  } 



 


function register(){
    
    var mnameSurname= document.getElementById("nameSurname").value;
    var mcapitalCatch=document.getElementById("capitalCatch").value;
    var mfavouriteFish= document.getElementById("favouriteFish").value;
    var memail= document.getElementById("email").value;
    var musername= document.getElementById("username").value;
    var mpassword= document.getElementById("password").value;
    var mrepassword= document.getElementById("repassword").value;
    var mdesc= document.getElementById("desc").value;
    var image= document.getElementById("img");

    
    console.log();

   /*  if(!validateEmail(memail)){alert("Please enter a valid email.");}
    if(!validateUsername(musername)){alert("Username must have a length between 3-20 characters and can contain only letters (a-z) and numbers")}
 */ 
    if((memail=="" || musername=="" || mpassword=="" || mrepassword=="" || mdesc=="" || mnameSurname=="" || mcapitalCatch=="" || mfavouriteFish=="")){alert("Please enter all data.");return;}
    if(mpassword.localeCompare(mrepassword)){alert("Passwords are not same");return;}
    if(mdesc.length<2){alert("Please write minimum 20 characters about yourself.");return;}
    if(image.files.length===0 || !image.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)){alert("Please upload profile photo."); return;}
   

    var person = {
        nameSurname: mnameSurname,
        email: memail,
        username: musername,
        desc: mdesc,
        capitalCatch: mcapitalCatch,
        favouriteFish: mfavouriteFish,
        photoUrl: "profilePhotos/"+image.files[0].name
        
      };

    signUp(person,mpassword);
    



}




function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateUsername(username){
    return username.includes(" ")
}