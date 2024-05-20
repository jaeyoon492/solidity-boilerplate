import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { upgrades, ethers, network } from "hardhat";
import { assert, expect } from "chai";
import { CafeContract } from "../typechain/src/contracts/ethereum/upgradeable/Cafe.sol";
import { CafeContractV2 } from "../typechain/src/contracts/ethereum/upgradeable/CafeV2.sol/CafeContractV2";
import { contractTypeAssertion } from "./helper/typeAssertion";

export async function deployFixture() {
  const [owner, account1, account2] = await ethers.getSigners();

  const CafeContract = await ethers.getContractFactory<any, CafeContract>(
    "CafeContract"
  );
  const deploymentCafeContract = await upgrades.deployProxy(CafeContract, [], {
    initializer: "initialize",
  });
  await deploymentCafeContract.waitForDeployment();
  console.log("Proxy deployed to:", await deploymentCafeContract.getAddress());
  const cafeContract = contractTypeAssertion<CafeContract>(
    deploymentCafeContract.connect(owner)
  );

  return {
    owner,
    account1,
    account2,
    cafeContract,
  };
}

export async function initializeFixture() {
  const { cafeContract, ...other } = await loadFixture(deployFixture);

  await cafeContract.addMenuItem({ name: "Coffee", price: 100 });
  const item = await cafeContract.getMenuItem(0);
  console.log("Initialize Done! - ", item);

  return {
    cafeContract,
    ...other,
  };
}

describe("CafeContract", function () {
  it("add menu", async function () {
    const { cafeContract } = await loadFixture(initializeFixture);

    // 메뉴 항목 추가 - 라떼
    await cafeContract.addMenuItem({ name: "Latte", price: 200 });
    let item = await cafeContract.getMenuItem(1);

    expect(item.name).to.equal("Latte");
    expect(item.price).to.equal(BigInt(200));
  });

  it("update menu price", async function () {
    const { cafeContract, owner } = await loadFixture(initializeFixture);
    // 가격 업데이트
    await cafeContract.updateMenuItemPrice(0, 150);
    let item = await cafeContract.getMenuItem(0);

    expect(item[1]).to.equal(BigInt(150));
  });

  it("delete menu", async function () {
    // 메뉴 삭제
    const { cafeContract, owner } = await loadFixture(initializeFixture);
    try {
      await cafeContract.deleteMenuItem(0);
      await cafeContract.getMenuItem(0);
    } catch (error) {
      assert.include(error.message, "Menu item does not exist");
    }
  });
});
