import hre from "hardhat";

export async function deployFixture() {
  const [owner, account1, account2, relayer] =
    await hre.viem.getWalletClients();

  return {
    owner,
    account1,
    relayer,
    account2,
  };
}
