// use this to generate the hardcode that goes in the server
const MerkleTree = require('./MerkleTree');
const niceList = require('./niceList');

const merkleTree = new MerkleTree(niceList);
const root = merkleTree.getRoot();

console.log('root', root);