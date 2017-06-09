

function createNewDevice()	{
	$.get('/customers', function(data){
		$.post("/savedatabase", {db: data});
	});

}