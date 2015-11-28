// external js: masonry.pkgd.js


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
			for (var i = 0; i < loop; i++) {	
				js_res.count--;
				in_feed(i);
			}
			for(var i=flag-1;i<feed_no+1;i++)
			{
				console.log("in for");
				$("#feedTitle"+i+" h2").html(js_res.post[i].title);
				$("#feedTitle"+i+" p").html(js_res.post[i].content);
				$("#likeBar"+i+" #like i").html(js_res.post[i].likes);
				$('#feed'+i+' .feed-username').html(js_res.users[i]);
				$('#feed'+i+' .feed-date').html(js_res.post_date[i]);
				$('#feed'+i+' .post-type').html(js_res.post_type[i]);					
				if(js_res.fun[i]==1)
				{
					console.log("infor"+js_res.fun[i]);
					$('#feed'+i+' .follow-btn').html('UnFollow <span class="glyphicon glyphicon-skull" style="display:inline-block;font-size:15px;"></span>');

				}	
			}
		}
	}
	//$('#feed').append(d).masonry( 'appended',d );
    
  })
  
  $("#expand").click(function(){
	 // ("#less").show;
	  //("#expand").hide();
  })
  $("#less").click(function(){
	 // $("#expand").show;
	 // $("#less").hide();
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
