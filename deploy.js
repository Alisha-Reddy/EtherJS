const ethers = require("ethers");
const fs = require("fs");

async function main() {
  // We can either compile the contacts in our code or
  // We can compile them seperately
  // We will be compiling them seperately using our solcjs

  // Ganche RPC server: http://127.0.0.1:7545 (end point of our Ganache node right now)

  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  // This says hey! we r connecting this url to here and this is how our script gets connected to our local blockchain

  // Setting up our wallet(The one from ganche)

  // const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider); //Wallet() require the parameters private key and provider
  // However it is advisable not to paste private key directly into the code
  
  
  const encryptedJson = fs.readFileSync("./encryptedKey.json", "utf8"); //Since our private key is encrypted, we will be initialising a wallet with encrypted key
  let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    encryptedJSon,
    process.env.PRIVATE_KEY_PASSWORD
  );
  wallet = await wallet.connect(provider); //Making sure the wallet connects with provider

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy(); //STOP HERE! Wait for the contract to be deployed
  await contract.deployTransaction.wait(1);

  // const transactionReceipt = await contract.deployTransaction.wait(1);
  // console.log("Her is the deployment transaction (transaction response):");
  // console.log(contract.deployTransaction);
  // console.log("Here is the transaction receipt:")
  // console.log(transactionReceipt);

  // console.log("let's deploy with only transaction data!:");
  // const tx = {
  //   nonce: 4,
  //   gasPrice: 20000000000,
  //   gasLimit: 1000000,
  //   to: null,
  //   value: 0,
  //   data: "6080604052348015600e575f80fd5b5061090b8061001c5f395ff3fe608060405234801561000f575f80fd5b5060043610610060575f3560e01c80632e64cec11461006457806345179b1f146100825780636057361d146100b25780636f760f41146100ce5780639e7a13ad146100ea578063c7a0d9f61461011b575b5f80fd5b61006c610139565b60405161007991906102d2565b60405180910390f35b61009c60048036038101906100979190610438565b610141565b6040516100a991906102d2565b60405180910390f35b6100cc60048036038101906100c791906104a9565b61016e565b005b6100e860048036038101906100e391906104d4565b610177565b005b61010460048036038101906100ff91906104a9565b610200565b60405161011292919061058e565b60405180910390f35b6101236102b5565b60405161013091906102d2565b60405180910390f35b5f8054905090565b6002818051602081018201805184825260208301602085012081835280955050505050505f915090505481565b805f8190555050565b5f6040518060400160405280838152602001848152509050600181908060018154018082558091505060019003905f5260205f2090600202015f909190919091505f820151815f015560208201518160010190816101d591906107b6565b505050816002846040516101e991906108bf565b908152602001604051809103902081905550505050565b6001818154811061020f575f80fd5b905f5260205f2090600202015f91509050805f015490806001018054610234906105e9565b80601f0160208091040260200160405190810160405280929190818152602001828054610260906105e9565b80156102ab5780601f10610282576101008083540402835291602001916102ab565b820191905f5260205f20905b81548152906001019060200180831161028e57829003601f168201915b5050505050905082565b5f5481565b5f819050919050565b6102cc816102ba565b82525050565b5f6020820190506102e55f8301846102c3565b92915050565b5f604051905090565b5f80fd5b5f80fd5b5f80fd5b5f80fd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b61034a82610304565b810181811067ffffffffffffffff8211171561036957610368610314565b5b80604052505050565b5f61037b6102eb565b90506103878282610341565b919050565b5f67ffffffffffffffff8211156103a6576103a5610314565b5b6103af82610304565b9050602081019050919050565b828183375f83830152505050565b5f6103dc6103d78461038c565b610372565b9050828152602081018484840111156103f8576103f7610300565b5b6104038482856103bc565b509392505050565b5f82601f83011261041f5761041e6102fc565b5b813561042f8482602086016103ca565b91505092915050565b5f6020828403121561044d5761044c6102f4565b5b5f82013567ffffffffffffffff81111561046a576104696102f8565b5b6104768482850161040b565b91505092915050565b610488816102ba565b8114610492575f80fd5b50565b5f813590506104a38161047f565b92915050565b5f602082840312156104be576104bd6102f4565b5b5f6104cb84828501610495565b91505092915050565b5f80604083850312156104ea576104e96102f4565b5b5f83013567ffffffffffffffff811115610507576105066102f8565b5b6105138582860161040b565b925050602061052485828601610495565b9150509250929050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f6105608261052e565b61056a8185610538565b935061057a818560208601610548565b61058381610304565b840191505092915050565b5f6040820190506105a15f8301856102c3565b81810360208301526105b38184610556565b90509392505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061060057607f821691505b602082108103610613576106126105bc565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f600883026106757fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8261063a565b61067f868361063a565b95508019841693508086168417925050509392505050565b5f819050919050565b5f6106ba6106b56106b0846102ba565b610697565b6102ba565b9050919050565b5f819050919050565b6106d3836106a0565b6106e76106df826106c1565b848454610646565b825550505050565b5f90565b6106fb6106ef565b6107068184846106ca565b505050565b5b818110156107295761071e5f826106f3565b60018101905061070c565b5050565b601f82111561076e5761073f81610619565b6107488461062b565b81016020851015610757578190505b61076b6107638561062b565b83018261070b565b50505b505050565b5f82821c905092915050565b5f61078e5f1984600802610773565b1980831691505092915050565b5f6107a6838361077f565b9150826002028217905092915050565b6107bf8261052e565b67ffffffffffffffff8111156107d8576107d7610314565b5b6107e282546105e9565b6107ed82828561072d565b5f60209050601f83116001811461081e575f841561080c578287015190505b610816858261079b565b86555061087d565b601f19841661082c86610619565b5f5b828110156108535784890151825560018201915060208501945060208101905061082e565b86831015610870578489015161086c601f89168261077f565b8355505b6001600288020188555050505b505050505050565b5f81905092915050565b5f6108998261052e565b6108a38185610885565b93506108b3818560208601610548565b80840191505092915050565b5f6108ca828461088f565b91508190509291505056fea26469706673582212204fbac9038befbafb02a2cbbfcfb5d4c718e61774bda28cc1f2c154853f079ca664736f6c634300081a0033",
  //   chainId: 5777,
  // };
  // const signedTxResponse = await wallet.signTransaction(tx); //However there is no transactio in the history
  // console.log(signedTxResponse);

  // // To send transaction, follow the below
  // const sentTxResponse = await wallet.sendTransaction(tx);
  // await sentTxResponse.wait(1);
  // console.log(sentTxResponse);

  // Get Number
  const currentFavNumber = await contract.retrieve(); //Since the retrieve() is a view function, it does not cost us any gas
  console.log(`Current Favourible Number: ${currentFavNumber.toString()}`);

  const transactionResponse = await contract.store("7"); //Here you r giving the value to the function
  const transactionReceipt = await transactionResponse.wait(1);
  const updatedFavNumber = await contract.retrieve(); //Now i is to display the number
  console.log(`Updates favourite number is; ${updatedFavNumber}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
