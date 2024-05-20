import { BaseContract } from "ethers";

export function contractTypeAssertion<T extends BaseContract>(
  contract: BaseContract
) {
  return contract as T;
}
