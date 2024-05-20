import { ethers, upgrades } from "hardhat";

async function main() {
  const cafeContractAddress = "";

  console.log("CafeContract address:", cafeContractAddress);

  // CafeContractV2로 업그레이드
  const CafeContract = await ethers.getContractFactory("CafeContract");
  const upgraded = await upgrades.upgradeProxy(
    cafeContractAddress,
    CafeContract
  );
  console.log("CafeContract upgraded to V2 at:", await upgraded.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
