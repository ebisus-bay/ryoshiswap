import { HardhatUserConfig } from "hardhat/config";
// import "@nomicfoundation/hardhat-ledger";
// import "@nomicfoundation/hardhat-toolbox";
import "@matterlabs/hardhat-zksync";

import * as dotenv from "dotenv";
dotenv.config();

// tasks
// import "./src/tasks/accounts";

const config: HardhatUserConfig = {
  zksolc: {
    version: "1.4.1",
    settings: {}
  },
  defaultNetwork: "testnet_zkcronos",
  networks: {
    hardhat :{
      zksync: false,
    },
    testnet_zkcronos : {
      url : "https://testnet.zkevm.cronos.org",
      chainId: 282,
      accounts: process.env.SIGNER !== undefined ? [process.env.SIGNER] : [],
      ethNetwork : 'sepolia',
      zksync: true
    }


  },
  solidity: {
    version: "0.8.13",
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
  // gasReporter: {
  //   enabled: process.env.REPORT_GAS !== undefined,
  //   currency: "USD",
  // },
  // typechain: {
  //   outDir: "typechain-types",
  //   target: "ethers-v6",
  // },
  // paths: {
  //   tests: "./src/test",
  // },

  // etherscan: {
  //   apiKey: {
  //     cronos: process.env.CRONOS_API_KEY,
  //     testnet_cronos: process.env.CRONOS_TEST_API_KEY,
  //   },
  //   customChains: [
  //     {
  //       network: "cronos",
  //       chainId: 25,
  //       urls: {
  //         apiURL: "https://api.cronoscan.com/api",
  //         browserURL: "https://cronoscan.com/",
  //       },
  //     },{
  //       network: "testnet_cronos",
  //       chainId : 338,
  //       urls:{
  //         apiURL: "https://explorer-api.cronos.org/testnet/api/v1/hardhat/contract?apikey=" + process.env.CRONOS_TEST_API_KEY,
  //         browserURL : "http://explorer.cronos.org/testnet"
  //       }
  //     }
  //   ]
  //  }

};

export default config;
