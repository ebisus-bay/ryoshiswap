
import { utils, Wallet } from "zksync-ethers";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync";

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script`);
  const deployer = await hre.deployer.getWallet(0);
  const wcro = '0xf9bb37013de8cd3f89b3623af9ee1b1b32d872c9'
  const factory = '0x519288687016Dd5199F454123F44D5016fF7Dd5a'
  console.log(deployer.address);
  const artifact = await hre.deployer.loadArtifact("RyoshiRouter");
  const factoryContract = await hre.deployer.deploy(artifact, [factory, wcro]);

  // Show the contract info.
  console.log(`${artifact.contractName} was deployed to ${await factoryContract.getAddress()}`);
}