const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  console.log('args', process.argv);
  if(process.argv.length!==3){
    console.error('expected 1 argument, received', process.argv.length - 2);
    process.exit(1);
  }
  const leafName = process.argv[2];
  const leafIndex = niceList.indexOf(leafName);

  // it would make sense to just abort here as we on teh client know we're invalid, but we'll allow it to go to the server
  // to show that the proving prevents access
  // if(leafIndex<0){
  //   console.error('not on the nice list, aborting');
  //   process.exit(1);
  // }

  const merkleTree = new MerkleTree(niceList);
  const proof = merkleTree.getProof(leafIndex);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    leafName,
    proof
  });

  console.log({ gift });
}

main();