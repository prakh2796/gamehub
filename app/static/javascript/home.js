//var feed_no=0;
var feed_no=0;
var total_interest=0;
var availableTags;
function create_feed(){
	var d;	
	var dContent;
	for (var i = 0; i < 6; i++) {	
				d=document.createElement('div');
				//.html("new one"+(feed_no+1));
				//.appendTo($("#feed"));
				feed_no++;
				var hRand = Math.random();
				var heightClass = hRand > 0.65 ? 'grid-item--height2' : hRand > 0.25 ? 'grid-item--height3' : '';
				$(d).addClass("grid-item"+' '+heightClass);
				dContent=document.createElement('div');
				$(dContent).addClass('grid-item-content')
				var feed_id='feed'+(feed_no+1);
				$(dContent).attr('id',feed_id);
				//$("#"+feed_id).html("kjdsfnkja");
				
				var upper_div=document.createElement("div");
				$(upper_div).addClass('feed-div feed-upper-div');
				$(upper_div).appendTo(dContent);
									
					var feed_username=document.createElement("div");
					$(feed_username).addClass("feed-username").html("new one"+(feed_no+1));
					$(feed_username).appendTo(upper_div);
					var follow_btn=document.createElement("div");
					$(follow_btn).addClass("follow-btn")
					.html('Follow <span class="glyphicon glyphicon-plus" style="display:inline-block;font-size:15px;"></span>');
					$(follow_btn).appendTo(upper_div);
					var oImg=document.createElement("img");
					$(oImg).attr('src', '../static/images/profile-dribbble.png');
					$(oImg).attr('alt', 'profile image'); 
					$(oImg).addClass("feed-user-image");		
					$(oImg).appendTo(upper_div);
				
				var lower_div=document.createElement("div");
				$(lower_div).addClass("feed-div feed-lower-div");
				$(lower_div).appendTo(dContent);
				$(dContent).appendTo(d);
				
				var like_bar=document.createElement("div");
				$(like_bar).addClass("like-bar")
				.html('<span style=""class="glyphicon glyphicon-comment">4</span><span style="font-size:1.2em"class="glyphicon glyphicon-heart">10</span><div id="expand" class="expand_class">expand<span style="padding:3px;"class="glyphicon glyphicon-fast-forward"></span></div>');
				$(like_bar).appendTo(dContent);
				//.html("new one"+(feed_no+1)).appendTo(d);
				$('#feed').append(d).masonry( 'appended',d );
	}
	
}

$(window).load(function(){
		create_feed();		//calling of function
		event.preventDefault();
		$.ajax({
			method: "POST",
			url: "/home",
			//data: data_new,
			success: function(res) {
				console.log(res);
				var username = res.username;
				$("#user-name").html(username);
				$.cookie("user", res);
			// 	if(res.check == 1)
			// 	{
		   //  		window.location.href = "/home";
			// 	}
			// 	else
			// 	{
		   //  		alert(res.msg);
			// 	}
			 // // window.location.href = "/home";
				// append(res);
			},
			error: function(err) {
				console.log(err);
			}
  		});

  
	/* $("#more").hide();
			for (var i = 0; i < 4; i++) {	
				d=document.createElement('div');
				$(d).addClass("new_feed")
				.html("new one"+(i+1)+" asddddddddddddddddddddddddddddddddddddddddddddddddddddddddadwafafcasf")
				.wrap("<a href='#'></a>")
				.appendTo($("#feed"));
				feed_no++;
			}
	$("#more").show(); */
	
//$("#new-user").hide();
//$("#new-user").show();
});

/* 
  Description: Animates the header upon scroll
  
*/

$(function(){
  var header = $("header"),
      yOffset = 0,
      triggerPoint = 150;
  $(window).scroll(function(){
    yOffset = $(window).scrollTop();
    
    if(yOffset >= triggerPoint){
      header.addClass("minimized");
    }else{
      header.removeClass("minimized");
    }
    
  });
});




