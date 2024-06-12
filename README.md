>>installed yarn 
>> then solcjs
   >> yarn global add solc
   >> yarn solcjs --help

To compile the SimpleStorage.sol file 
>> yarn solcjs --bin --abi --include-path node-modules/ --base-path . -o. SimpleSDtorage.sol
   This compiles the SimpleStorage contract and creates two files SimpleStorage_sol_SimpleStorage.abi and SimpleStorage_sol_SimpleStorage.bin for abi and binary of the contract respectively respectively

>> added the script in package.json so that when we enter 'yarn compile' The whole command will run for us