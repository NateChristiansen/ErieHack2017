

function customerRoute()	{
	$.get('/customers', function(data){
		$.post("/savedatabase", {db: data}, function(res) {
			console.log(res);
		}, "json");
	});

}

<<<<<<< HEAD
function email() {
	$.post("/message", null, function(res) {
		console.log(res);
	});
}
=======

$( document ).ready(function() {
  
$.get('/customers', function(data){

//Find in html 

}

});
>>>>>>> 59d6d395268161d91f3963b917fccf97afe7ece7
