Step 1: Open powershell and run
E:\FinalYearProject\techdot> node_modules/.bin/testrpc

Step 2: Open another powershell and run
E:\FinalYearProject\techdot> node

And Run all below commands in one go and press enter if required
E:\FinalYearProject\techdot> 
Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.accounts;
code = fs.readFileSync('Voting.sol').toString();
solc = require('solc');
compiledCode = solc.compile(code);


Step 3: Open another powershell and run
E:\FinalYearProject\techdot> node index.js