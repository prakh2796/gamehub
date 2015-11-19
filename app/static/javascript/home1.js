// external js: masonry.pkgd.js

$(document).ready( function() {

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
		if(feed_no >= max_feed)
		{
			console.log("No more post to Load")
		}
		else{
			for (var i = 0; i < 3; i++) {	
				d=document.createElement('div');
				//.html("new one"+(feed_no+1));
				//.appendTo($("#feed"));
				feed_no++;
				var hRand = Math.random();
				var heightClass = hRand > 0.65 ? 'grid-item--height2' : hRand > 0.25 ? 'grid-item--height3' : '';
				$(d).addClass("grid-item"+' '+heightClass);
				dContent=document.createElement('div');
				$(dContent).addClass('grid-item-content')
				//.html("new one"+(feed_no+1));
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
					$(oImg).attr('alt', 'na'); 
					$(oImg).addClass("feed-user-image");		
					$(oImg).appendTo(upper_div);
				
				var lower_div=document.createElement("div");
				$(lower_div).addClass("feed-div feed-lower-div");
				$(lower_div).appendTo(dContent);
				$(dContent).appendTo(d);
				
				var like_bar=document.createElement("div");
				$(like_bar).addClass("like-bar")
				.html('<span style=""class="glyphicon glyphicon-comment">4</span><span style="font-size:1.2em"class="glyphicon glyphicon-heart">10</span>');
				$(like_bar).appendTo(dContent);
				$('#feed').append(d).masonry( 'appended',d );
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
