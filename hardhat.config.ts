import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ledger";
import "@nomicfoundation/hardhat-toolbox";

import * as dotenv from "dotenv";
dotenv.config();

// tasks
import "./src/tasks/accounts";

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      blockGasLimit: 30000000
    },
    cronos : {
      url : "https://rpc.ebisusbay.com/",
      chainId: 25,
      // accounts: process.env.SIGNER !== undefined ? [process.env.SIGNER] : [],
      ledgerAccounts:[
        '0x454cfAa623A629CC0b4017aEb85d54C42e91479d'
      ],
      factory : '0x5f1D751F447236f486F4268b883782897A902379',
      wcro : '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23',
      router : '0xa476c97D8d1ec7D263EAfa0039645DBe0cc0a012'
    },
    testnet_cronos : {
      url : "https://rpc.ebisusbay.biz/",
      chainId : 338,
      accounts:  process.env.SIGNER !== undefined ? [process.env.SIGNER] : [],
      factory : '0x6202A2640a092229B770A82be719aF610e4C5719',
      wcro: '0x467604E174c87042fcc4412c5BC70AaBc8733016',
      router : '0x610a6717EDC11A62A3BaA81bb88Da9637D23f90C'
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 9999,
      },
      metadata: {
        bytecodeHash: "none",
      },
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v6",
  },
  paths: {
    tests: "./src/test",
  },

  etherscan: {
    apiKey: {
      cronos: process.env.CRONOS_API_KEY,
      testnet_cronos: process.env.CRONOS_TEST_API_KEY,
    },
    customChains: [
      {
        network: "cronos",
        chainId: 25,
        urls: {
          apiURL: "https://api.cronoscan.com/api",
          browserURL: "https://cronoscan.com/",
        },
      },{
        network: "testnet_cronos",
        chainId : 338,
        urls:{
          apiURL: "https://explorer-api.cronos.org/testnet/api/v1/hardhat/contract?apikey=" + process.env.CRONOS_TEST_API_KEY,
          browserURL : "http://explorer.cronos.org/testnet"
        }
      }
    ]
   }

};

export default config;
