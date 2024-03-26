
// This is a script to deploy the Router contract to the network.
const hre = require("hardhat");
const {delay} = require("./utils");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const wcroAddress = hre.config.networks[hre.network.name].wcro;
    const factoryAddress = hre.config.networks[hre.network.name].factory;
    const signerAddress = deployer.address;
    console.log("Deploying contracts with the account:", signerAddress);
    const Router = await hre.ethers.getContractFactory("RyoshiRouter");
    const router = await Router.deploy(factoryAddress, wcroAddress);
    
    await router.waitForDeployment();
    const routerAddress = await router.getAddress();
    console.log("Router deployed to:", routerAddress);

    console.log("Verifying Router contract");
    await delay(15000);
    await hre.run("verify:verify", {
        address: routerAddress,
        constructorArguments: [factoryAddress, wcroAddress],
    });
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });