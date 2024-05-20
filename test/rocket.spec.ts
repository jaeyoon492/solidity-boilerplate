import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { upgrades, ethers, viem } from "hardhat";
import { AbiCoder, keccak256, parseEther } from "ethers";
import { expect, assert } from "chai";

describe("nft test", function () {
  async function deployFixture() {
    const [owner, account1, account2, relayer] = await viem.getWalletClients();

    return {
      owner,
      account1,
      account2,
    };
  }

  it("Deployment", async () => {
    const {} = await loadFixture(deployFixture);
  });
});
