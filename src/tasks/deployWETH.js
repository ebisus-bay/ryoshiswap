
const { sign } = require("crypto");
const hre = require("hardhat");

async function delay(ms) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}


async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const signerAddress = deployer.address;
    console.log("Deploying contracts with the account:", signerAddress);
    const WCRO = await hre.ethers.getContractFactory("WETH9");
    const wcro = await WCRO.deploy();
    
    await wcro.waitForDeployment();
    const wcroAddress = await wcro.getAddress();
    console.log("WCRO deployed to:", wcroAddress);
    await delay(5000);
    console.log("Verifying WCRO contract");
    await hre.run("verify:verify", {
        address: wcroAddress,
        constructorArguments: [],
    });
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });