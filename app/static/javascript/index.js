var user_id;
function do_login() 
{
  var login={};
  login.email = $('#email').val();
  login.password = $('#pwd').val();

  var data = {
    email: login.email,
    password: login.password
  };

  $.ajax({
    method: "POST",
    url: "/",
    data: data,
    success: function(res) {
      console.log(res);
      $.cookie("user", res);
      if(res.check == 1)
      {
      	user_id = res.user_id;
      	localStorage.setItem('user_id',user_id);
      	window.location.href = "/home" + user_id;       
        //user_id = res.user_id;
        console.log(user_id);
      }
      else
      {
        alert(res.msg);
      }
      // window.location.href = "/home";
      append(res);
    },
    error: function(err) {
      console.log(err);
    }
  });
}

function dosignup() 
{
  var data={};
  
  data.firstname = $('#firstname').val();
  data.lastname = $('#lastname').val();
  data.username = $('#username').val();
  data.email = $('#email_signup').val();
  data.pwd = $('#pwd_signup').val();
  data.day = $('#day :selected').val();
  data.month = $('#month :selected').val();
  data.year = $('#year :selected').val();
  data.sex = $('.opt-gender:checked').attr('id');
  data.country = $('#countries :selected').val();
  data.descp = $('#descp').val();
  // data.cpwd = ;

  if(data.pwd !== $('#cpwd_signup').val()) {
    console.log("Password do not match");
    // alert("password do not match");
  }
  else {
    var data_JSON = JSON.stringify(data);
    console.log(data.sex, data.country);
    $.ajax({
      method: "POST",
      url: "/signup",
      data: data,
      success: function(res) {
        console.log(res);
        $.cookie("user", res);
        window.location.href = "/";
        alert("Account Successfully created Now login");
        // append(res);
      },
      error: function(err) {
        console.log(err);
      }
    });
  }

}

function append(data) {
  console.log('Appending ', data);
  for (var i = 0; i < data.questions.length; i++) { 
  d=document.createElement('div');
  $(d).addClass("new_feed")
  .html(data.questions[i])
  .wrap("<a href='#'></a>")
  .appendTo($("#feed"));
 }
}

$(document).ready(function() {
$("#checkbox span").click(function(){

  $(this).toggleClass("glyphicon glyphicon-unchecked uncheck").addClass("glyphicon glyphicon-check check");
  // $(this).css({"color":"green"})
  // $(this).addClass("glyphicon glyphicon-check")
  });

  $('#login-frm').on('submit', function(event) {
    event.preventDefault();
    console.log('Submitted');
    do_login();
  });

   $("#button3").on('click', function(event) {
    event.preventDefault();
    console.log('Submitted');
    dosignup();
  });

    $('body').on("click touchstart", "#Button1", function(e){
      e.preventDefault();
      logSignUp();
    });    

  function logSignUp() {
      $("#signupDiv").fadeOut("slow");
      // alert("btn1 click");

      $("#loginDiv").delay(650);
      $("#loginDiv").fadeIn("slow");
  }

    $('body').on("click touchstart", "#Button2", function(e){
      e.preventDefault();

      signUpLog();
    });

  function signUpLog() {
      $("#loginDiv").fadeOut("slow");
      $("#signupDiv").delay(650);
      $("#signupDiv").fadeIn("slow");
     // $("#countries").msDropdown();
   }

});
