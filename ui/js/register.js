
$(document).ready(function () {
	var cookie = readCookie('auth');
	if (cookie != null) {
		window.location = "/app";
	}
	//check cookie
	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	}

	//error hide
	$(messagebox).hide()

	$(register).click(function () {
		if (($('#username').val() == "")) {
			$(messagebox).show()
			$(errormsg).text('Please Enter Username');
		} else if (($('#password').val() == "")) {
			$(messagebox).show()
			$(errormsg).text('Please Enter valid Password');
		} else {
			$(messagebox).hide()
			$.ajax({
				url: "/register",
				method: "post",
				dataType: 'json',
				contentType: 'application/json',
				data: JSON.stringify({
					"username": $('#username').val(),
					"password": $('#password').val(),
				}),
				success: function (data) {
					console.log('Register success loged =', data);
					// console.log(data.message);
					// $(messagebox).show()
					// $(errormsg).text('Redirecting...')
					// var d = new Date();
					// d.setTime(d.getTime() + (1*24*60*60*100));
					// var expires = "expires="+ d.toUTCString();
					// document.cookie = 'auth' + "=" + data.message + ";" + expires + ";path=/";
					console.log('data=', data);
					window.location = '/';
				},
				statusCode: {
					500: function (data) {
						console.log('----error--', data);
						$(messagebox).show()
						console.log('error--');
						$(errormsg).text(data.responseJSON.message);
					}
				}

			});//.done(function(msg){
			// 	$(errormsg).text('Redirecting...');

			// }).fail(function(e){
			// 	$(errormsg).text(e);
			// });
		}
	});
});