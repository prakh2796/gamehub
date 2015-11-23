
var feed_no=0;
var js_res;
//var total_interest=0;
var availableTags;
var game_name;
var user_id = localStorage.getItem('user_id');
//var global_feed_cnt=localStorage.getItem('global_feed_cnt');
var global_feed_cnt=0;
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
				var feed_id='feed'+(feed_no);
				$(dContent).attr('id',feed_id);
				//$("#"+feed_id).html("kjdsfnkja");
				
				var upper_div=document.createElement("div");
				$(upper_div).addClass('feed-div feed-upper-div');
				$(upper_div).appendTo(dContent);
					var oImg=document.createElement("img");
					$(oImg).attr('src', '../static/images/profile-dribbble.png');
					$(oImg).attr('alt', 'profile image'); 
					$(oImg).addClass("feed-user-image");		
					$(oImg).appendTo(upper_div);
								
					var feed_username=document.createElement("div");
					$(feed_username).addClass("feed-username").html("new one"+(feed_no+1));
					$(feed_username).appendTo(upper_div);
					var follow_btn=document.createElement("div");
					$(follow_btn).addClass("follow-btn")
					.html('Follow <span class="glyphicon glyphicon-plus" style="display:inline-block;font-size:15px;"></span>');
					$(follow_btn).appendTo(upper_div);
					
				var lower_div=document.createElement("div");
				$(lower_div).addClass("feed-div feed-lower-div");
				$(lower_div).attr('id','feedTitle'+feed_no);
				$(lower_div).html('<h2>How to download CS maps??</h2><p></p>');
				$(lower_div).appendTo(dContent);
				$(dContent).appendTo(d);
				
				var like_bar=document.createElement("div");
				$(like_bar).addClass("like-bar");
				$(like_bar).attr('id','likeBar'+feed_no);
				$(like_bar).html('<span style=""class="glyphicon glyphicon-comment">4</span><span style="font-size:1.2em"class="glyphicon glyphicon-heart">10</span><div id="expand" class="expand_class">expand<span style="padding:3px;"class="glyphicon glyphicon-fast-forward"></span></div>');
				$(like_bar).appendTo(dContent);
				//.html("new one"+(feed_no+1)).appendTo(d);
				//console.log(risk);
				// $("#feedTitle1 h2").html(risk.post[0].title);
				// $("#feedTitle1 p").html(risk.post[0].content);
				// $("#likeBar1 #like").html(risk.post[0].likes);
				
				$('#feed').append(d).masonry( 'appended',d );
	}
	
}
$(window).load(function(){
		create_feed();		//calling of function
		event.preventDefault();
		$.ajax({
			method: "POST",
			url: "/home" + user_id,
			//data: data_new,
			success: function(res) {
				console.log(res);
				var username = res.username;
				$("#user-name").html(username);
				// $.cookie("user", res);
			},
			error: function(err) {
				console.log(err);
			}
  		});

		$.ajax({
			method: "POST",
			url: "/timeline" + user_id,
			//data: data_new,
			success: function(res) {
				//console.log(res);
				//event.preventDefault();
				js_res=res;
				console.log(js_res);
				//create_feed();
				// setTimeout(function() {
				// 	create_feed(res);
				// 	//console.log(game_name);
				// }, 2000);
				setTimeout(function() {
					//create_feed(res);
					var global_feed_cnt=js_res.count;
					if(js_res.count>feed_no)
					{
						for(var i=0;i<feed_no;i++)
						{
							$("#feedTitle"+(i+1)+" h2").html(js_res.post[i].title);
							$("#feedTitle"+(i+1)+" p").html(js_res.post[i].content);
							$("#likeBar"+(i+1)+" #like").html(js_res.post[i].likes);
							js_res.count--;
						}	
					//	global_feed_cnt=global_feed_cnt-feed_no;
						//console.log(global_feed_cnt);
					}
					else{
					//	console.log("else"+global_feed_cnt);
						for(var i=0;i<js_res.count;i++)
						{
							$("#feedTitle"+(i+1)+" h2").html(js_res.post[i].title);
							$("#feedTitle"+(i+1)+" p").html(js_res.post[i].content);
							$("#likeBar"+(i+1)+" #like").html(js_res.post[i].likes);
							js_res.count--;
						}	

					}
					//console.log("in home.js"+global_feed_cnt);
					//js_res.count=global_feed_cnt;
					//console.log("js count"+js_res.count);
					//console.log(game_name);
				}, 1000);
				// // console.log(res.post[0].title);
				// $("#feedTitle1 h2").html(res.post[0].title);
				// $("#feedTitle1 p").html(res.post[0].content);
				// $("#likeBar1 #like").html(res.post[0].likes);
				// //var username = res.username;
				//$("#user-name").html(username);
				// $.cookie("user", res);
			},
			error: function(err) {
				console.log(err);
			}
		});
				
		// create_feed(js_res);
				

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
$("#no-more").hide();
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

	// availableTags = [];
	// game_name = [];

	$("#logout").click(function(){
			event.preventDefault();
			$.ajax({
			method: "POST",
			url: "/logout",
			//data: data_new,
			success: function(res) {
				console.log('window.location.href="/"');
				//window.location.replace('/');
				//window.location.reload(true);
				window.location.replace('/');
			},
			error: function(err) {
				console.log(err);
			}
  		});
		//window.location.reload(true);
		window.location.replace('/');
					

	});

	$("#myModal").click(function(){
		// console.log(user_id);
			$.ajax({
			method: "POST",
			url: "/autocomplete_games" + user_id,
			//data: data_new,
			success: function(res) {
				// console.log(res);
				var username = res.username;
				$("#user-name").html(username);
				game_name=res.game_name;
				console.log(game_name);
				$( "#autocomplete" ).autocomplete({
					source: game_name	
			});

			},
			error: function(err) {
				console.log(err);
			}
  		});
	});
	
	
	setTimeout(function() {
		console.log(game_name);
	}, 2000);

	interest_list = [];
	// addedcount = 0;

	$("#add").click(function(){
		var field=$("#autocomplete").val();
		//alert(field);
		//$("#interest-name").html(field);
		// interest_list[addedcount++] = field;
		interest_list.push(field);
		// console.log(interest_list[addedcount-1]);
		var interestP=document.createElement('p');
		$(interestP).addClass('interest-added');
		total_interest++;
		var id='interest-added'+total_interest;
		$(interestP).attr('id',id);
		$(interestP).html(field+'<span class="remove-int">&times;</span>');
		$(interestP).appendTo("#interest-name");
		$("#autocomplete").val("");
					
	});

	$("#done").click(function(){
	$.ajax({
			method: "POST",
			url: "/add_interest" + user_id,
			// data: JSON.stringify(interest_list),
			data: { 
				interest_list: JSON.stringify({'x': interest_list}) 
			},
			success: function(res) {
				console.log(interest_list);
				console.log(res.msg);	
			},
			error: function(err) {
				console.log('ajfkjsb');
			}
	});
	//window.location.reload(true);
		/* var time = new Date().getTime();
		$(document.body).bind("mousemove keypress", function(e) {
			 time = new Date().getTime();
		});
		function refresh() {
			 if(new Date().getTime() - time >= 60000) 
				 window.location.reload(true);
			 else 
				 setTimeout(refresh, 10000);
		}
		setTimeout(refresh, 10000); */
	});
		
		
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


