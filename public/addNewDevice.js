

function createNewDevice()	{
	$.get('/customers', function(data){
		$.post("/savedatabase", {db: data}, function(res) {
			console.log(res);
		}, "json");
	});

}