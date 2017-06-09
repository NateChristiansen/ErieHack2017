

function customerRoute()	{
	$.get('/customers', function(data){
		$.post("/savedatabase", {db: data}, function(res) {
			console.log(res);
		}, "json");
	});

}


$( document ).ready(function() {
  
$.get('/customers', function(data){

//Find in html file

}

});
