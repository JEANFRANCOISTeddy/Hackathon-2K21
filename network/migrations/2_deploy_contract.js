const Owner = artifacts.require("Owner");
const Degree = artifacts.require("Degree");

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(Owner);
    await Owner.deployed();

    await deployer.deploy(Degree);
    await Degree.deployed();
};