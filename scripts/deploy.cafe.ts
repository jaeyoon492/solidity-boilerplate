import { ethers, upgrades } from "hardhat";

async function main() {
  // 초기 CafeContract 배포
  const CafeContract = await ethers.getContractFactory("CafeContract");
  const cafeContract = await upgrades.deployProxy(CafeContract, [], {
    initializer: "initialize",
  });
  await cafeContract.deployed();
  console.log("CafeContract deployed to:", cafeContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
