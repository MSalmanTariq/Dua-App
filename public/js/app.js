var auth = firebase.auth();
var database = firebase.database().ref('/');
var flag;
var bdFlag;

 
function login() {
  var email = document.getElementById("email1").value;


  var pass = document.getElementById("pass1").value;

  firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(function (result) {
      console.log(result);

      localStorage.setItem("log", "1");
      var uId = auth.currentUser.uid;
      localStorage.setItem("uId", uId);




      location = "home.html";
      /* window.open("home.html", "_self"); */
      /*    alert("Login successful"); */
    })


    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      errorvar = errorCode + " " + errorMessage;
      printError(errorvar);

      console.log(errorCode + " " + errorMessage);
      passwordInput.value = "";
      // ...
    });

}
function printError(errorvar) {



  document.getElementById("md-bd1").innerHTML = errorvar;
  document.getElementById("exampleModalLabel1").innerHTML = "<b>Error</b>";
  $("#exampleModal1").modal();

}
function signUp() {

  var email = document.getElementById("email").value;


  var pass = document.getElementById("pass").value;
  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;
  var usrname = fname + " " + lname;
  var age = document.getElementById("age").value;
  var cell = document.getElementById("cell").value;
  if (email === "" || pass === "" || fname === "" || lname === "" || age === "" || cell === "") {
    pass = " ";
    printError("All fields are required");

    return;
  }

  var gender;
  if (document.getElementById('Male').checked) {
    gender = "male";
  }
  else if (document.getElementById('Female').checked) {
    gender = "female";
  }


  firebase.auth().createUserWithEmailAndPassword(email, pass)


    .then(function (result) {

      return result.updateProfile({ displayName: usrname })
        .then(function () {
          console.log(result);
          var uId = auth.currentUser.uid;

          dbinput(fname, lname, age, gender, cell, uId, email);

        })


    })

    .catch(function (error) {

      var errorCode = error.code;
      var errorMessage = error.message;
      errorvar = errorCode + " " + errorMessage;
      printError(errorvar);

      console.log(errorCode + " " + errorMessage);
      passwordInput.value = "";



    });



}

function dbinput(fname, lname, age, gender, cell, uId, email) {


  var obj = {

    firstName: fname,
    lastName: lname,
    Age: age,
    Gender: gender,
    cellNumber: cell,
    Email: email

  }

  database.child('user/' + uId).push(obj);
  localStorage.setItem("uId", uId);
  setTimeout(goHome, 2000);

}

function goHome() {
  location = "home.html";

}
function checkLog(){
  if(localStorage.getItem('log')==='0'){

    alert("Login First")
    location = 'index.html';

  }
}

function homePage() {
  localStorage.setItem('log','1');
  //nav bar name printing
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      document.getElementById('usrname').innerHTML = user.displayName;
    } else {
      console.log("Error");
    }
  });


  database.child('user/' + localStorage.getItem("uId") + "").on("child_added", function (snapshot) {
    var demo = snapshot.val();
    demo.id = snapshot.key;

    document.getElementById("1").innerHTML = demo.firstName + " " + demo.lastName;
    localStorage.setItem('usrname', demo.firstName + " " + demo.lastName);
    document.getElementById("2").innerHTML = demo.Email;
    document.getElementById("3").innerHTML = "Age: " + demo.Age;
    document.getElementById("4").innerHTML = "Gender: " + demo.Gender;

    document.getElementById("5").innerHTML = "Phone#: " + demo.cellNumber;



  })
}

function submit() {
  var username;
  var uId;
  var email;
  var talib = document.getElementById("input1").value;
  var dua = document.getElementById("input2").value;
  if (talib === "" || dua === "") {
    printError("All feilds are required");
    return;
  }
  var date = Date();
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      username = user.displayName;
      uId = user.uid;
      email=user.email;
    } else {
      console.log("Error");
    }
  });

  setTimeout(function () {
    submitFeed(username, talib, dua, date, uId,email);
  }, 2000)
}
function submitFeed(username, talib, dua, date, uId,email) {
  var obj2 = {
    senderName: username,
    talibDua: talib,
    Dua: dua,
    Date: date,
    uid: uId,
    Email:email

  }
  database.child('post/').push(obj2);
  location = "feeds.html";
}


function duaRender() {
  flag = false;
  bdFlag = false;
  document.getElementById("badge").style.visibility = 'hidden';
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      document.getElementById('usrname').innerHTML = user.displayName;
    } else {
      console.log("Error");
    }
  });
  database.child('post/').on("child_added", function (snapshot) {
    var demo = snapshot.val();
    demo.id = snapshot.key;

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

    var div = document.getElementById("render");
    div.appendChild(card);
    div.appendChild(br);
    if (flag == true) {

      bdFlag = true;
    }

  })
  setTimeout(setFlag, 6000);


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

function myFeeds() {
  var uId;
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      document.getElementById('usrname').innerHTML = user.displayName;
      uId = user.uid;
      console.log(user);
      console.log(user.uid);
      console.log(uId);
    } else {
      console.log("Error");
    }
  });
  setTimeout(function () {
    myFeedsRetrive(uId);
  }, 2000)
}



function myFeedsRetrive(uId) {

  database.child('post/').on("child_added", function (snapshot) {
    var demo = snapshot.val();
    demo.id = snapshot.key;
    if (demo.uid === uId) {

      console.log(demo.uid);
      console.log(demo.id);



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
      card.setAttribute('class', 'card w-50 card-border d-inline-block feed-pad ');
      card.setAttribute('id', demo.id);

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

      var editBtn = document.createElement('a');
      editBtn.setAttribute('href', '#');
      editBtn.setAttribute('class', 'btn btn-warning float-right edtbtn');
      var text5 = document.createTextNode('Edit');
      editBtn.onclick = function () { edit(demo.id, demo.talibDua, demo.Dua) }
      editBtn.appendChild(text5);


      var deleteBtn = document.createElement('a');
      deleteBtn.setAttribute('href', '#');
      deleteBtn.setAttribute('class', 'btn btn-danger float-right delbtn');
      var text6 = document.createTextNode('Delete');
      deleteBtn.onclick = function () { remove(demo.id) }
      deleteBtn.appendChild(text6);

      var br2 = document.createElement('br');

      var br = document.createElement('br');


      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      cardBody.appendChild(deleteBtn);
      cardBody.appendChild(editBtn);
      cardBody.appendChild(br2);


      card.appendChild(cardHeader1);
      card.appendChild(cardHeader2);
      card.appendChild(cardBody);

      var div = document.getElementById("render");
      div.insertBefore(card, div.childNodes[0]);
      div.insertBefore(br, div.childNodes[1]);
    /*   div.appendChild(card);
      div.appendChild(br); */

    }
  })

}
function remove(key) {
  database.child('post/' + key).remove();
  var deleteobj = document.getElementById(key);
  deleteobj.remove();
}

var keyTemp;
function edit(key, item1, item2) {
  document.getElementById("input1").value = item1;
  document.getElementById("input2").value = item2;
  keyTemp = key;

  $("#exampleModal2").modal();
}
function changes() {
  var input1 = document.getElementById("input1").value;
  var input2 = document.getElementById("input2").value;
  if(input1===""||input2===""){
    printError("Unable to change feed, all fields are required");
    
        return;
  }
  var obj = {
    talibDua: input1,
    Dua: input2
  }

  database.child('post/' + keyTemp).update(obj);
  console.log("keytemp " + keyTemp);
  location = "myfeed.html";
  /* setTimeout(setlocation,2000); */


}
function setlocation() {

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