function do_login() 
{
  var login={};
  login.email = $('#email').val();
  login.password = $('#pwd').val();

  var login_JSON = JSON.stringify(login);
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
      // $.cookie("user", res);
       window.location.href = "/home";
      // append(res);
    },
    error: function(err) {
      console.log(err);
    }
  });
}

function do_signup() 
{
  var data={};
  var sex=document.getElementsByName('optradio');
  var sex_value;
  for(var i = 0; i < sex.length; i++){
    if(sex[i].checked){
        sex_value = sex[i].value;
    } 
  }
  window.location.href = "/home";
  alert(sex_value);


//   data.firstname = $('#firstname').val();
//   data.lastname = $('#lastname').val();
//   data.username = $('#username').val();
//   data.email = $('#email_signup').val();
//   data.pwd = $('#pwd_signup').val();
//   data.day = $('#day').val();
//   data.month = $('#month').val();
//   data.year = $('#year').val();
//   data.sex= sex_value;
//   data.coutries = $('#countries').val();
//   data.descp = $('#descp').val();
  
//   if(pwd!=$('#cpwd_signup').val())
//   {
//       alert("password do not match");
//   }
//   else{


  
//   var data_JSON = JSON.stringify(data);
//   $.ajax({
//     method: "POST",
//     url: "/signup",
//     data: data,
//     success: function(res) {
//       console.log(res);
//       $.cookie("user", res);
//       window.location.href = "/home";
//       // append(res);
//     },
//     error: function(err) {
//       console.log(err);
//     }
//   });
// }

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


  
  // $('#login-frm').on('submit', function(event) {
  //   event.preventDefault();
  //   console.log('Submitted');
  //   do_login();
  // });

  $('#signup-frm').on('submit', function(event) {
    event.preventDefault();
    console.log('Submitted');
    do_signup();
  });



  $('body').on("click touchstart", "#Button1", function(e){
    $("#signupDiv").fadeOut("slow");
    // alert("btn1 click");
    $("#loginDiv").delay(650);
    $("#loginDiv").fadeIn("slow");
  });

  $('body').on("click touchstart", "#Button2", function(e){
    $("#loginDiv").fadeOut("slow");
    $("#signupDiv").delay(650);
    $("#signupDiv").fadeIn("slow");
    // $("#countries").msDropdown();
  });

});
