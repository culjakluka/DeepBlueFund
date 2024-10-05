import './global.css';
import { UiLayout } from '@/components/ui/ui-layout';
import { ClusterProvider } from '@/components/cluster/cluster-data-access';
import { SolanaProvider } from '@/components/solana/solana-provider';
import { ReactQueryProvider } from './react-query-provider';
import { Space_Grotesk } from 'next/font/google';

export const metadata = {
  title: 'Deep Blue Fund',
  description: 'Solana-dapp for crowdfunding sea cleaning projects',
};

const links: { label: string; path: string }[] = [
  { label: 'Account', path: '/account' },
  { label: 'Clusters', path: '/clusters' },
  { label: 'DeepBlueFund Program', path: '/deep-blue-fund' },
];

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${spaceGrotesk.className} bg-blackbg text-white`}>
        <ReactQueryProvider>
          <ClusterProvider>
            <SolanaProvider>
              <UiLayout links={links}>{children} </UiLayout>
            </SolanaProvider>
          </ClusterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
