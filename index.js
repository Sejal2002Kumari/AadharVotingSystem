var express = require('express');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');	
var passwordHash = require('password-hash');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var request = require('request');
var fs = require('fs');
Web3 = require('web3')
solc = require('solc')
var app = express();
app.use( bodyParser.json() )
app.use(cookieParser());
app.use(morgan('combined'));




app.use("/", express.static("ui"));


var username;
var password;

app.post('/login', function(req, res) {
    
	console.log(req.body);
    username = req.body.username;
    password = req.body.password;
    var hashedPassword = passwordHash.generate(password);
    console.log(hashedPassword);
    const JSONdb = require('simple-json-db');
	const db = new JSONdb('users.json');
    if (username == "admin" && password == "password") {

    	res.status(200).send({ message: {username: username, password : hashedPassword}});

    } 
	else if(db.has(username) && db.get(username) == password)
	{
		res.status(200).send({ message: {username: username, password : hashedPassword}});
	}
	else{
    	res.status(500).send({ message: 'error' });
    }
});
app.post('/register', function(req, res) {
	console.log("Register called");
    debugger;

	console.log(req.body);
    username = req.body.username;
    password = req.body.password;
    var hashedPassword = passwordHash.generate(password);
    console.log(hashedPassword);
    
    if (username != "" && password != "") {
		console.log('username=',username,'password=',password);
		const JSONdb = require('simple-json-db');
		console.log('username:',username,'password:',password);


		const db = new JSONdb('users.json');
		console.log('username=++',username,'password=++',password);
		if(db.has(username)){

			console.log('username=',username,'password=',password, 'db=' , db.has(username), 'dbGet=' , db.get(username));
			res.status(500).send({ message: 'username already exist' });
			console.log('username=',username,'password=',password, 'db==', db.has(username));
			
		}
		else{
			db.set(username, password);
			console.log('username======',username,'password=',password);
			res.status(200).send({ message: hashedPassword});
			console.log('username------',username,'password=',password);
		}
		

    } else {
    	res.status(500).send({ message: 'error' });
    }
});

app.post('/auth', function(req, res) {
	var cookie_pass = req.cookies['auth'];
	if (passwordHash.verify('password', cookie_pass)) {
		res.status(200).send({ message: hashedPassword});
	} else {
		res.status(500).send({ message: 'error' });
	}
});

app.get('/',function(req,res){
	var cookie_pass = req.cookies['auth'];
	if (passwordHash.verify('password', cookie_pass)) {
		res.sendFile(path.join(__dirname, 'ui', 'app.html'));
	} else {
		console.log('ok');
	}
});

app.get('/app', function(req, res){
	console.log("----------------");
	var cookie_pass = req.cookies['auth'];
	var cookie_otp = req.cookies['show'];
	console.log("0==", cookie_otp , cookie_pass);
	if (passwordHash.verify('password', cookie_pass) && cookie_otp != null) {
		//res.sendFile(path.join(__dirname, 'ui', 'clist.html'));
		console.log("1=", cookie_otp , cookie_pass);
		res.redirect('/info');
		
		

	} else if (cookie_otp == null && passwordHash.verify('password', cookie_pass)) {
		console.log("2=" , cookie_otp , cookie_pass);
		res.sendFile(path.join(__dirname, 'ui', 'app.html'));
	}
	else {
		console.log("3=" , cookie_otp , cookie_pass);
		res.redirect('/');
	}
	
});
app.get('/summary', function(req, res){
	var cookie_pass = req.cookies['auth'];
	//var cookie_otp = req.cookies['show'];

	if (passwordHash.verify('password', cookie_pass) ) {
		//res.sendFile(path.join(__dirname, 'ui', 'clist.html'));
		res.sendFile(path.join(__dirname, 'ui', 'summary.html'));
		

	} 
	// else if ( passwordHash.verify('password', cookie_pass)) {
	// 	res.sendFile(path.join(__dirname, 'ui', 'app.html'));
	// }
	// else {
	// 	res.redirect('/');
	// }
	
});
// app.post('/getaddress',function(req,res){

// });

app.get('/info', function(req, res){
	var cookie_pass = req.cookies['auth'];
	var cookie_otp = req.cookies['show'];
	if (cookie_pass == null || cookie_pass == '' || cookie_otp == null || cookie_otp == '') {
		res.redirect('/app');
	} else {
		web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		 code = fs.readFileSync('Voting.sol').toString()

		 compiledCode = solc.compile(code)
		 abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
		 VotingContract = web3.eth.contract(abiDefinition)
		 byteCode = compiledCode.contracts[':Voting'].bytecode
		 deployedContract = VotingContract.new(['Modi', 'Gandhi', 'Pawar', 'Banerjee'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
		
		contractInstance = VotingContract.at(deployedContract.address)

		res.sendFile(path.join(__dirname, 'ui', 'clist.html'));
	}
	
});




var port = 8080;
app.listen(8080, function () {
  console.log(`app listening on port ${port}!`);
});