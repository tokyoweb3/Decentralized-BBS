var CryptoBoard = artifacts.require("./CryptoBoard.sol");

module.exports = function(deployer) {
  deployer.deploy(CryptoBoard);
};
