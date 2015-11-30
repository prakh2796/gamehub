//var feed_no=0;
var feed_no=0;
//var feed_no=1;
var total_interest=0;
var availableTags;
var game_name;
var user_id = localStorage.getItem('user_id');
var username;
var js_res;

var total_interest=0;
var trending_cnt=0;
var ans_count=0;

function in_feed(i){
	var dContent;
	var d=document.createElement('div');
				//.html("new one"+(feed_no+1));
				//.appendTo($("#feed"));
				
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
					$(feed_username).addClass("feed-username").html("new one"+(feed_no));
					$(feed_username).appendTo(upper_div);
								
					var post_type=document.createElement("div");
					$(post_type).addClass("post-type");
					$(post_type).appendTo(upper_div);
								
					var feed_date=document.createElement("div");
					$(feed_date).addClass("feed-date");
					$(feed_date).appendTo(upper_div);
					
					var follow_btn=document.createElement("div");
					$(follow_btn).attr('id','follow-btn');
					$(follow_btn).addClass("follow-btn")
					.html('Follow <span class="glyphicon glyphicon-plus" style="display:inline-block;font-size:15px;"></span>');
					$(follow_btn).appendTo(upper_div);
					
				var lower_div=document.createElement("div");
				$(lower_div).addClass("feed-div feed-lower-div");
				$(lower_div).attr('id','feedTitle'+feed_no);
				$(lower_div).html('<h2>How to download CS maps??</h2><p></p>');
				$(lower_div).appendTo(dContent);
				$(dContent).appendTo(d);
				
				var answers=document.createElement("div");
				$(answers).addClass("feed-user-answers");
				$(answers).attr('id','feed-user-answers'+feed_no);
				$(answers).html('<h4>Answers:</h4><div id="after-div'+(feed_no)+'" class="after-div"><textarea id="t1" class="t1" title="Write your text here..."data-action="fit"></textarea><button id="comment-answer"class="btn btn-info">Post</button></div>');
				$(answers).appendTo(dContent);
				
				var like_bar=document.createElement("div");
				$(like_bar).addClass("like-bar");
				$(like_bar).attr('id','likeBar'+feed_no);
				$(like_bar).html('<span style="" id="answer"><i class="fa fa-comments">4</i></span><span  id="like"><i class="fa fa-heart">10</i></span><div id="expand" class="expand_class"><i class="fa fa-expand"></i>expand</div><div id="compress" class="expand_class"><i class="fa fa-compress"></i>compress</div>');
				$(like_bar).appendTo(dContent);
				//.html("new one"+(feed_no+1)).appendTo(d);
				//console.log(risk);
				// $("#feedTitle1 h2").html(risk.post[0].title);
				// $("#feedTitle1 p").html(risk.post[0].content);
				// $("#likeBar1 #like").html(risk.post[0].likes);
				
				$('#feed').append(d).masonry( 'appended',d );
				feed_no++;
				$("#feed #compress").hide();
}


var global_feed_cnt=0;
function create_feed(){
	//var d;	
	//var dContent;
	for (var i = 0; i < 6; i++) {	
		in_feed(i);
			
	}
	
}

