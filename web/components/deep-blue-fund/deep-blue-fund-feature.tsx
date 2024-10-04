'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { ExplorerLink } from '../cluster/cluster-ui';
import { WalletButton } from '../solana/solana-provider';
import { AppHero, ellipsify } from '../ui/ui-layout';
import { useDeepBlueFundProgram } from './deep-blue-fund-data-access';
import { DeepBlueFundCreate, DeepBlueFundProgram } from './deep-blue-fund-ui';
import DeepBlueFundTable from './deep-blue-fund-table';
import DeepBlueProjectForm from './deep-blue-project-form';
import { Sheet } from '../shadcn/Sheet';

export default function DeepBlueFundFeature() {
  const { publicKey } = useWallet();

  return publicKey ? (
    <div>
      <DeepBlueFundTable />
      <DeepBlueProjectForm />
    </div>
  ) : (
    <div className='max-w-4xl mx-auto'>
      <div className='hero py-[64px]'>
        <div className='hero-content text-center'>
          <WalletButton className='btn btn-primary' />
        </div>
      </div>
    </div>
  );
}
