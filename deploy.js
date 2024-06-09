async function main() {
    // We can either compile the contacts in our code or
    // We camn compile them seperately
    // We will be compiling them seperately using our solcjs
    
}

main()
  .then(() => ProcessingInstruction.exit(0))
  .catch((error) => {
    console.log(error);
    ProcessingInstruction.exit(1);
  });
