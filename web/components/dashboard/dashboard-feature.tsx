'use client';
import { AppHero } from '../ui/ui-layout';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import heroImage from '@/public/DALL·E 2024-10-05 14.49.02 - A modern, black-and-white themed hero image illustrating an ocean scene focused on sea cleaning. The image features abstract ocean waves in sleek mini.webp'
import { motion } from 'framer-motion';

export default function DashboardFeature() {
  const router = useRouter();

  return (
    <div className="min-h-screen text-white">
      <AppHero
        title={<motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-6xl font-extrabold text-blue-400">DBF</motion.h1>}
        subtitle={<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} className="text-2xl italic">"Crowdfunding sea cleaning projects with Solana"</motion.p>}
      />

      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, duration: 0.5 }} className="flex justify-center mt-8 mix-blend-difference">
        <Image
          src={heroImage}
          alt="Ocean cleaning illustration" 
          className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl"
        />
      </motion.div>

      <div className="container mx-auto px-6 py-12 my-24">
        <motion.section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.5 }} className="mb-16 text-center">
          <h2 className="text-5xl font-extrabold mb-6 text-blue-300">Our Mission</h2>
          <p className="text-xl leading-relaxed max-w-3xl mx-auto">
            We're dedicated to cleaning our oceans and preserving marine life through innovative crowdfunding solutions on the Solana blockchain.
          </p>
        </motion.section>

        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.5 }} className="mb-16 mt-32">
          <h2 className="text-5xl font-extrabold mb-12 text-center text-blue-300">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "1. Create a Project", description: "Submit your sea cleaning project proposal." },
              { title: "2. Get Funded", description: "Receive contributions from supporters worldwide." },
              { title: "3. Clean the Seas", description: "Use the funds to execute your project and make a difference." }
            ].map((step, index) => (
              <motion.div key={index} whileHover={{ scale: 1.05 }} className="p-8 text-lg rounded-xl shadow-xl bg-blue-800 bg-opacity-30 backdrop-filter backdrop-blur-lg">
                <h3 className="text-2xl font-semibold mb-4 text-blue-400">{step.title}</h3>
                <p className="font-bold">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 0.5 }} className="text-center mt-32">
          <h2 className="text-5xl font-extrabold mb-8 text-blue-300">Join the Movement</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white text-xl px-10 py-4 rounded-full hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => router.push('/deep-blue-fund')}
          >
            Get Started
          </motion.button>
        </motion.section>
      </div>
    </div>
  );
}
