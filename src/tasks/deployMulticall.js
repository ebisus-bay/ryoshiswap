const hre = require("hardhat");



async function main() {
  const Multicall2 = await hre.ethers.getContractFactory("Multicall2");
  const multicall2 = await Multicall2.deploy();

  await multicall2.waitForDeployment();
  const multicallAddress = await multicall2.getAddress();

  console.log("Multicall2 deployed to:", multicallAddress);
  await delay(10000);
  await hre.run("verify:verify", {
      address: multicallAddress,
      constructorArguments: [],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });