var feed_no=0;


$(window).load(function(){
	// $("#more").hide();
	// $("#more").show();
	console.log($.cookie('user.user_desp_dict'));
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


