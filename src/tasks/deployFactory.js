

const hre = require("hardhat");
const {delay} = require("./utils");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const signerAddress = deployer.address;
    console.log("Deploying contracts with the account:", deployer);
    const Factory = (await hre.ethers.getContractFactory("RyoshiFactory")).connect(deployer);
    const factory = await Factory.deploy(signerAddress);
    
    await factory.waitForDeployment();
    const factoryAddress = await factory.getAddress();
    console.log("Factory deployed to:", factoryAddress);
    console.log("Setting feeTo address to", signerAddress);
    await factory.setFeeTo(signerAddress);
    console.log("Setting default fee to 15");
    await factory.setDefaultFee(15);
    
    console.log("Verifying Factory contract");
    await delay(15000);
    await hre.run("verify:verify", {
        address: factoryAddress,
        constructorArguments: [signerAddress],
    });
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });