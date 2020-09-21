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


              loadPosts();
              







            // User is signed in.
            
        } else {
            // User is signed out.
            console.log("izvrsih se");
            window.location.replace("index.html");
        }
    });

    function myProfile(){
      var wantedUser = firebase.auth().currentUser.uid;
      console.log(wantedUser);
      sessionStorage.setItem("wantedUser", wantedUser);

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


      function loadPosts(){

        var ref = firebase.database().ref("posts/");

        var br=0;
        var cc=0;
        var publicPosts=[];
        ref.once('value', function(snapshot) {
          snapshot.forEach(function(childSnapshot) {

            childSnapshot.forEach(function(childData){
                  
              if(childData.val().privacy==0){
                publicPosts.push(childData.val());
              }


          

             

              })


        
      
          });
        }).then(function d(){
          publicPostsNo=publicPosts.length;
          if(publicPostsNo<=9){
            for(cc=0;cc<publicPostsNo;cc++){
              var imagea= document.getElementById("img"+(cc+1));
                   imagea.setAttribute("src",publicPosts[cc].link);
              var  desca= document.getElementById("desc"+(cc+1));
                   desca.innerHTML=publicPosts[cc].description;
            }
          }

          else{

            var arr = [];
           while(arr.length < 9){
                var r = getRandom(publicPostsNo);
                if(arr.indexOf(r) === -1) arr.push(r);
              }
          console.log("ard "+arr);


            for(cc=0; cc<9; cc++){
              var imagea= document.getElementById("img"+(cc+1));
                  imagea.setAttribute("src",publicPosts[arr[cc]].link);
              var  desca= document.getElementById("desc"+(cc+1));
                   desca.innerHTML=publicPosts[arr[cc]].description;

            }

          }


        });

        
        

       
        
      }

      function getRandom(a){
        return Math.floor(Math.random() * a);
      }
        



      function visitProfile(from){

        var src = document.getElementById(from).src;
        console.log(src);

        var ref = firebase.database().ref("posts/");

        ref.once('value', function(snapshot) {
          snapshot.forEach(function(childSnapshot) {

            childSnapshot.forEach(function(childData){
                  
              if(childData.val().link==src){
                console.log("evo ga" +JSON.stringify(childSnapshot.key));
                var wantedUser = childSnapshot.key;
                sessionStorage.setItem("wantedUser", wantedUser);
                window.location.href="myprofile.html";
              }
              


          

             

              })


        
      
          });
        })


      }


    
  


  