// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import DeepBlueFundIDL from '../target/idl/deep_blue_fund.json';
import type { DeepBlueFund } from '../target/types/deep_blue_fund';

// Re-export the generated IDL and type
export { DeepBlueFund, DeepBlueFundIDL };

// The programId is imported from the program IDL.
export const DEEP_BLUE_FUND_PROGRAM_ID = new PublicKey(DeepBlueFundIDL.address);

// This is a helper function to get the DeepBlueFund Anchor program.
export function getDeepBlueFundProgram(provider: AnchorProvider) {
  return new Program(DeepBlueFundIDL as DeepBlueFund, provider);
}

// This is a helper function to get the program ID for the DeepBlueFund program depending on the cluster.
export function getDeepBlueFundProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
    default:
      return DEEP_BLUE_FUND_PROGRAM_ID;
  }
}
