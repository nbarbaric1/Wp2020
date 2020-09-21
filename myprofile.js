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



        var uid= auth.currentUser.uid;

        if(image.files.length===0 || !image.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)){alert("Please upload profile photo."); return;}
        if(imgDesc.value==0){alert("Please write description."); return;}
        if(radio1.checked){privacy=uid;}
        if(radio2.checked){privacy=0;}
        

        var image= document.getElementById("img").files[0];
        
        var postName= uid+"_" + Date.parse( new Date());
        var ext=image.name.split('.').pop();
        



        storageRef.child("posts/"+postName+"."+ext).put(image).then(function d(){

          storageRef.child("posts/"+postName+"."+ext).getDownloadURL().then(function(url) {
            
              

              db.ref('/posts/'+uid+'/'+postName).set(
                {
                    description: imgDesc.value,
                    link: url,
                    privacy: privacy
                }
            )
            .then(function g(){
               alert("Uploaded successfully");
            }).catch(e=>alert(e.message));

          }).catch(e=>alert(e.message));

        
       


          
      }).catch(e=>alert(e.message));
      }

      

      function loadPosts(){

        var ref = firebase.database().ref("posts/"+auth.currentUser.uid);

        var br=0;
        ref.once('value', function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            br++;
            
            var childData = childSnapshot.val();
            console.log("this is;"+childData.link);

            var imagea= document.getElementById("img"+br);
        imagea.setAttribute("src",childData.link);

         

            // ...
          });
        });

       
        
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


      function modalImg(from) {
        console.log("modal");
        var src      = document.getElementById(from).src;
        document.getElementById("img10").src = src;
      }
        






      

    
  


  