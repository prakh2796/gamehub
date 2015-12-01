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
  $grid.on( 'click', '.grid-item-content #expand,.grid-item-content #compress', function() {
	//$( this ).parent('.grid-item').toggleClass('is-expanded');
	var v=$(this).parent('div').attr('id');
	v=$("#"+v).parent('div').attr('id');
	v="#"+v;
	console.log("in Expand"+v);
	$( v ).parent('.grid-item').toggleClass('is-expanded');
	//$("#start0").toggleClass('is-expanded');
	//$("#expand").hide;
	//$("#less").show;

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
				$('#likeBar'+i+' #answer i').html(js_res.reply_count[i]);

				if(js_res.like[i]==1)
				{
					$("#likeBar"+i+" #like i").addClass('red');	
				}
											
				if(js_res.post_type=="AR")
				{
					$("feed"+i+' .feed-user-answers h4').html("Article");
				
				}
				else{
					$("feed"+i+' .feed-user-answers h4').html("Question");
				}
				
				js_res.count--;

				if(js_res.fun[i]==1)
				{
					console.log("infor"+js_res.fun[i]);
					$('#feed'+i+' .follow-btn').html('<p style="display:inline-block">UnFollow</p><span class="glyphicon glyphicon-plus" style="display:inline-block;font-size:15px;"></span>');
			
				}
				else if(js_res.fun[i]==2)
				{
					$('#feed'+i+' .follow-btn').hide();
				}

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
				  $grid.masonry();
			}
		}
	}
	//$('#feed').append(d).masonry( 'appended',d );
    
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
