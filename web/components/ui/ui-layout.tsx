'use client';

import { WalletButton } from '../solana/solana-provider';
import { useWallet } from '@solana/wallet-adapter-react';
import * as React from 'react';
import { ReactNode, Suspense, useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AccountChecker } from '../account/account-ui';
import { getRecordByField , createRecord} from '../../app/services/pocketBaseServices';
import {
  ClusterChecker,
  ClusterUiSelect,  
  ExplorerLink,
} from '../cluster/cluster-ui';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from '../shadcn/Button';

export function UiLayout({
  children,
  links,
}: {
  children: ReactNode;
  links: { label: string; path: string }[];
}) {
  const pathname = usePathname();
  const wallet = useWallet();

  useEffect(() => {
    const registerUser = async () => {
      if (wallet.connected && wallet.publicKey) {
        const walletAddress = wallet.publicKey.toBase58();
  
        let existingUser;

        try {
          existingUser = await getRecordByField('user', 'walletPublicKey', walletAddress);
        
          console.log(existingUser)
        } catch (error) {
          const newUser = {
            walletPublicKey: walletAddress,
            isAdmin: true,
          };

          if (!existingUser) await createRecord('user', newUser);
          console.log('User registered:', newUser);
      }
      } else {
        console.log('Wallet not connected or publicKey not available.');
      }
    };
  
    registerUser();
  }, [wallet.publicKey]);
  

  return (
    <div className='h-full flex flex-col'>
      <div className='navbar bg-base-300 text-neutral-content flex items-center justify-between px-4'>
          <div className='flex-shrink-0 flex items-center'>
              <Logo />
          </div>

        {/* Centered Links */}
        <div className='flex-1 flex justify-center items-center'>
          <Link href='/deep-blue-fund'>
            <Button variant='outline' className='text-white bg-blackbg text-lg mt-6'>
              DeepBlueFund Projects
            </Button>
          </Link>
        </div>

        {/* WalletButton and ClusterUiSelect on the right */}
        <div className='flex-shrink-0 flex items-center space-x-2 mt-2'>
          <WalletButton />
          {/* <ClusterUiSelect /> */}
        </div>
      </div>

      {/* Main content */}
      {/* <ClusterChecker>
        <AccountChecker />
      </ClusterChecker> */}
      <div className='flex-grow mx-4 lg:mx-auto flex flex-col items-center'>
        <Suspense
          fallback={
            <div className='text-center my-32'>
              <span className='loading loading-spinner loading-lg'></span>
            </div>
          }
        >
          {children}
        </Suspense>
        <Toaster position='bottom-right' />
      </div>

      {/* Footer */}
      <footer className='footer footer-center p-4 bg-base-300 m-auto text-base-content'>
        <p>DeepBlueFund 2024 ©</p>
      </footer>
    </div>
  );
}

export function AppHero({
  children,
  title,
  subtitle,
}: {
  children?: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
}) {
  return (
    <div className='hero py-[64px] flex flex-col items-center justify-center'>
      <div className='hero-content text-center'>
        <div className='max-w-2xl'>
          {typeof title === 'string' ? (
            <h1 className='text-5xl font-bold'>{title}</h1>
          ) : (
            title
          )}
          {typeof subtitle === 'string' ? (
            <p className='py-6 text-xl'>{subtitle}</p>
          ) : (
            subtitle
          )}
          {children}
        </div>
      </div>
      
    </div>
  );
}

