const Migrations = artifacts.require("Migrations");
const CarBodies = artifacts.require("CarBodies");

module.exports = function (deployer) {
  // deployer.deploy(Migrations);
  deployer.deploy(CarBodies);
};
