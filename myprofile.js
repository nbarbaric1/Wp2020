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
  var wantedUser = sessionStorage.getItem("wantedUser");
  console.log("wanted:"+wantedUser);
  var div1= document.getElementById("fileDiv");
  var div2= document.getElementById("descDiv");
  var div3= document.getElementById("privacyDiv");

  


    auth.onAuthStateChanged(function (user) {
        if (user) {
            console.log("logiran "+user.uid);

            

            var fullName= document.getElementById("fullName");
            var email= document.getElementById("email");
            var capitalCatch= document.getElementById("capitalCatch");
            var favFish= document.getElementById("favFish");
            var des=document.getElementById("description");


      if(user.uid==wantedUser){

            

            

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

              loadMyPosts();
      }

      else{

        div1.style.display = "none";
        div2.style.display = "none";
        div3.style.display = "none";

        for(var z=0; z<9;z++){
          document.getElementById("deleteBtn"+(z+1)).style.display = "none";
          document.getElementById("editBtn"+(z+1)).style.display = "none";
        }

        var persona;
            db.ref('/users/' + wantedUser).once('value').then(function(snapshot) {
                persona=snapshot.val().person;
                console.log(persona);
                fullName.innerHTML=snapshot.val().person.nameSurname;
                email.innerHTML=snapshot.val().person.email;
                capitalCatch.innerHTML=snapshot.val().person.capitalCatch;
                favFish.innerHTML=snapshot.val().person.favouriteFish;
                des.innerHTML=snapshot.val().person.desc;
              });

              loadTheirPosts();

      }

              







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
        if(radio1.checked){privacy=1;}
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
               window.location.href="home.html";
            }).catch(e=>alert(e.message));

          }).catch(e=>alert(e.message));

        
       


          
      }).catch(e=>alert(e.message));
      }

      

      function loadMyPosts(){

        var ref = firebase.database().ref("posts/"+auth.currentUser.uid);

        var br=0;
        ref.once('value', function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            br++;
            
            var childData = childSnapshot.val();
            console.log("this is;"+childData.link);

            var imagea= document.getElementById("img"+br);
        imagea.setAttribute("src",childData.link);

        var  desca= document.getElementById("desc"+br);
                   desca.innerHTML=childData.description;



         

            // ...
          });
        }).then(function d(){
          for(var g=br; g<9;g++){
            document.getElementById("deleteBtn"+(g+1)).style.display = "none";
            document.getElementById("editBtn"+(g+1)).style.display = "none";
         }
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

      





      function loadTheirPosts(){

        var ref = firebase.database().ref("posts/"+wantedUser);

        var br=0;
        var cc=0;
        var publicPosts=[];
        ref.once('value', function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            console.log("ovdje smo sad:" + childSnapshot.val().link);

            if(childSnapshot.val().privacy==0){
              publicPosts.push(childSnapshot.val());
            }

            


        
      
          });
        }).then(function d(){
          publicPostsNo=publicPosts.length;
          console.log("publicposts:"+JSON.stringify(publicPostsNo));
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
        
      function deleteImage(from){

        var src = document.getElementById(from).src;
        console.log("ovo je:" +src);

        var ref = firebase.database().ref("posts/"+firebase.auth().currentUser.uid);

        ref.once('value', function(snapshot) {
          snapshot.forEach(function(childSnapshot) {

            childSnapshot.forEach(function(childData){
              if(childSnapshot.val().link==src){
                console.log("evo ga" +JSON.stringify(childSnapshot.key));
                ref.child(childSnapshot.key).remove().then(function d(){ window.location.href="myprofile.html"; }).catch(e=>alert(e.message));
                
              }
              


          

             

              })


        
      
          });
        })


      }

      function editImage(from){

        var text = document.getElementById("desc"+from).innerHTML;
        var div = document.getElementById("divPost"+from);
        var btn= document.getElementById("editBtn"+from);
        console.log("ovo je:" +text);
        var x = document.createElement("INPUT");
        x.setAttribute("type", "text");
        div.appendChild(x);
        x.setAttribute("value", text);
        btn.disabled=true;
        var btnSave = document.createElement("BUTTON");   // Create a <button> element
        btnSave.innerHTML = "Save";                   // Insert text
        div.appendChild(btnSave);
        btnSave.onclick=function(){myScript(from, x.value);}
        
        btnSave.disabled=false;




      }

      function myScript(from,text){

        
        console.log("AUSTRIJA");
        var src = document.getElementById("img"+from).src;
        var ref = firebase.database().ref("posts/"+firebase.auth().currentUser.uid);

        ref.once('value', function(snapshot) {
          snapshot.forEach(function(childSnapshot) {

            childSnapshot.forEach(function(childData){
              if(childSnapshot.val().link==src){
                console.log("evo ga" +JSON.stringify(childSnapshot.key));
                ref.child(childSnapshot.key).update({'description': text});
                //ref.child(childSnapshot.key).remove().then(function d(){ window.location.href="myprofile.html"; }).catch(e=>alert(e.message));
                
              }
              


          

             

              })


        
      
          });
        })
      }




      

    
  


  