export function AppModal({
  children,
  title,
  hide,
  show,
  submit,
  submitDisabled,
  submitLabel,
}: {
  children: ReactNode;
  title: string;
  hide: () => void;
  show: boolean;
  submit?: () => void;
  submitDisabled?: boolean;
  submitLabel?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (!dialogRef.current) return;
    if (show) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [show, dialogRef]);

  return (
    <dialog className='modal' ref={dialogRef}>
      <div className='modal-box space-y-5'>
        <h3 className='font-bold text-lg'>{title}</h3>
        {children}
        <div className='modal-action'>
          <div className='join space-x-2 justify-center'>
            {submit ? (
              <button
                className='btn btn-xs lg:btn-md btn-primary'
                onClick={submit}
                disabled={submitDisabled}
              >
                {submitLabel || 'Save'}
              </button>
            ) : null}
            <button onClick={hide} className='btn'>
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

const Logo = () => (
        <Link href='/'>
      <svg
        width='150'
        height='70'
        viewBox='0 0 350.00000000000006 139.13027494096852'
      >
        <defs id='SvgjsDefs1181'></defs>
        <g
          id='SvgjsG1182'
          transform='matrix(1.5554866790771484,0,0,1.5554866790771484,97.22932784109048,-44.609647857989685)'
          fill='#FFFFFF'
        >
          <g xmlns='http://www.w3.org/2000/svg'>
            <path d='M53.819,45.873c-0.01,0.018,0.028,0.001,0.159-0.114c-0.008,0.004-0.015,0.008-0.023,0.013   C53.911,45.805,53.865,45.839,53.819,45.873z'></path>
            <path d='M94.943,46.752c-0.819-1.952-2.029-3.815-3.315-5.492c-1.155-1.506-2.472-2.887-3.944-4.086   c-2.956-2.408-6.463-4.011-10.151-4.933c-1.206-0.301-2.425-0.537-3.653-0.725c-0.6-0.307-1.213-0.59-1.836-0.849   c-2.748-1.143-5.628-1.676-8.587-1.886c-2.838-0.202-5.729-0.134-8.518,0.475c-3.556,0.777-6.678,2.588-9.031,5.224   c-0.033-0.094-0.118-0.166-0.274-0.194c-2.185-0.386-4.538,0.126-6.216,1.629c-1.583,1.418-2.428,3.421-2.656,5.505   c-0.449,4.119,1.656,8.662,5.455,10.523c1.134,0.555,2.387,0.858,3.646,0.906c-1.483,0.338-2.997,0.343-4.546-0.02   c-1.929-0.452-4.152-1.584-4.964-3.506c-0.512-1.213-0.334-2.548,0.168-3.733c0.319-0.753-0.689-0.656-0.944-0.131   c-1.138,2.347-1.036,4.997,0.89,6.896c1.857,1.831,4.678,2.507,7.218,2.445c1.451-0.035,3.019-0.351,4.229-1.19   c0.296-0.205,0.633-0.535,0.613-0.926c0.81-0.145,1.592-0.393,2.246-0.793c0.361-0.221,0.751-0.652,0.725-1.112   c-0.003-0.048-0.01-0.093-0.021-0.136c0.217-0.235,0.366-0.54,0.447-0.886c-0.07,0.301,0.033-0.105,0.041-0.136   c0.042-0.16,0.091-0.345,0.123-0.516c0.04-0.206,0.072-0.414,0.112-0.62c0.017-0.088,0.035-0.177,0.052-0.265   c0.008-0.032,0.017-0.064,0.024-0.086c0.067-0.198,0.128-0.397,0.208-0.591c0.064-0.154,0.306-0.58,0.087-0.217   c0.093-0.154,0.181-0.309,0.282-0.457c0.1-0.145,0.219-0.277,0.319-0.422c0.002-0.002,0.002-0.004,0.004-0.006   c0.067-0.064,0.13-0.133,0.198-0.196c0.126-0.119,0.258-0.232,0.394-0.339c0.015-0.012,0.032-0.023,0.048-0.034   c0.008-0.015,0.048-0.052,0.094-0.078c0.014-0.008,0.028-0.016,0.042-0.023c0.022-0.017,0.045-0.032,0.065-0.051   c-0.015,0.014-0.029,0.026-0.043,0.038c0.316-0.175,0.625-0.343,0.957-0.492c0.044-0.02,0.073-0.034,0.096-0.045   c0.025-0.006,0.057-0.015,0.105-0.028c0.171-0.048,0.341-0.1,0.514-0.141c0.174-0.041,0.35-0.076,0.526-0.105   c0.106-0.018,0.214-0.028,0.32-0.046c0.004-0.001,0.006-0.001,0.01-0.002c0.007,0,0.012,0,0.021,0   c0.365-0.005,0.725-0.027,1.091-0.005c0.183,0.011,0.364,0.038,0.547,0.051c0.013,0.001,0.022,0.001,0.033,0.002   c0.006,0.001,0.01,0.002,0.017,0.004c0.108,0.023,0.217,0.041,0.325,0.064c0.36,0.079,0.715,0.181,1.062,0.307   c0.069,0.025,0.394,0.163,0.385,0.153c0.16,0.077,0.319,0.158,0.474,0.246c0.324,0.185,0.626,0.399,0.923,0.623   c0.06,0.046,0.328,0.301,0.048,0.035c0.054,0.052,0.113,0.099,0.165,0.153c0.16,0.162,0.32,0.321,0.469,0.493   c0.125,0.145,0.241,0.297,0.356,0.45c0.003,0.004,0.051,0.074,0.089,0.127c0.036,0.057,0.082,0.13,0.085,0.134   c0.22,0.389,0.404,0.79,0.559,1.209c-0.001-0.004,0.035,0.107,0.06,0.179c0.02,0.075,0.055,0.198,0.054,0.192   c0.053,0.214,0.096,0.431,0.131,0.649c0.09,0.558,0.133,1.13,0.124,1.694c-0.013,0.876-0.115,1.698-0.314,2.495   c-2.571,2.018-5.467,3.328-8.67,4.003c-3.318,0.699-6.677,0.84-10.057,0.882c-8.082,0.101-16.145-0.421-24.22-0.628   c-4.857-0.124-9.782-0.179-14.615,0.374c-0.889,0.102-0.862,1.614,0.07,1.59c4.381-0.113,8.748-0.151,13.129,0.021   c4.388,0.172,8.772,0.438,13.161,0.606c3.899,0.149,7.804,0.221,11.706,0.192c1.478-0.011,2.969-0.055,4.456-0.159   c-6.816,1.465-13.796,2.221-20.751,2.844c-2.366,0.212-4.73,0.442-7.098,0.621c-0.667,0.051-1.111,1.202-0.239,1.201   c5.768-0.009,11.514-0.346,17.245-1.002c4.202-0.48,8.393-1.103,12.521-2.034c3.613-0.814,7.284-1.83,10.573-3.573   c0.032-0.017,0.064-0.035,0.096-0.052c-0.468,0.521-0.976,1.014-1.515,1.482c-3.091,2.682-6.91,4.315-10.774,5.736   c-2.283,0.84-4.794,1.6-7.236,2.169c-1.029,0.24-2.269,0.481-3.205,0.577c-0.486,0.05-0.977,0.073-1.465,0.065   c-0.349-0.006-0.671-0.045-1.004,0.111c-0.155,0.073-0.301,0.173-0.456,0.248c-0.416,0.203-0.604,0.778-0.288,1.148   c0.359,0.421,0.704,0.651,1.272,0.703c0.472,0.044,0.948,0.045,1.422,0.029c1.136-0.039,2.271-0.18,3.391-0.368   c2.494-0.417,4.944-1.115,7.345-1.899c4.473-1.462,8.846-3.205,12.514-6.228c2.129-1.755,3.951-3.941,5.001-6.511   c0.988-2.419,1.338-5.368,0.661-7.915c-1.046-3.938-4.616-6.504-8.65-6.597c-1.305-0.03-2.618,0.203-3.819,0.701   c0.112-0.094,0.224-0.188,0.34-0.279c0.035-0.028,0.072-0.054,0.108-0.08c0.031-0.019,0.186-0.127,0.207-0.141   c0.143-0.094,0.287-0.184,0.433-0.273c0.37-0.224,0.749-0.43,1.138-0.618c-0.016,0.008,0.126-0.058,0.198-0.092   c0.074-0.031,0.219-0.094,0.202-0.087c0.183-0.076,0.368-0.148,0.554-0.217c0.416-0.154,0.839-0.29,1.266-0.409   c0.807-0.224,1.483-0.352,2.387-0.454c1.641-0.185,3.182-0.154,4.809,0.141c3.131,0.567,5.705,2.383,7.321,5.172   c1.765,3.047,2.078,6.724,1.211,10.102c-1.215,4.732-4.612,8.574-8.688,11.123c-0.492,0.308-0.345,1.087,0.267,0.737   c4.133-2.365,7.668-5.909,9.399-10.405c1.413-3.67,1.64-7.841,0.154-11.53c-1.386-3.441-4.072-6.066-7.635-7.126   c-3.531-1.05-7.578-0.751-10.992,0.588c-2.098,0.822-4.001,2.053-5.476,3.771c-1.382,1.611-2.478,3.844-2.222,6.006   c0.032,0.27,0.131,0.442,0.269,0.541c-0.001,0.188,0.01,0.376,0.031,0.562c-1.552-0.803-2.874-2.052-3.632-3.642   c-1.054-2.209-1.001-4.606,0.106-6.788c1.865-3.675,4.896-6.223,8.851-7.288c2.408-0.648,4.914-0.78,7.396-0.685   c2.686,0.103,5.327,0.455,7.878,1.328c4.562,1.561,8.746,4.71,11.256,8.86c1.346,2.226,2.223,4.71,2.446,7.306   c0.108,1.264,0.049,2.518-0.162,3.771c-0.232,1.382-0.718,2.683-1.108,4.025c-0.157,0.542-0.074,1.135,0.509,1.376   c0.531,0.219,1.236-0.001,1.546-0.501c1.518-2.446,1.99-5.514,1.896-8.358c-0.086-2.573-0.785-5.147-1.937-7.446   c-1.396-2.788-3.397-5.186-5.784-7.128c0.923,0.335,1.831,0.712,2.719,1.137c3.259,1.561,6.129,3.813,8.398,6.627   c1.444,1.792,2.507,3.761,3.636,5.753C93.575,48.877,95.336,47.689,94.943,46.752z M52.244,48.271   C52.228,48.343,52.232,48.32,52.244,48.271L52.244,48.271z M43.761,37.493c-1.56,2.782-2.187,6.097-0.78,9.093   c0.868,1.848,2.317,3.293,4.067,4.225c-0.849,0.014-1.944-0.154-2.728-0.446c-1.794-0.668-3.146-1.882-4.165-3.509   c-0.908-1.45-1.424-3.308-1.475-5.036c-0.027-0.926,0.037-1.574,0.289-2.463c0.131-0.462,0.162-0.551,0.379-0.996   c0.235-0.481,0.274-0.541,0.565-0.915c0.46-0.59,1.142-1.143,1.881-1.474c1.06-0.474,2.258-0.611,3.409-0.647   C44.674,36.002,44.191,36.725,43.761,37.493z'></path>
          </g>
        </g>
        <g
          id='SvgjsG1183'
          transform='matrix(2.677424430847168,0,0,2.677424430847168,-5.621520019927539,72.61287884151105)'
          fill='#FFFFFF'
        >
          <path d='M2.0996 20 l0 -13.809 l4.5508 0 c4.248 0 6.4063 2.8516 6.4063 6.8945 c0 4.0723 -2.1582 6.9141 -6.4063 6.9141 l-4.5508 0 z M4.043 18.2422 l2.5293 0 c3.0176 0 4.4531 -2.002 4.4531 -5.1563 c0 -3.1348 -1.4355 -5.1465 -4.4531 -5.1465 l-2.5293 0 l0 10.303 z M24.502046874999998 14.9805 l-0.029297 0.49805 l-7.4902 0 c0.068359 2.1387 1.416 3.1738 3.0176 3.1738 c1.1523 0 2.1094 -0.625 2.5977 -1.6699 l1.6992 0.33203 c-0.68359 1.7969 -2.3145 2.8711 -4.2773 2.8711 c-2.8711 0 -4.873 -1.8555 -4.873 -5.0195 s2.0508 -5.0293 4.8145 -5.0293 c2.627 0 4.5313 1.582 4.541 4.8438 z M19.970746875 11.5625 c-1.4941 0 -2.6172 0.80078 -2.9102 2.4902 l5.5566 0 c-0.15625 -1.6797 -1.2207 -2.4902 -2.6465 -2.4902 z M35.634859375 14.9805 l-0.029297 0.49805 l-7.4902 0 c0.068359 2.1387 1.416 3.1738 3.0176 3.1738 c1.1523 0 2.1094 -0.625 2.5977 -1.6699 l1.6992 0.33203 c-0.68359 1.7969 -2.3145 2.8711 -4.2773 2.8711 c-2.8711 0 -4.873 -1.8555 -4.873 -5.0195 s2.0508 -5.0293 4.8145 -5.0293 c2.627 0 4.5313 1.582 4.541 4.8438 z M31.103559375 11.5625 c-1.4941 0 -2.6172 0.80078 -2.9102 2.4902 l5.5566 0 c-0.15625 -1.6797 -1.2207 -2.4902 -2.6465 -2.4902 z M43.398471875 10.1367 c2.4902 0 4.5313 1.9238 4.5313 5.0293 c0 3.125 -2.041 5.0391 -4.5313 5.0391 c-1.4551 0 -2.7246 -0.73242 -3.3301 -1.9043 l0 6.543 l-1.875 0 l0 -14.512 l1.8066 0 l0.048828 1.7676 c0.5957 -1.2109 1.875 -1.9629 3.3496 -1.9629 z M43.007771875 18.6035 c1.6699 0 3.0469 -1.2988 3.0469 -3.4375 c0 -2.1191 -1.377 -3.418 -3.0469 -3.418 c-1.7285 0 -3.0859 1.4551 -3.0859 3.418 c0 1.9824 1.3574 3.4375 3.0859 3.4375 z M57.626990625 12.773399999999999 c1.6309 0.41016 2.7246 1.5332 2.7246 3.457 c0 2.2168 -1.5039 3.7695 -3.9844 3.7695 l-5.4297 0 l0 -13.809 l4.2383 0 c2.5488 0 4.1602 1.4844 4.1602 3.6719 c0 1.3086 -0.5957 2.3828 -1.709 2.9102 z M57.519490625 9.99 c0 -1.1914 -0.85938 -2.1191 -2.3535 -2.1191 l-2.3438 0 l0 4.2969 l2.6465 0 c1.25 0 2.0508 -0.97656 2.0508 -2.1777 z M56.035190625 18.291 c1.5723 0 2.4219 -1.0547 2.4219 -2.2559 c0 -1.2695 -0.88867 -2.2852 -2.5391 -2.2852 l-3.0957 0 l0 4.541 l3.2129 0 z M63.06641875 20 l0 -15 l1.8848 0 l0 15 l-1.8848 0 z M74.394559375 10.332 l1.875 0 l0 9.668 l-1.7871 0 l-0.048828 -1.25 c-0.61523 0.9082 -1.6504 1.4355 -2.9297 1.4355 c-2.041 0 -3.3887 -1.1816 -3.3887 -3.3496 l0 -6.5039 l1.8848 0 l0 6.0938 c0 1.5723 0.94727 2.1973 2.0508 2.1973 c1.2891 0 2.334 -0.77148 2.3438 -2.5879 l0 -5.7031 z M88.20321875 14.9805 l-0.029297 0.49805 l-7.4902 0 c0.068359 2.1387 1.416 3.1738 3.0176 3.1738 c1.1523 0 2.1094 -0.625 2.5977 -1.6699 l1.6992 0.33203 c-0.68359 1.7969 -2.3145 2.8711 -4.2773 2.8711 c-2.8711 0 -4.873 -1.8555 -4.873 -5.0195 s2.0508 -5.0293 4.8145 -5.0293 c2.627 0 4.5313 1.582 4.541 4.8438 z M83.67191875 11.5625 c-1.4941 0 -2.6172 0.80078 -2.9102 2.4902 l5.5566 0 c-0.15625 -1.6797 -1.2207 -2.4902 -2.6465 -2.4902 z M98.76953125 7.939 l-5.6055 0 l0 4.2871 l4.873 0 l0 1.748 l-4.873 0 l0 6.0254 l-1.9824 0 l0 -13.809 l7.5879 0 l0 1.748 z M107.29495 10.332 l1.875 0 l0 9.668 l-1.7871 0 l-0.048828 -1.25 c-0.61523 0.9082 -1.6504 1.4355 -2.9297 1.4355 c-2.041 0 -3.3887 -1.1816 -3.3887 -3.3496 l0 -6.5039 l1.8848 0 l0 6.0938 c0 1.5723 0.94727 2.1973 2.0508 2.1973 c1.2891 0 2.334 -0.77148 2.3438 -2.5879 l0 -5.7031 z M117.294909375 10.1367 c2.041 0 3.3887 1.1816 3.3887 3.3496 l0 6.5137 l-1.8848 0 l0 -6.0938 c0 -1.5918 -0.94727 -2.207 -2.041 -2.207 c-1.2891 0 -2.3438 0.78125 -2.3535 2.5879 l0 5.7129 l-1.875 0 l0 -9.668 l1.875 0 l0 1.1914 c0.625 -0.87891 1.6406 -1.3867 2.8906 -1.3867 z M130.947234375 5 l1.875 0 l0 15 l-1.8066 0 l-0.048828 -1.7578 c-0.5957 1.2109 -1.875 1.9629 -3.3496 1.9629 c-2.4902 0 -4.5508 -1.9531 -4.5508 -5.0391 c0 -3.0664 2.0703 -5.0293 4.5508 -5.0293 c1.4551 0 2.7246 0.73242 3.3301 1.9141 l0 -7.0508 z M128.017534375 18.6035 c1.7188 0 3.0566 -1.4551 3.0566 -3.4375 c0 -1.9727 -1.3477 -3.4277 -3.0566 -3.4277 s-3.0762 1.3477 -3.0762 3.4277 s1.3672 3.4375 3.0762 3.4375 z'></path>
        </g>
      </svg>
      </Link>
);

export default Logo;

export function ellipsify(str = '', len = 4) {
  if (str.length > 30) {
    return (
      str.substring(0, len) + '..' + str.substring(str.length - len, str.length)
    );
  }
  return str;
}

export function useTransactionToast() {
  return (signature: string) => {
    toast.success(
      <div className={'text-center'}>
        <div className='text-lg'>Transaction sent</div>
        <ExplorerLink
          path={`tx/${signature}`}
          label={'View Transaction'}
          className='btn btn-xs btn-primary'
        />
      </div>
    );
  };
}
