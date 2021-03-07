const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync("deploy.secret").toString().trim();

module.exports = {
  networks: {
    development: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/b76d7212db5141be96b1e9533e2ebd0a`),
      network_id: 3,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    testnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/b76d7212db5141be96b1e9533e2ebd0a`),
      network_id: 3,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    eth: {
      provider: () => new HDWalletProvider(mnemonic, `https://mainnet.infura.io/v3/b76d7212db5141be96b1e9533e2ebd0a`),
      network_id: 1,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.6.2"
    }
  }
}