function createTrending(){
	for(var i=0;i<6;i++)
	{
		console.log("yes");
		trending_cnt++;
		var li=document.createElement('li');
		var liDiv=document.createElement('div');
		$(liDiv).addClass('trending-story');
		var imageUrl="../static/images/wallpapers/"+trending_cnt+".jpg";
		$(liDiv).css('background-image', 'url(' + imageUrl + ')');
		
		//$(liDiv).attr('id','');
		var liUpperDiv=document.createElement('div');
		 $(liUpperDiv).addClass('liUpperDiv');
			$(liUpperDiv).appendTo(liDiv);
		
			var liGameName=document.createElement('div');
			var liGameName_id='li_name'+trending_cnt;
			$(liGameName).addClass('liGameName btn btn-dark pull-left');
			$(liGameName).attr('id',liGameName_id).html("Counter Strike");
			$(liGameName).appendTo(liUpperDiv);
			var add_to_int=document.createElement('div');
			$(add_to_int).addClass("liFollbtn pull-right btn btn-dark").html('<span class="glyphicon glyphicon-plus" style="display:inline-block"></span></div>');
			//$(liGameName).appendTo("liUpperDiv");
			$(add_to_int).appendTo(liUpperDiv); 
		
		var liSecondDiv=document.createElement('div');
		$(liSecondDiv).addClass('liSecondDiv');
		$(liSecondDiv).appendTo(liDiv);
		var p=document.createElement('p');
		$(p).addClass('liGenre');
		$(p).html(' genre');
		$(p).appendTo(liDiv);
		//$(liUpperDiv).appendTo(liDiv);
		//$(liSecondDiv).appendTo(liDiv);
		//$(p).appendTo(liDiv);		 
		//$(liDiv).appendTo(li);
		$(li).appendTo(".sidebar-nav");	
		$(liDiv).appendTo(li);
	}
	var liImg=document.createElement('li');
	$(liImg).addClass('trending-img');//.html("Loading IMG...");
	var imageUrl="../static/images/imgur.gif";
	$(liImg).css('background', 'url(' + imageUrl + ') no-repeat ');
	$(liImg).attr('id','trending-img');
	$(liImg).appendTo('.sidebar-nav');
	//$(liImg).hide();
}

// var time = new Date().getTime();
// $(document.body).bind("mousemove keypress", function(e) {
// 	 time = new Date().getTime();
// });
// function refresh() {
// 	if(new Date().getTime() - time >= 60000) 
// 		window.location.reload(true);
// 	else 
// 		setTimeout(refresh, 10000);
// }

// setTimeout(refresh, 10000);
			
