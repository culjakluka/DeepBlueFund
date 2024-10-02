'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { ExplorerLink } from '../cluster/cluster-ui';
import { WalletButton } from '../solana/solana-provider';
import { AppHero, ellipsify } from '../ui/ui-layout';
import { useDeepBlueFundProgram } from './deep-blue-fund-data-access';
import { DeepBlueFundCreate, DeepBlueFundProgram } from './deep-blue-fund-ui';
import DeepBlueFundTable from './deep-blue-fund-table';

export default function DeepBlueFundFeature() {
  const { publicKey } = useWallet();
  const { programId } = useDeepBlueFundProgram();

  return publicKey ? (
    <div>
      <AppHero
        title='DeepBlueFund'
        subtitle={'Run the program by clicking the "Run program" button.'}
      >
        <p className='mb-6'>
          <ExplorerLink
            path={`account/${programId}`}
            label={ellipsify(programId.toString())}
          />
        </p>
        <DeepBlueFundCreate />
        <DeepBlueFundTable />
      </AppHero>
      <DeepBlueFundProgram />
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
