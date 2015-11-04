var tag=4;
var page_type="QS";
$(window).load(function(){

for (var i = 0; i <8; i++) {			
		var d=document.createElement('div');
		$(d).addClass("tag")
		.html( " <span id=\"uncheck_box\" class=\"glyphicon glyphicon-unchecked\" style=\"display:inline-block;margin:0px;\"></span> "+"<p style=\"display:inline-block\">  "+" Tag"+tag+"</p>")
		.appendTo($("#tag_div"));
		$(d).attr('id','tag_checkbox'+tag+04);
		tag++;
	}
	
	
	
	$("#on_ar").hide();
});
$(document).ready(function(){
	/*$('#tag_div').(function(){
		$(this).html("akjsdbkjsdbksajd");
	});*/
	$("#games_drop").click(function(){
			$("#db_menu").slideToggle("slow");
	});
	$("#user_drop").click(function(){
			$("#drop_down").slideToggle("slow");
	});		
	$("#txtarea").focusin(function(){
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
			$("#on_ar").show("slow");
			$("#on_qs p strong").html("Add Secton");
			page_type="AR";
		}
		else if(type=="Question")
		{
				$("#on_ar").hide("slow");
				$("#on_qs p strong").html("Ask Question");
				page_type="QS";
		}
		
	})
	
	
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
