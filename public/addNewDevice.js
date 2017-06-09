

function createNewDevice()	{
	$.get('/customers', function(data){
		$.post("/savedatabase", {db: data}, function(res) {
			console.log(res);
		}, "json");
	});

}

function email() {
	$.post("/message", null, function(res) {
		console.log(res);
	});
}