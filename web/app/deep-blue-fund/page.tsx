import DeepBlueFundFeature from '@/components/deep-blue-fund/deep-blue-fund-feature';
import PocketBase from 'pocketbase';

export default async function Page() {
  const url = 'https://deep-blue-fund.pockethost.io/';
  const client = new PocketBase(url);

  const projects = await client.collection('seaCleaningProjects').getFullList();

  return <DeepBlueFundFeature projects={projects} />;
}
