$(document).ready(function () {
  $('.modal').modal()
  // $.ajax({
  //    url: '/getaddress',
  //    method: 'post'
  // }).done(function(){
  // 	console.log('done');
  // });

  // Web3 = require('web3');
  //
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
  abi = JSON.parse(
    '[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]',
  )
  VotingContract = web3.eth.contract(abi)
  contractInstance = VotingContract.at(
    '0xa7fb89a3fe6927b6d272637b148775f6fee5a8cf',
  )
  // candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}

  //check cookie
  function readCookie(name) {
    var nameEQ = name + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) == ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  }

//   $('#loc_info').text('');
//   let c1 = 0 //
//   $(document).ready(function () {
//     console.log(++c1) //
//     let result = document.querySelector('#vote1') //
//     result.innerText = c1.valueOf //
//     var votes = contractInstance.totalVotesFor.call('Modi').toLocaleString()
//     console.log('votes', votes)
//     let modiVoteCount = contractInstance.totalVotesFor(
//       'Modi',
//       { from: web3.eth.accounts[0] },
//       function (e, data) {
//         console.log('e, data', e, data)
//       },
//     )
//     //  function() {
//     //     alert('vote submited to Narendra Modi');
//     //     disable();
//     //     $('#loc_info').text('Vote submited successfully to Narendra Modi')

//     // });
//   })

//blockchain code of vote count
  var modiVotes = contractInstance.totalVotesFor.call('Modi').toLocaleString();
	var gandgiVotes = contractInstance.totalVotesFor.call('Gandhi').toLocaleString();
	var pawarVotes = contractInstance.totalVotesFor.call('Pawar').toLocaleString();
	var banerjeeVotes = contractInstance.totalVotesFor.call('Banerjee').toLocaleString();
	$('#vote1').html(Number(readCookie('ModiVote') || 0 ));
	$('#vote2').html(Number(readCookie('GandhiVote') || 0 ));
	$('#vote3').html(Number(readCookie('PawarVote') || 0 ));
	$('#vote4').html(Number(readCookie('BanerjeeVote') || 0 ));
})
