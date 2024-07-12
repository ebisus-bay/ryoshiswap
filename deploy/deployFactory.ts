import { utils, Wallet } from "zksync-ethers";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync";

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script`);
  const deployer = await hre.deployer.getWallet(0);
  console.log(deployer.address);
  const artifact = await hre.deployer.loadArtifact("RyoshiFactory");
  const factoryContract = await hre.deployer.deploy(artifact, [deployer.address]);

  // Show the contract info.
  console.log(`${artifact.contractName} was deployed to ${await factoryContract.getAddress()}`);


  await factoryContract.setFeeTo(deployer);

}