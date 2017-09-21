var auth = firebase.auth();
var database = firebase.database().ref('/');
var flag;
var bdFlag;
var check;
var likeCheck;
var likesNum;
function printError(errorvar) {
  
  
  
    document.getElementById("md-bd1").innerHTML = errorvar;
    document.getElementById("exampleModalLabel1").innerHTML = "<b>Error</b>";
    $("#exampleModal1").modal();
  
  }
  function logout() {
    localStorage.setItem('log','0');
    location = "index.html";
  }
  
  function contact() {
  
    document.getElementById("md-bd1").innerHTML = "<b>Muhammad Salman Tariq</b></br>Facebook:<a href='https://www.facebook.com/salmaaan.khaan' target='_blank'>Salmaan Khan</a></br>Email:<a href='mailto:salmaankhaan028@gmail.com' >Send Mail</a>";
    document.getElementById("exampleModalLabel1").innerHTML = "Contact";
    $("#exampleModal1").modal();
  
  }
  
  function about() {
    document.getElementById("md-bd1").innerHTML = "<b>Developed by:</b> Muhammad Salman Tariq</br><b>With the help of: </b>Sir Haider, Sir Majid, Sir Hanzala, Sir Ali Mughal<b></br>Organisation: </b>Saylani Welfare Trust - Mobile Software Development Training, Batch 4.2";
    document.getElementById("exampleModalLabel1").innerHTML = "About Us";
    $("#exampleModal1").modal();
  }
  function checkLog(){
    if(localStorage.getItem('log')==='0'){
  
      alert("Login First")
      location = 'index.html';
  
    }
  }
