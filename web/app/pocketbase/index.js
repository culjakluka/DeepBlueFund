import PocketBase from 'pocketbase';

const url = 'https://deep-blue-fund.pockethost.io/';
const client = new PocketBase(url);

// await adminClient.admins.authWithPassword(
//   process.env.dbUsername,
//   process.env.dbPassword,
//   {
//     // This will trigger auto refresh or auto reauthentication in case
//     // the token has expired or is going to expire in the next 30 minutes.
//     autoRefreshThreshold: 30 * 60,
//   }
// );

export default client;
