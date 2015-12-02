var tag=4;
var page_type="QS";
var total_tags=0;
var tag_name;
$(window).load(function(){

for (var i = 0; i <8; i++) {			
		var d=document.createElement('div');
		$(d).addClass("tag")
		.html( " <span id=\"uncheck_box\" class=\"glyphicon glyphicon-unchecked\" style=\"display:inline-block;margin:0px;\"></span> "+"<p style=\"display:inline-block\">  "+" Tag"+tag+"</p>")
		.appendTo($("#tag_div"));
		$(d).attr('id','tag_checkbox'+tag+04);
		tag++;
	}
	
	
			$.ajax({
			method: "POST",
			url: "/tags",
			//data: data_new,
			success: function(res) {
				// console.log(res);
				//var username = res.username;
				//$("#postBtn").html(username);
				
				tag_name=res.tags_name;
				console.log(tag_name);
				$( "#tag-autocomplete" ).autocomplete({
					source: tag_name	
			});

			},
			error: function(err) {
				console.log(err);
			}
  		});
	
	// setTimeout(function() {
	// 	console.log(tag_name);
	// }, 2000);
	
	//$("#on_ar").hide();
});
$(document).ready(function(){
	/*$('#tag_div').(function(){
		$(this).html("akjsdbkjsdbksajd");
	});*/
	/* $("#games_drop").click(function(){
			$("#db_menu").slideToggle("slow");
	});
	$("#user_drop").click(function(){
			$("#drop_down").slideToggle("slow");
	});		
	 */$("#txtarea").focusin(function(){
		$(this).animate({
			opacity:'1',
			width:'600px',
			height:'150px',
			padding:'15px'
		},"slow");
	});
	$("#txtarea").focusout(function(){
		$(this).animate({
			opacity:'1',
			width:'500px',
			height:'100px'
		},"slow");
	});
	
	$("#drop_btn").click(function(){
		$("#choose").slideToggle("slow");
	});
	
	$("#tag_btn").click(function(){
	for (var i = 0; i <4; i++) {
		tag++;
		var d=document.createElement('div');
		$(d).addClass("tag")
		.html( " <span id=\"uncheck_box\" class=\"glyphicon glyphicon-unchecked\" style=\"display:inline-block;margin:0px;\"></span> "+"<p style=\"display:inline-block\">  "+" Tag"+tag+"</p>")
		.appendTo($("#tag_div"));
		$(d).attr('id','tag_checkbox'+tag);
	}
	
	
	
	});
	
	$("#tag_div span").click(function(){
		$(this).toggleClass("glyphicon glyphicon-unchecked").addClass("glyphicon glyphicon-check");
		//$(this).addClass("glyphicon glyphicon-check")
	});
	
	$("#choose li a").click(function(){
		var type=$(this).text();
		$("#type").html(type);
		if(type == "Article")
		{
			//$("#on_ar").show("slow");
			$("#on_qs p strong").html("Add Section",1000);
			page_type="AR";
		}
		else if(type=="Question")
		{
				//$("#on_ar").hide("slow");
				$("#on_qs p strong").html("Ask Question");
				page_type="QS";
		}
		
	})
	
	tag_list = [];
	$("#tag-add").click(function(){
		var field=$("#tag-autocomplete").val();
		console.log(field);
		//alert(field);
		//$("#interest-name").html(field);
		if(field==""){}		
		else{
			tag_list.push(field);
			var interestP=document.createElement('p');
			$(interestP).addClass('tag-added');
			total_tags++;
			var id='tag-added'+total_tags;
			$(interestP).attr('id',id);
			$(interestP).html(field+'<span class="remove-int">&times;</span>');
			$(interestP).appendTo("#tag-name");
			$("#tag-autocomplete").val("");
		}
	});
	$("#post").click(function(){
		var post_type=page_type;
		if($("#title").val()=="" || $("#title").val()==" ")
		{
			alert("Title cannot be Blank");
		}
		else{
				$.ajax({
				method: "POST",
				url: "/add_post" + user_id,
				// data: JSON.stringify(interest_list),
				data: { 
					tag_list: JSON.stringify(tag_list),
					content:$("#content").val(),
					title:$("#title").val(),
					type:post_type
				},
				success: function(res) {
					console.log(tag_list);
					console.log(res.msg);
					alert(res.msg);
					window.location.replace("/ask");

				},
				error: function(err) {
					console.log('ajfkjsb');
				}
			});
				
		}
		
	});
	$("#tag-name").delegate("p span", "click", function(){
		//alert("clicked");
		var id=$(this).closest("p").attr('id');
		id="#"+id;
		//alert(id);
		$(id).remove();
	});
	
	
	
	/* Anything that gets to the document
   will hide the dropdown */
$(document).click(function(){
  $("#db_menu ,#drop_down,#choose").hide("slow");
});


/* Clicks within the dropdown won't make
   it past the dropdown itself */
$("#games_drop").click(function(e){
  e.stopPropagation();
   $("#drop_down" ).hide("slow");
    $("#choose ").hide("slow")
});

$("#user_drop").click(function(e){
  e.stopPropagation();
   $("#db_menu ").hide("slow")
    $("#choose ").hide("slow")
});

$("#drop_btn").click(function(e){
  e.stopPropagation();
  $("#drop_down" ).hide("slow");
   $("#db_menu ").hide("slow")
});

	
});