function duaRender() {
  var userID;
  var userEmail;
  var userName;
    flag = false;
    bdFlag = false;
    document.getElementById("badge").style.visibility = 'hidden';
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        document.getElementById('usrname').innerHTML = user.displayName;
        userID =user.uid;
        userEmail = user.email;
        userName = user.displayName;
      } else {
        console.log("Error");
      }
    });
    database.child('post/').on("child_added", function (snapshot) {
      var demo = snapshot.val();
      demo.id = snapshot.key;
     // checkLike(demo.id);
      
      /*  var h1 = document.createElement('h4');
       var h1Text = document.createTextNode(demo.senderName);
       h1.appendChild(h1Text);
   
       var h2 = document.createElement('h6');
       var h2Text = document.createTextNode(demo.Date);
        h2.appendChild(h2Text);
   
   
        var h3 = document.createElement('h4');
       var h3Text = document.createTextNode(demo.talibDua);
        h3.appendChild(h3Text);
   
   
        var h4 = document.createElement('p');
       var h4Text = document.createTextNode(demo.Dua);
        h4.appendChild(h4Text);
   
       var hr = document.createElement('hr');
   
       var div = document.getElementById("render");
   
       div.appendChild(h1);
       div.appendChild(h2);
       div.appendChild(h3);
       div.appendChild(h4);
       div.appendChild(hr); */
  
      var card = document.createElement('div');
      card.setAttribute('class', 'card w-50 card-border d-inline-block feed-pad');
      card.setAttribute('id',demo.id);
  
      var cardHeader1 = document.createElement('div');
      cardHeader1.setAttribute('class', 'card-header');
  
      var cardHeader3 =document.createElement('h4');
      var text1 = document.createTextNode(demo.senderName);
      
      cardHeader3.appendChild(text1);
      cardHeader1.appendChild( cardHeader3);
  
      cardHeader4 = document.createElement('h6');
      var text7 = document.createTextNode(demo.Email);
      cardHeader4.setAttribute('class', 'date-clr');
      cardHeader4.appendChild(text7);
      cardHeader1.appendChild( cardHeader4);
  
  
      var cardHeader2 = document.createElement('h6');
      var text2 = document.createTextNode(demo.Date);
      cardHeader2.setAttribute('class', 'card-header date-clr');
      cardHeader2.appendChild(text2);
  
  
      var cardBody = document.createElement('div');
      cardBody.setAttribute('class', 'card-body');
  
      var cardTitle = document.createElement('h5');
      var text3 = document.createTextNode("Talib-e-Dua: " + demo.talibDua);
      cardTitle.setAttribute('class', 'card-title');
      cardTitle.appendChild(text3);
  
  
      var cardText = document.createElement('p');
      var text4 = document.createTextNode(demo.Dua);
      cardText.setAttribute('class', 'card-text');
      cardText.appendChild(text4);
  
      var br = document.createElement('br');
  
  
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      card.appendChild(cardHeader1);
      card.appendChild(cardHeader2);
      card.appendChild(cardBody);

      var hr1 = document.createElement("hr");
      card.appendChild(hr1);
     
      var likes= document.createElement('div');
      likes.setAttribute('class', 'card-body like-pad');
  
      var likeBtn = document.createElement('button');
      likeBtn.setAttribute('class','btn btn-outline-primary');
      var likeText = document.createTextNode('Like ');
      likeBtn.onclick=function(){
            likePost(demo.id);
      };
      likeBtn.appendChild(likeText);
      var likeSpan = document.createElement('span');
      likeSpan.setAttribute('class','badge badge-secondary');
      
     // likesCount(demo.id);
      setTimeout(function() {
        
      //  console.log(likesNum);
   
       
          var spanText = document.createTextNode("0");
          likeSpan.appendChild(spanText);
        likeBtn.appendChild(likeSpan);

        var showLikes =  document.createElement('button');
        var showLikesText = document.createTextNode('Show Likes ');
        showLikes.setAttribute('class','btn btn-warning showLikes-pad');
        showLikes.appendChild(showLikesText);
        showLikes.onclick = function(){
          getLikes(demo.id);
        };
        likes.appendChild(likeBtn);
        likes.appendChild(showLikes);

        card.appendChild(likes);
        var hr3 =document.createElement('hr');
        card.appendChild(hr3);



        var formInline = document.createElement('div');
    formInline.setAttribute('class','form-inline');
   
        var comment = document.createElement('div');
        comment.setAttribute('class','card-body');

        var commentBox = document.createElement('input');
        commentBox.setAttribute('type','text');
         commentBox.setAttribute('id','comment'+demo.id);
        commentBox.setAttribute('class','form-control comment-input-widht');
        commentBox.setAttribute('placeholder','Write a comment');

        var commentButton =document.createElement('a');
        commentButton.setAttribute('class','btn btn-success commnt-btn'); 
         
        var btnText = document.createTextNode("Comment");
         commentButton.onclick = function () { 
           
          commentPost(demo.id,userID,e=userEmail,userName)}
        commentButton.appendChild(btnText);

        comment.appendChild(commentBox);
        comment.appendChild(commentButton);
        formInline.appendChild(comment);

        card.appendChild(formInline);

        var lastDiv = document.createElement("div");
        lastDiv.setAttribute('class','card-body');

         card.appendChild(lastDiv);
        
        

      var div = document.getElementById("render");
      /* div.appendChild(card); */
      div.insertBefore(card, div.childNodes[0]);
      div.insertBefore(br, div.childNodes[1]);
      if (flag == true) {
  
        bdFlag = true;
      }
      }, 1000);
      
  
    })

    database.child('likes/').on("child_added", function (snapshot) {
        var demo = snapshot.val();
        demo.id = snapshot.key;
        var e = document.getElementById(demo.pid);
        var p = e.getElementsByTagName("span");
        var a = parseInt(p[0].innerHTML);
        a=a+1;
        p[0].innerHTML=a;
        
        console.log(a);
    })

    database.child('likes/').on("child_removed", function (rem) {
        var demo = rem.val();
        demo.id = rem.key;
        var e = document.getElementById(demo.pid);
        var p = e.getElementsByTagName("span");
        var a = parseInt(p[0].innerHTML);
        a=a-1;
        p[0].innerHTML=a;
        
        console.log(a);
      
    
        })
    setTimeout(setFlag, 10000);
  
    setCount(0);
    commentRender();
  }
  setInterval(setBadge, 2000);
  function setBadge() {
    if (bdFlag == true) {
      var snd = new Audio("audio/notify.mp3");
      snd.play();
      $(".alert").alert()
      document.getElementById("badge").style.visibility = 'visible';
      setTimeout(setBadgeTime, 10000);
      bdFlag = false;
    }
  }
  function setBadgeTime() {
    document.getElementById("badge").style.visibility = 'hidden';
    return;
  }
  function setFlag() {
    if (flag == false) {
  
      flag = true;
    }
  
    return;
  }

  function abc(){
      
    setTimeout(x= function () {
        return checkLike2(userID, postID);
       
      }, 1000)
  }

