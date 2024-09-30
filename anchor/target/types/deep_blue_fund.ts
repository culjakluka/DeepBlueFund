/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/deep_blue_fund.json`.
 */
export type DeepBlueFund = {
  address: 'A5U7FvjGr6MHy1zCmPuYkPqsN93HdXm4DPoVThdoHg9x';
  metadata: {
    name: 'deepBlueFund';
    version: '0.1.0';
    spec: '0.1.0';
    description: 'Created with Anchor';
  };
  instructions: [
    {
      name: 'greet';
      discriminator: [203, 194, 3, 150, 228, 58, 181, 62];
      accounts: [];
      args: [];
    }
  ];
};
