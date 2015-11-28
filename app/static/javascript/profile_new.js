var profile_post_cnt=0;
var username = localStorage.getItem('username');
var profile_res;
var grid;
function profile(count){
	var d;	
	var loop;
	var dContent;
	if(count>5)
	{
		//profile_post_cnt=count;
		loop=6;
		profile_res.post_count-=6;

	}
	else{
		//profile_post_cnt=count;
		loop=count;
		profile_res.post_count=0;
	}
	for (var i = 0; i <loop ; i++) {	
				d=document.createElement('div');
				//.html("new one"+(feed_no+1));
				//.appendTo($("#feed"));
				//feed_no++;
				var hRand = Math.random();
				var heightClass = hRand > 0.65 ? 'grid-item--height2' : hRand > 0.25 ? 'grid-item--height3' : '';
				$(d).addClass("grid-item-profile"+' '+heightClass);
				dContent=document.createElement('div');
				$(dContent).addClass('grid-item-content-profile')
				var feed_id="profile-feed"+(profile_post_cnt);
				$(dContent).attr('id',feed_id);
				
				var self_header=document.createElement('div');
				$(self_header).addClass("self-header");
				$(self_header).appendTo(dContent);
					var self_type=document.createElement('div');
					$(self_type).addClass('self-type');
					$(self_type).appendTo(self_header);
					var self_date=document.createElement('div');
					$(self_date).addClass('self-date');
					$(self_date).appendTo(self_header);
				
				var self_body=document.createElement('div');
				$(self_body).addClass("self-body")
				.html('<h3>new one</h3><p> new one</p>');
				$(self_body).appendTo(dContent);
			
				var self_footer=document.createElement('div');
				$(self_footer).addClass("self-footer")
				.html('<i id="self-post-comment" class="fa fa-comments">4</i><i id="self-post-like" class="fa fa-heart">10</i><div id="expand" class="expand_class"><i class="fa fa-expand"></i>expand</div><div id="compress" class="expand_class"><i class="fa fa-compress"></i>compress</div>');
				$(self_footer).appendTo(dContent);
				
				//$("#"+feed_id).html("kjdsfnkja");
				$(dContent).appendTo(d);
				
				profile_post_cnt++;
				$('#profile').append(d).masonry( 'appended',d );
	}
	
}
$(window).load(function(){
	//profile();
	$.ajax({
		method: "POST",
		url: "/profile" + username,
		// data: data,
		success: function(res) {
			console.log(res);
			profile_res=res;
			profile(res.post_count);
			console.log("count-pro"+profile_post_cnt);
			$("#description").html(res.user_desp_dict.descp);
			$("#name").html(res.user_desp_dict.fname+" "+res.user_desp_dict.lname);
			$("#profile-username").html(res.username);
			$(".followers div").html(res.fer_count);
			$(".following div").html(res.fing_count);
			if(profile_post_cnt>=0)
			{
				for(var i=0;i<profile_post_cnt;i++)
				{
					var type="AR";
					if(res.post_type[i]=="AR")
					{
						type="Article"
					}
					else{type="Question"}
					$("#profile-feed"+i+" .self-type").html(type);
					$("#profile-feed"+i+" .self-date").html(res.post_date[i]);
					$("#profile-feed"+i+" .self-body h3").text(res.post[i].title);
					$("#profile-feed"+i+" .self-body p").text(res.post[i].content);
					$("#profile-feed"+i+" .fa-comments").text(res.post[i].likes);
					
				}
			}
			//username = res.username;
			//$("#user-name").html(username);
		//	$.cookie("user", res);
		   $grid.masonry();
		
		},
		error: function(err) {
			console.log(err);
		}
	});
});


$(document).ready(function(){
	
	$grid = $('.grid-profile').masonry({
    itemSelector: '.grid-item-profile',
	columnWidth:10,
	stamp : ".stamp-profile",
	gutter:20,
	percentPosition:true,
	isFitWidth: true,
	transitionDuration: '0.8s',	
	animationOptions: {
    duration: 1000
	}
  });
  
 $grid.on( 'click', '.grid-item-content-profile', function() {
    $( this ).parent('.grid-item-profile').toggleClass('is-expanded');
	//$("#expand").hide;
	//$("#less").show;
    $grid.masonry();
	
  });
  
  var max_profile=30;
  $(window).scroll(function(){
	if($(window).scrollTop()==$(document).height()-$(window).height())
	{
		var temp=profile_res.post_count;
		if(temp>0)
		{
			flag=profile_post_cnt;
			profile(profile_res.post_count);
			
			for(var i=flag-1;i<profile_post_cnt;i++)
			{
				var type;
				if(res.post_type[i]=="AR")
				{
					type="Article"
				}
				else{type="Question"}
				$("#profile-feed"+i+" .self-type").html(type);
				$("#profile-feed"+i+" .self-date").html(res.post_date[i]);
				$("#profile-feed"+i+" .self-body h3").text(res.post[i].title);
				$("#profile-feed"+i+" .self-body p").text(res.post[i].content);
				$("#profile-feed"+i+" .fa-comments").text(res.post[i].likes);
					
			}
		}
		else{
			console.log("No more post to Load")
		}
		$(grid).masonry();
	}
	//$('#feed').append(d).masonry( 'appended',d );
    
  });
  
});

