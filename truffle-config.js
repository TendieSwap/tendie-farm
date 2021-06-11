const HDWalletProvider = require('truffle-hdwallet-provider');
require('dotenv').config();

const DEPLOYER_KEY = process.env.DEPLOYER_KEY;
const TESTNET_DEPLOYER_KEY = process.env.TESTNET_DEPLOYER_KEY;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard BSC port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    maticTest: {
      provider: () => new HDWalletProvider(TESTNET_DEPLOYER_KEY, `https://rpc-mumbai.maticvigil.com`, 0, 10),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      from: '0xd3C1C1c23d9E689832C586D62Bb64620A3D7574f'
    },    
    maticMain: {
      provider: () => new HDWalletProvider(DEPLOYER_KEY, `https://rpc-mainnet.maticvigil.com`, 0, 10),
      network_id: 137,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      from: '0xd3C1C1c23d9E689832C586D62Bb64620A3D7574f'
    },
    bscTest: {
      provider: () => new HDWalletProvider(TESTNET_DEPLOYER_KEY, `https://data-seed-prebsc-1-s1.binance.org:8545`, 0, 10),
      network_id: 97,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      from: '0xd3C1C1c23d9E689832C586D62Bb64620A3D7574f'
    },
    bsc: {
      provider: () => new HDWalletProvider(BSC_DEPLOYER_KEY, `https://bsc-dataseed1.binance.org`, 0, 10),
      network_id: 56,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      from: '0xd3C1C1c23d9E689832C586D62Bb64620A3D7574f'
    },
  },
  plugins: [
    'truffle-plugin-verify',
  ],
  api_keys: {
    // Add BSCSCAN_API_KEY in .env file to verify contracts deployed through truffle
    // etherscan: process.env.BSCSCAN_API_KEY
    etherscan: process.env.ETHERSCAN_API_KEY
  },
  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      //https://forum.openzeppelin.com/t/how-to-deploy-uniswapv2-on-ganache/3885
      version: "0.6.12",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        },
      }
    },
  }
}