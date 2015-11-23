// external js: masonry.pkgd.js

var loop=6;
$(document).ready( function() {
/* 
$( "#autocomplete" ).click({
		source: availableTags
	});	 */
	
  var $grid = $('.grid').masonry({
    columnWidth:10,
    itemSelector: '.grid-item',
	gutter:20,
	percentPosition:true,
	isFitWidth: true,
	transitionDuration: '0.8s'
	/* animationOptions: {
    duration: 1000
	} */
  });
  var $stamp = $grid.find('.stamp');
  var isStamped = false;

  $(window).on( 'load', function() {
    // stamp or unstamp element
    if ( isStamped ) {
      $grid.masonry( 'unstamp', $stamp );
    } else {
      $grid.masonry( 'stamp', $stamp );
    }
    // trigger layout
    $grid.masonry('layout');
    // set flag
    isStamped = !isStamped;
		
  });
  
  $grid.on( 'click', '.grid-item-content', function() {
    $( this ).parent('.grid-item').toggleClass('is-expanded');
	//$("#expand").hide;
	//$("#less").show;
    $grid.masonry();
	
  });
  //var feed_no=0;
  var max_feed=30;
  /* $('#view-more').click(function(){ */
	$(window).scroll(function(){
	if($(window).scrollTop()==$(document).height()-$(window).height())
	{	
		var d;	
		
		var dContent;
		console.log("in scoll"+js_res.count);
		if(feed_no >= max_feed)
		{
			console.log("No more post to Load")
		}
		else{
			var flag=feed_no;
			var d;
			if(js_res.count<6)
			{
				
				loop=js_res.count;
				//console.log("in if loop value"+loop);
			}	
			else
				{
				//	console.log("in else loop value"+loop);
					
					loop=6;}
			if(js_res.count==0)
			{
				$("#no-more").show("slow");
				setTimeout(function(){
					$("#no-more").hide("slow");		
				},5000)
			}

	var dContent;
	for (var i = 0; i < loop; i++) {	
				d=document.createElement('div');
				//.html("new one"+(feed_no+1));
				//.appendTo($("#feed"));
				js_res.count--;
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
	for(var i=flag-1;i<feed_no;i++)
	{
		console.log("in for");
		$("#feedTitle"+(i+1)+" h2").html(js_res.post[i].title);
		$("#feedTitle"+(i+1)+" p").html(js_res.post[i].content);
		$("#likeBar"+(i+1)+" #like").html(js_res.post[i].likes);
	}	
			
		}
		
	}
	//$('#feed').append(d).masonry( 'appended',d );
    
  })
  
  $("#expand").click(function(){
	  ("#less").show;
	  ("#expand").hide();
  })
  $("#less").click(function(){
	  ("#expand").show;
	  ("#less").hide();
  })
  /* $(function(){
  var header = $("header"),
      yOffset = window.he,
      triggerPoint = 150;
  $(window).scroll(function(){
    yOffset = $(window).scrollTop();
    
    if(yOffset >= triggerPoint){
      header.addClass("minimized");
    }else{
      header.removeClass("minimized");
    }
    
  });
}); */
  
});