function checkLike(postID){
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
         userID = user.uid;
         
        } else {
          console.log("Error");
        }
      });

      
      setTimeout( function () {
         checkLike2(userID, postID);
       
      }, 1000)

     
     
    
}
function checkLike2(userID,postID){
    var check=false;
    database.child('likes/').on("child_added", function (snapshot) {
        var demo = snapshot.val();
        demo.id = snapshot.key;

        if(demo.uid === userID && demo.pid === postID){
            check = true;
        }


    });
    
    setTimeout(function () {
      checkLike3(userID, postID, check);
       
      }, 2000)


    
    
}
function checkLike3(userID,postID,check){
    console.log("sss")
  if(check==true){
    likeCheck = true;
  }
  else{
    likeCheck =false;
  }
    
}
  function likePost(postID){
      var userID;
      var username;
      var email;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
         userID = user.uid;
         username=user.displayName;
         email = user.email;
        } else {
          console.log("Error");
        }
      });
      setTimeout(function () {
        likePost2(userID, postID, username, email);
      }, 0000)
    
    
    
  }

  function likePost2(userID, postID, username, email){
    var likeFlag=false;
    database.child('likes/').on("child_added", function (snapshot) {
        var demo = snapshot.val();
        demo.id = snapshot.key;

        if(demo.uid === userID && demo.pid === postID){
            likeFlag = true;
        }


    });
    setTimeout(function () {
        likePost3(userID, postID, username, email,likeFlag);
      }, 0000)

  
      
  }

  function likePost3(userID, postID, username, email,likeFlag){
    if(likeFlag===true){
        delLike(postID,userID);
    }
    else{
        likeObj = {

            uid : userID,
            pid : postID,
            Email : email,
            User : username
        }
       
        database.child('likes').push(likeObj);
        var a = document.getElementById(postID);
        var b = a.getElementsByTagName('button');
        var c = b[0].firstChild;
        var textnode = document.createTextNode("Unlike ");
        console.log(b[0].firstChild);
        b[0].replaceChild(textnode, c);

        var x = a.getElementsByClassName('card-body');
        var y = x[1];
        y.childNodes[0].setAttribute('class','btn btn-primary');
        y.childNodes[0].onclick=function(){
          delLike(postID,userID);
    };



    }

  }

  function likesCount(postID){
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
         userID = user.uid;
         
         likesCount2(userID, postID);
        } else {
          console.log("Error");
        }
      });
     
      
    
    
  }

  function likesCount2(userID, postID){
      console.log(userID);
      console.log(postID);
    var count=0;
    database.child('likes/').on("child_added", function (snapshot) {
        var demo = snapshot.val();
        demo.id = snapshot.key;

        if(demo.pid === postID ){
            count++;
           
        }
    })
    setTimeout(function() {
        likesCount3(userID,postID,count);
    }, 1000);
    
        
        
   
  }

  function likesCount3(userID,postID,count){
   
      likesNum=count;

      console.log(likesNum);

  }

  function setCount(){
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
         userID = user.uid;
         setTimeout(function() {
            setCount2(userID);
         }, 7000);
        
        } else {
          console.log("Error");
        }
      });
  }

  function setCount2(userID){
    
  var ids = document.getElementsByClassName("card");
  var abc = [];

  for(var i=0;i<ids.length;i++){
      abc.push(ids[i].getAttribute('id'));
      

  }


    
    database.child('likes/').once('value').then(function(snapshot) {
        snapshot.forEach(function(userSnapshot) {
         var   demo = userSnapshot.val();
          
        var postID = demo.pid;
       
        
        var a = document.getElementById(postID);
        if(a==null){

        }
        else{

       
        var p = a.getElementsByTagName("span");
        var a = parseInt(p[0].innerHTML);
        a=a+1;
        p[0].innerHTML=a;
      }
      
       // console.log(demo);
        
      
    });
   
   // console.log(count);
});

database.child('likes/').once('value').then(function(snapshot) {
    snapshot.forEach(function(userSnapshot) {
       
     var   demo = userSnapshot.val();
     console.log(abc.length);
      for(var j=0;j<abc.length;j++){

      
    var postID = abc[j];
    var uID = demo.uid;
    var pID = demo.pid;
   
    if(userID===uID && postID===pID){
        
        var a = document.getElementById(postID);
        var b = a.getElementsByTagName('button');
        var c = b[0].firstChild;
        var textnode = document.createTextNode("Unlike ");
        
       
        b[0].replaceChild(textnode, c);

        var x = a.getElementsByClassName('card-body');
        var y = x[1];
        y.childNodes[0].setAttribute('class','btn btn-primary');

    }

}
   // console.log(demo);
    

});

// console.log(count);
});

       

    }
   
  

  function setCount3(userID,postID){
   
  }

  function commentPost(postID,userID,email,username){
    var commentText = document.getElementById("comment"+postID).value;
   

    var commentObj = {
      comment : commentText,
      pid : postID,
      uid : userID,
      Email : email,
      user : username
    }
    database.child('comments/').push(commentObj)
    .then(function(){

    commentText .value="";
      
    });

    

  }

  function delLike(postID,userID){
    var arr1=[];
    var arr2=[];
    var id;
    
    database.child('likes/').orderByChild('pid').equalTo(postID).on("value", function(snapshot) {
      console.log(snapshot.val());
      snapshot.forEach(function(data) {
         /*  console.log(data.key); */
         arr1.push(data.key);

      });
  });
  database.child('likes/').orderByChild('uid').equalTo(userID).on("value", function(snapshot) {
    console.log(snapshot.val());
    snapshot.forEach(function(data) {
       /*  console.log(data.key); */
       arr2.push(data.key);

    });
});

var z = arr1.filter(function(val) {
  return arr2.indexOf(val) != -1;
});

database.child('likes/'+z[0]).remove();

var a = document.getElementById(postID);
var b = a.getElementsByTagName('button');
var c = b[0].firstChild;
var textnode = document.createTextNode("Like ");
console.log(b[0].firstChild);
b[0].replaceChild(textnode, c);

var x = a.getElementsByClassName('card-body');
var y = x[1];
y.childNodes[0].setAttribute('class','btn btn-outline-primary');
y.childNodes[0].onclick=function(){
  likePost(postID);

  }
}

 

  function commentRender(){
    setTimeout(function() {
      commentRender2();
    }, 6000);
  }
  function commentRender2(){

        database.child('comments/').on("child_added", function (snapshot) {
        var demo = snapshot.val();
        demo.id = snapshot.key;

        var postID = demo.pid;
        var a = document.getElementById(postID);
        if(a==null){}else{
        var b = a.lastChild;
        var c = document.createElement('h6');
        var cText = document.createTextNode(demo.user);
        c.appendChild(cText);

        var d =  document.createElement('p');
        var dText = document.createTextNode(demo.comment);
        d.appendChild(dText);
          var x = document.createElement('span');
         /*  var xtext = document.createTextNode("&times;");
          x.appendChild(xtext); */
          x.innerHTML = "&times;"
          var y = document.createElement('button');
          y.setAttribute('class','close');
          y.setAttribute('type','button');
          y.onclick=function(){
            deleteComment(demo.id);
          }
          var hr4 = document.createElement('hr');
          var z= document.createElement('div');
          z.setAttribute('id',demo.id);
          y.appendChild(x);
          z.appendChild(y);
        z.appendChild(c);
         z.appendChild(d);
         z.appendChild(hr4);
         b.appendChild(z);

         }
        
        


        })

  }

  function deleteComment(commentID){
    var userID;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
       
        userID =user.uid;
       
        
      } else {
        console.log("Error");
      }
    });

    setTimeout(function() {
      deleteComment2(commentID,userID);
    }, 1000);
  }

  function deleteComment2(commentID,userID){
    database.child('comments/'+commentID).once('value').then(function(snapshot) {
      
       var   demo = snapshot.val();

       if(demo.uid===userID){
        database.child('comments/'+commentID).remove();
        var a = document.getElementById(commentID);
        a.remove();
       }
       else{
         printError('Failed to delete, this comment was not posted by you');
       }

    })
      
  }

  function getLikes(postID){
    var render = document.getElementById('md-bd2');
    render.innerHTML = "";
    database.child('likes/').once('value').then(function(snapshot) {
      snapshot.forEach(function(userSnapshot) {
       var   demo = userSnapshot.val();
        
       if(demo.pid===postID){
        var li = document.createElement('li');
        var h5= document.createElement('h5');
        var h5text = document.createTextNode(demo.User);
        h5.appendChild(h5text);

        var h6= document.createElement('h6');
        var h6text = document.createTextNode(demo.Email);
        h6.setAttribute('class','date-clr')
        h6.appendChild(h6text);


        var hr = document.createElement('hr');

        li.appendChild(h5);
        li.appendChild(h6);
        li.appendChild(hr);

        render.appendChild(li);

       }

  });

});

setTimeout(function() {
  getLikes2();
}, 500);


  }
  function getLikes2(){
    $("#exampleModal2").modal();

  }