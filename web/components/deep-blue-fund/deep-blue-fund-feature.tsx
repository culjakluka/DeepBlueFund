'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import DeepBlueFundTable from './deep-blue-fund-table';

interface DeepBlueFundFeatureProps {
  projects: any;
}

export default function DeepBlueFundFeature({ projects }: DeepBlueFundFeatureProps) {
  const { publicKey } = useWallet();

  return publicKey ? (
    <div>
      <DeepBlueFundTable projects={projects} />
    </div>
  ) : (
    <div className='text-center text-2xl my-32'>
      <p>Please connect your wallet to view available projects.</p>
    </div>
  );
}
