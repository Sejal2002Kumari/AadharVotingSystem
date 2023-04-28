


$(document).ready(function () {
	$('.modal').modal();
	// $.ajax({
	//    url: '/getaddress',
	//    method: 'post'
	// }).done(function(){
	// 	console.log('done');
	// });

	// Web3 = require('web3');
	//
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
	VotingContract = web3.eth.contract(abi);
	contractInstance = VotingContract.at('0xa7fb89a3fe6927b6d272637b148775f6fee5a8cf');
	// candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}


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

	var aadhaar_list = {
		"735161990048": "Durgapur",
		"735161990049": "Telengana",
		"735161990050": "Durgapur",
		"735161990051": "Asansol",
		"735161990052": "Kolkata",
	}

	var aadhaar = readCookie('aadhaar');

	console.log(aadhaar);
	var address = aadhaar_list[aadhaar];
	console.log(address);
	$('#loc_info').text('Location based on Aadhaar : ' + address)

	function isVoted(usernameaddhaar) {
		const votesByUsers = readCookie('Voted') || "";
		if (votesByUsers.split(',').indexOf(usernameaddhaar) > -1) {
			return true;
		}
		return false;
	}
	function voted(usernameaddhaar) {
		const votesByUsers = readCookie('Voted') || "";
		var d = new Date();
		d.setTime(d.getTime() + (1*24*60*60*100));
		var expires = "expires="+ d.toUTCString();
		//document.cookie = 'Voted=' + votesByUsers == "" ? usernameaddhaar : votesByUsers + "," + usernameaddhaar;
		document.cookie = 'Voted' + "=" + (votesByUsers == "" ? usernameaddhaar : votesByUsers + "," + usernameaddhaar) + ";" + expires + ";path=/";
	}
	function disable() {
		$('#vote1').addClass("disabled");
		$('#vote2').addClass("disabled");
		$('#vote3').addClass("disabled");
		$('#vote4').addClass("disabled");

		//logout
		document.cookie = "show=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
		document.cookie = "aadhaar=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
		document.cookie = 'auth' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		document.cookie = 'username' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		window.location = '/';


	}

	$('#vote1').click(function () {

		contractInstance.voteForCandidate('Modi', { from: web3.eth.accounts[0] }, function () {
			alert('vote submited to Narendra Modi');
			voted(readCookie('aadhaar'));
			disable();
			$('#loc_info').text('Vote submited successfully to Narendra Modi')
			document.cookie = 'ModiVote=' + (Number(readCookie('ModiVote') || 0) + 1);
		});
	})
	$('#vote2').click(function () {
		contractInstance.voteForCandidate('Gandhi', { from: web3.eth.accounts[0] }, function () {
			alert('vote submited to Rahul Gandhi');
			voted(readCookie('aadhaar'));
			disable();
			$('#loc_info').text('Vote submited successfully to Rahul Gandhi');
			document.cookie = 'GandhiVote=' + (Number(readCookie('GandhiVote') || 0) + 1);
		});
	})
	$('#vote3').click(function () {
		contractInstance.voteForCandidate('Pawar', { from: web3.eth.accounts[0] }, function () {
			alert('vote submited to Sharad Pawar');
			voted(readCookie('aadhaar'));
			disable();

			$('#loc_info').text('Vote submited successfully to Sharad Pawar');
			document.cookie = 'PawarVote=' + (Number(readCookie('PawarVote') || 0) + 1);
		});
	})
	$('#vote4').click(function () {
		contractInstance.voteForCandidate('Banerjee', { from: web3.eth.accounts[0] }, function () {
			alert('vote submited to Mamata Banerjee');
			voted(readCookie('aadhaar'));
			disable();
			$('#loc_info').text('Vote submited successfully to Mamata Banerjee');
			document.cookie = 'BanerjeeVote=' + (Number(readCookie('BanerjeeVote') || 0) + 1);
		});
	})

	if (isVoted(readCookie('aadhaar'))) {
		$('#loc_info').text('You have already voted.');
		$('#vote1').addClass("disabled");
		$('#vote2').addClass("disabled");
		$('#vote3').addClass("disabled");
		$('#vote4').addClass("disabled");

	}
});