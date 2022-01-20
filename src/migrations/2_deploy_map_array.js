const seed = artifacts.require("SeedToken");
const builder = artifacts.require("Builder");

module.exports = async function (deployer) {
  await deployer.deploy(seed) 
  const seedInstance = await seed.deployed();

  await deployer.deploy(
    builder, 
    seedInstance.address, 
    "0x0000000000000000000000000000000000000001"
  );
};