$(document).ready(function(){

	availableTags = [];
	var game_name =[];
	$("#myModal").click(function(){
			$.ajax({
			method: "POST",
			url: "/autocomplete_games",
			//data: data_new,
			success: function(res) {
				console.log(res);
				var username = res.username;
				$("#user-name").html(username);
				game_name=res.game_name;
				// console.log(game_name)
				// $.cookie("user", res);
				// availableTags=game_name;
				// console.log(availableTags)
			// 	if(res.check == 1)
			// 	{
		   //  		window.location.href = "/home";
			// 	}
			// 	else
			// 	{
		   //  		alert(res.msg);
			// 	}
			 // // window.location.href = "/home";
				// append(res);
			},
			error: function(err) {
				console.log(err);
			}
  		});
	});
	

	// availableTags = [
	// 	"ActionScriptmn",
	// 	"AppleScript",
	// 	"Asp",
	// 	"BASIC",
	// 	"C",
	// 	"C++",
	// 	"Clojure",
	// 	"COBOL",
	// 	"ColdFusion",
	// 	"Erlang",
	// 	"Fortran",
	// 	"Groovy",
	// 	"Haskell",
	// 	"Java",
	// 	"JavaScript",
	// 	"Lisp",
	// 	"Perl",
	// 	"PHP",
	// 	"Python",
	// 	"Ruby",
	// 	"Scala",
	// 	"Scheme"
	// ];
	availableTags=game_name;
	console.log(availableTags)
		
	
	$( "#autocomplete" ).autocomplete({
		source: availableTags	
	});
	
	$("#add").click(function(){
		var field=$("#autocomplete").val();
		//alert(field);
		//$("#interest-name").html(field);
		var interestP=document.createElement('p');
		$(interestP).addClass('interest-added');
		total_interest++;
		var id='interest-added'+total_interest;
		$(interestP).attr('id',id);
		$(interestP).html(field+'<span class="remove-int">&times;</span>');
		$(interestP).appendTo("#interest-name");
		$("#autocomplete").val("");
					
	})
		
		
		$("#games_drop").click(function(){
			$("#db_menu").slideToggle("slow");
		});
		$("#user_drop").click(function(){
			$("#drop_down").slideToggle("slow");
		});		
		$("#more a").click(function(){
			//$("#more").remove();
			for (var i = 0; i < 3; i++) {	
				d=document.createElement('div');
				$(d).addClass("new_feed")
				.html("new one"+(feed_no+1))
				.appendTo($("#feed"));
				feed_no++;
			}
			 feed_no=feed_no+3;
			/*var $newfeed = $('<div class="new_feed" />');
			for (var i = 0; i < 3; i++) {
				$newfeed = $('<div class="ball" />');
				$("#feed").append(newfeed).text(i);
			}*/
			/*d=document.createElement('div');
			$(d).addClass("more")
			.html(" <a href=\"#\" style=\"text-decoration:none\"> more>> </a>")
			
			.appendTo($("#feed"));
			*/
			});
			
			
				for (var i = 0; i < 3; i++) {	
				
				var d=document.createElement('div');
				$(d).addClass("new_discuss")
				.html("new one" + 1)
				.appendTo($("#discussion"));
				}
		
    $("#discussion").scroll(function(){
        //$("#newp").text( "aksndokjadokasmdoaksm");
    	var d=document.createElement('div');
				$(d).addClass("new_discuss")
				.html("new one" + 1)
				.appendTo($("#discussion"));
			
	});
	
	/* Anything that gets to the document
   will hide the dropdown */
$(document).click(function(){
  $("#db_menu ,#drop_down").hide("slow");
});


/* Clicks within the dropdown won't make
   it past the dropdown itself */
$("#games_drop").click(function(e){
  e.stopPropagation();
   $("#drop_down" ).hide("slow");
   
});

$("#user_drop").click(function(e){
  e.stopPropagation();
   $("#db_menu ").hide("slow")
    
});
				
});


