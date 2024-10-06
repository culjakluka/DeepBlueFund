'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import PocketBase from 'pocketbase';
import { useState, useEffect } from 'react';

export default function ProjectPage({ params }: { params: { id: string } }) {
  const url = 'https://deep-blue-fund.pockethost.io/';
  const client = new PocketBase(url);

  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [project, setProject] = useState<any>(null);
  const wallet = useWallet();

  // Fetch project data on component mount
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const fetchedProject = await client.collection('seaCleaningProjects').getOne(params.id);
        setProject(fetchedProject);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    fetchProject();
  }, [params.id]);

  // Handle input change for donation amount
  const handleDonationChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setDonationAmount(parseFloat(e.target.value));
  };

  // Handle donation process
  const handleDonation = async () => {
    if (!wallet.publicKey || !project) return;

    try {
      // Create a donation transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(project.ownerWalletPublicKey),
          lamports: Math.floor(donationAmount * 1_000_000_000), // Assuming conversion from USD to SOL equivalent
        })
      );

      const connection = new Connection("https://api.devnet.solana.com", "confirmed");
      const signedTransaction = await wallet.sendTransaction(transaction, connection);

      if (signedTransaction) {
        console.log("Donation successful");

        // Update the project's collected amount and add the donation record
        await client.collection('seaCleaningProjects').update(project.id, {
          collectedAmount: project.collectedAmount + donationAmount,
        });

        await client.collection('donation').create({
          projectId: project.id,
          walletPublicKey: wallet.publicKey.toBase58(),
          donatedAmount: donationAmount,
          transactionId: signedTransaction,
        });
      }
    
    } catch (err) {
      console.error('Error processing donation:', err);
    }
  };

  // Show loading state if project data hasn't loaded yet
  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row justify-between gap-12 p-20 text-white rounded-xl shadow-lg max-w-5xl w-full mt-24">
      <div className="flex flex-col gap-8">
        <div className="mx-12">
          <h1 className="text-4xl mb-4 font-bold">{project.projectOwner}</h1>
          <span className={`text-lg px-3 py-1 rounded-md ${
            project.status === 0 ? 'bg-green-500' :
            project.status === 1 ? 'bg-orange-500' :
            project.status === 2 ? 'bg-red-500' : 'bg-gray-500'
          }`}>
            {project.status === 0 ? 'Active' :
             project.status === 1 ? 'Upcoming' :
             project.status === 2 ? 'Finished' : 'Unknown'}
          </span>

          <p className="text-gray-400 text-lg mt-10">
            {project.collectedAmount.toLocaleString()} USD collected of {project.fundingGoal.toLocaleString()} USD
          </p>

          <div className="w-full bg-gray-700 rounded-full h-4 mt-4">
            <div
              className="bg-blue-600 h-4 rounded-full"
              style={{ width: `${Math.min((project.collectedAmount / project.fundingGoal) * 100, 100)}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            {((project.collectedAmount / project.fundingGoal) * 100).toFixed(2)}% funded
          </p>
        </div>

        <p className="text-gray-400 text-xl">
          {project.description}
        </p>
      </div>

      <div className="rounded-lg shadow-xl flex flex-col gap-6">
        <div className="flex gap-8 items-center">
          <h2 className="text-2xl font-bold">Total Rewards:</h2>
          <p className="text-3xl font-semibold">{project.fundingGoal.toLocaleString()} USD</p>
        </div>

        <div className="flex flex-col gap-6 border-t border-gray-600 pt-6">
          <div className="flex justify-between">
            <span className="text-gray-400 text-lg">Status:</span>
            <span className="text-white text-xl">
              {project.status === 0 ? 'Active' :
               project.status === 1 ? 'Upcoming' :
               project.status === 2 ? 'Finished' : 'Unknown'}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400 text-lg">Start Time:</span>
            <span className="text-white text-xl ml-2">{new Date(project.startDate).toLocaleDateString()}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400 text-lg">End Time:</span>
            <span className="text-white text-xl ml-2">{new Date(project.endDate).toLocaleDateString()}</span>
          </div>
        </div>

        {(project.status === 0 || project.status === 1) && (
          <>
            <div className="mt-4">
              <label htmlFor="donationAmount" className="block text-sm font-medium text-gray-300">
                Donation Amount (USD)
              </label>
              <input
                type="number"
                id="donationAmount"
                name="donationAmount"
                value={donationAmount}
                onChange={handleDonationChange}
                step="0.001"
                min="0"
                placeholder="Enter amount (up to 3 decimals)"
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button onClick={handleDonation} className="mt-4 bg-blue-600 text-white py-3 text-lg rounded-md hover:bg-blue-700 transition">
              Donate to this project
            </button>
          </>
        )}
      </div>
    </div>
  );
}
