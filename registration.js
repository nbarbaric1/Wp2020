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




  function signUp(email,password,desc,username){


        auth.createUserWithEmailAndPassword(email, password).then(function d(){
                                                                    alert("registritrano");
                                                                    
                                                                    db.ref('/users/'+auth.currentUser.uid).set(
                                                                        {
                                                                            email: email,
                                                                            username: username,
                                                                            description: desc
                                                                        }
                                                                    )
                                                                
                                                                
                                                                
                                                                })
        
        
        .catch(e=> alert(e.message));



        




  } 

 


function register(){
    
    var email= document.getElementById("email").value;
    var username= document.getElementById("username").value;
    var password= document.getElementById("password").value;
    var repassword= document.getElementById("repassword").value;
    var desc= document.getElementById("desc").value;

   /*  if(!validateEmail(email)){alert("Please enter a valid email.");}
    if(!validateUsername(username)){alert("Username must have a length between 3-20 characters and can contain only letters (a-z) and numbers")}
 */ 
    if((email=="" || username=="" || password=="" || repassword=="" || desc=="")){alert("Please enter all data.");return;}
    if(password.localeCompare(repassword)){alert("Passwords are not same");return;}
    if(desc.length<2){alert("Please write minimum 20 characters about yourself.");return;}

    signUp(email,password,desc,username);
    



}




function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateUsername(username){
    return username.includes(" ")
}