$(window).load(function(){
		create_feed();		//calling of function (displaying feed on load of homepage)
		createTrending();	//calling of Treanding Sidebar Function on load
		event.preventDefault();
  		$.ajax({
			method: "POST",
			url: "/home" + user_id,
			// data: data,
			success: function(res) {
				console.log(res);

				username = res.username;
				console.log("username-"+username);
				$("#profileBtn").html(res.username);
				localStorage.setItem('username',username);
			//	$.cookie("user", res);
			
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
				setTimeout(function(){
					//create_feed(res);
					var global_feed_cnt=js_res.count;
					if(js_res.count>feed_no)
					{
						console.log(res.fun);
							
						for(var i=0;i<feed_no;i++)
						{
							$("#feedTitle"+i+" h2").html(js_res.post[i].title);
							$("#feedTitle"+i+" p").html(js_res.post[i].content);
							$("#likeBar"+i+" #like i").html(js_res.post[i].likes);
							$('#feed'+i+' .feed-username').html(js_res.users[i]);
							$('#feed'+i+' .feed-date').html(js_res.post_date[i]);
							$('#feed'+i+' .post-type').html(js_res.post_type[i]);
							$('#likeBar'+i+' #answer i').html(js_res.reply_count[i]);

							if(js_res.like[i]==1)
							{
								$("#likeBar"+i+" #like i").addClass('red');	
							}
							
							if(res.post_type=="AR")
							{
								$("feed"+i+' .feed-user-answers h4').html("Article");
							
							}
							else{
								$("feed"+i+' .feed-user-answers h4').html("Question");
							}
							
							js_res.count--;

							if(js_res.fun[i]==1)
							{
								console.log("infor"+res.fun[i]);
								$('#feed'+i+' .follow-btn').html('UnFollow <span class="glyphicon glyphicon-plus" style="display:inline-block;font-size:15px;"></span>');
						
							}
							else if(js_res.fun[i]==2)
							{
								$('#feed #feed'+i+'.feed-upper-div #follow-btn').hide();
							}
						}	
					//	global_feed_cnt=global_feed_cnt-feed_no;
						//console.log(global_feed_cnt);
					}
					else{
					//	console.log("else"+global_feed_cnt);
						for(var i=0;i<js_res.count;i++)
						{
							if(res.post_type=="AR")
							{
								$("feed"+i+' .feed-user-answers h4').html("Article");
							
							}
							else{
								$("feed"+i+' .feed-user-answers h4').html("Question");
							}
							
							js_res.count--;

							if(js_res.fun[i]==1)
							{
								console.log("infor"+res.fun[i]);
								$('#feed'+i+' .follow-btn').html('UnFollow <span class="glyphicon glyphicon-plus" style="display:inline-block;font-size:15px;"></span>');
						
							}
							else if(js_res.fun[i]==1)
							{
								$('#feed'+i+' .follow-btn').hide();
							}
						}	

					}
					//console.log("in home.js"+global_feed_cnt);
					//js_res.count=global_feed_cnt;
					//console.log("js count"+js_res.count);
					//console.log(game_name);
				}, 000);
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
		// createFeed(js_res);
				
$("#no-more").hide();	
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

$(function() {
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});
});

$(document).ready(function(){
	
	//ans_count=8;

	$("#feed").on('click','#expand', function(){
		//alert("clicked");
		var id=$(this).parent("div").attr('id');
		id="#"+id;
		id=$(id).parent('div').attr('id');
		id="#"+id;
		
		
		//alert(id);
		
		console.log("in"+id);
		$(id+" #expand").hide();
		$(id+" #compress").show();
		ans_count=3;
		var type=$(id+" .post-type").text();
		var title=$(id+" .feed-lower-div h2").text();
		console.log("dat-"+type+" "+title);
		var data={
			type:type,
			title:title
		};
		$.ajax({
			method: "POST",
			url: "/expand",
			data: data,
			success: function(res) {
				console.log(res);
				ans_count=res.count;
				//	$.cookie("user", res);
				var loop=ans_count;
				var post_user_answer_id_cnt=0;
				if(ans_count>4){
					
					for(var i=0;i<5;i++)
					{
						$(id+" .feed-user-answers .after-div").after('<div class="post-user-answer" id="post-user-answer'+(post_user_answer_id_cnt)+'"><a href="#"><i class="fa fa-at"></i>'+(res.users[i])+'</a>'+' '+(res.display[i].date)+'<p>'+(res.display[i].content)+' <i id="cancel-answer" class="fa fa-close (alias)"></i></p></div>');
						ans_count--;
						post_user_answer_id_cnt++;
					}	
					$(id+" .feed-user-answers div:last-child").after('<button class="btn btn-dark">View more>>></button>');
				}	
				else{
					for(var i=0;i<loop;i++)
					{
						$(id+" .feed-user-answers .after-div").after('<div class="post-user-answer" id="post-user-answer'+(post_user_answer_id_cnt)+'"><a href="#"><i class="fa fa-at"></i>'+(res.users[i])+'</a>'+' '+(res.display[i].date)+'<p>'+(res.display[i].content)+' <i id="cancel-answer" class="fa fa-close (alias)"></i></p></div>');
						ans_count--;
						post_user_answer_id_cnt++;
					}	
				}
			},
			error: function(err) {
				console.log(err);
			}

  		});
		
				// if(ans_count>4){
				// 	for(var i=0;i<5;i++)
				// 	{
				// 		$(id+" .feed-user-answers .t1").after('<div class="post-user-answer" id="post-user-answer"><a href="#"><i class="fa fa-at"></i>bittu</a><p>NEW ONE'+(i)+'adskjndkjasd k </p></div>');
				// 		ans_count--;
				// 	}	
				// 	$(id+" .feed-user-answers div:last-child").after('<a href="#" id="more-answers" style="">View more>>></a>');
				// }	
				// else{
				// 	var loop=ans_count;
				// 	for(var i=0;i<loop;i++)
				// 	{
				// 		$(id+" .feed-user-answers .t1").after('<div class="post-user-answer" id="post-user-answer"><a href="#"><i class="fa fa-at"></i>bittu</a><p>NEW ONE'+(i)+'adskjndkjasd k </p></div>');
				// 		ans_count--;
				// 	}			
				// }
		
		//id=id+" #feed-answers h4"
		//$("#feed-answers h4").after('<div class="post-user-answer" id="post-user-answer"><a href="#" style=""><i class="fa fa-at"></i>bittu</a><p  style="">NEW ONEadskjndkjasd k </p></div>');
		
			//$(id).remove();
	});
	
	
	
	$("#feed").on('click','#compress', function(){
		var id=$(this).parent("div").attr('id');
		id="#"+id;
		id=$(id).parent('div').attr('id');
		id="#"+id;
		
		$(id+' div.post-user-answer').remove();
		$(id+" #compress").hide();
		$(id+" #expand").show();
	});

	$("#feed").on('click','#comment-answer',function(){
		
//		var real=$(this).attr('id');

		var id=$(this).parent("div").attr('id');
		id="#"+id;
		
		id=$(id).parent('div').attr('id');
		id="#"+id;
		console.log("in post"+id);
		//alert(id);
		
		id=$(id).parent('div').attr('id');
		id="#"+id;
		console.log("in post"+id);
		//console.log("in post"+id);
		var response=$(id+" .after-div"+" #t1").val()
		console.log("response - "+response);
		if(response=="")
		{		}
		else{
			var type=$(id+"	 .post-type").text();
			var title=$(id+" .feed-lower-div h2").text();
			console.log(response+" "+type+" "+title);
			var data={
				content:response,
				type:type,
				title:title
			}
			$.ajax({
			method: "POST",
			url: "/add_reply" + user_id,
			data:data,
				success: function(res) {
					console.log(res);
					window.location.replace("/home"+user_id);
					//	$.cookie("user", res);
				
				},
				error: function(err) {
					console.log(err);
				}
			});
		}
	});

	$("#feed").on('click','#cancel-answer',function(){
		//$(this).closest('div').remove();
		var p_id=$(this).closest('div').attr('id');
		//console.log("text "+p_id);
		var id=$("#"+p_id).parent('div').attr('id');
		p_id="#"+p_id;
		//console.log("text "+id);
		id="#"+id;
		var answered_username=$("#feed "+id+" "+p_id+" a").text();
		var p=$("#feed "+id+" "+p_id+" p").text()
		
		var main_id=$(id).parent('div').attr('id');
		//console.log("text "+main_id);
		main_id="#"+main_id;
		var type=$("#feed "+main_id+" .feed-upper-div .post-type").html()
		var title=$("#feed "+main_id+" .feed-lower-div h2").html()
		var post_username=$("#feed "+main_id+" .feed-upper-div .feed-username").html();
		console.log("username "+answered_username+" "+p+" "+ type+" "+title+" "+post_username);
			if(answered_username==username)
			{
				flag=1;
				 $(this).closest('div').remove();
			}
			else if(username==post_username)
			{
				flag=1;
				$(this).closest('div').remove();
			}
			else{
				flag=0;
			}
			if(flag==1)
			{
					$.ajax({
					method: "POST",
					url: "/delete_reply",
					data:{
						username:answered_username,
						content:p,
						type:type
					},
					success: function(res) {
						//console.log('window.location.href="/"');
						//window.location.replace('/');
						//window.location.reload(true);
						//$(this).closest('div').remove();
						//window.location.replace('/home'+user_id);
					},
					error: function(err) {
						console.log(err);
					}
				});	
			}
			else{
				alert("This is not Your Post or anwer")
			}
			
	});
	

	$("#feed").on('click','#like i',function(){
		//$(this).removeClass('blue');
		//$(this).closest('div').remove();
		//var p_id=$(this).closest('div').attr('id');
		var flag;
		if($(this).hasClass("red"))
		{
			 flag=1;
			$(this).removeClass('red');
		}
		else{
			flag=0;
			$(this).addClass('red');
		}
		var p_id=$(this).closest('div').attr('id');
		console.log("text "+p_id);
		var id=$("#"+p_id).parent('div').attr('id');
		p_id="#"+p_id;
		
		id="#"+id;
		console.log(" "+id);
		// var answered_username=$("#feed "+id+" "+p_id+" a").text();
		// var p=$("#feed "+id+" "+p_id+" p").text()
		
		var main_id=$(id).parent('div').attr('id');
		//console.log("text "+main_id);
		main_id="#"+main_id;
		var type=$("#feed "+id+" .feed-upper-div .post-type").html()
		var title=$("#feed "+id+" .feed-lower-div h2").html()
		//var post_username=$("#feed "+main_id+" .feed-upper-div .feed-username").html();
		console.log("username "+ type+" "+title+" "+flag);
		// event.preventDefault();
		$.ajax({
			method:"POST",
			url:"/like"+username,
			data:{
				check:flag,
				title:title,
				type:type
			},
			success: function(res) {
				console.log(res);
				//$(this).html(res.likes);
				$("#feed "+id+" #like i").html(res.likes);
			},
			error: function(err) {
				console.log(err);
			}
  		});
		console.log(flag);

	});

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
				// username = res.username;
				// $("#user-name").html(username);
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
	
	
	/* $( "#autocomplete" ).autocomplete({
		source: availableTags	
	}); */
	
	$("#add").click(function(){
		var field=$("#autocomplete").val();
		//console.log(field);
		//alert(field);
		//$("#interest-name").html(field);
		if(field==""){}		
		else{
			interest_list.push(field);
			var interestP=document.createElement('p');
			$(interestP).addClass('interest-added');
			total_interest++;
			var id='interest-added'+total_interest;
			$(interestP).attr('id',id);
			$(interestP).html(field+'<span class="remove-int">&times;</span>');
			$(interestP).appendTo("#interest-name");
			$("#autocomplete").val("");
		}
	});
	$("#done").click(function(){
		$.ajax({
			method: "POST",
			url: "/add_interest" + user_id,
			// data: JSON.stringify(interest_list),
			data: { 
				interest_list: JSON.stringify(interest_list) 
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
	$("#interest-name").delegate("p span", "click", function(){
		//alert("clicked");
		var id=$(this).closest("p").attr('id');
		id="#"+id;
		//alert(id);
		$(id).remove();

	});
	/* $('.section').scrollTop(function(){
			//window.location.reload(true);
			//var yOffset = $(window).scrollTop();
			
		});
		 */
	$("#games_drop").click(function(){
		$("#db_menu").slideToggle("slow");
	});
	$("#user_drop").click(function(){
		$("#drop_down").slideToggle("slow");
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


	
	$("#menu-close").click(function(e) {
			e.preventDefault();
			$("#sidebar-wrapper").toggleClass("active");
	});
		
	$("#sidebar-wrapper	").scroll(function(){
		console.log("scroll");
		var offsetHeight = $(window).height();
		var windowHeight = $("#sidebar-wrapper").scrollTop();
		console.log(offsetHeight);
		console.log(" "+windowHeight);
		if($("#sidebar-wrapper").scrollTop() >= $("#sidebar-nav").height()-$(window).height())
		{	
			//$("#trending-img").hide("slow");
			setTimeout(function(){	
			$("#trending-img").remove();
			createTrending();
			},2000); 
			
			//createTrending();
	/* 		for(var i=0;i<6;i++)
			{
				console.log("in scroll");
				trending_cnt++;
				var li=document.createElement('li');
				var liDiv=document.createElement('div');
				$(liDiv).addClass('trending-story').html("New One"+trending_cnt);
				//$(liDiv).attr('id','');
				$(liDiv).appendTo(li);
				$(li).appendTo(".sidebar-nav");	
			}
	 */		
		}
	});

		// Opens the sidebar menu
	$("#menu_toggle").click(function(e) {
			e.preventDefault();
			$("#sidebar-wrapper").toggleClass("active");
			//$('.section').fadeTo("slow",0.4);
			//$('header').fadeTo("slow",0.4);
		});	
		
	$("#profileBtn").click(function(){
		//alert(1);
		console.log("clicl"+username);

		window.location.replace("/profile"+username);
	});
	$("#videos").click(function(){
		//alert(1);
		console.log("clicl"+username);

		window.location.replace("/videos"+user_id);
	});



});

