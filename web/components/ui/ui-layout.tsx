'use client';

import { WalletButton } from '../solana/solana-provider';
import * as React from 'react';
import { ReactNode, Suspense, useEffect, useRef } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AccountChecker } from '../account/account-ui';
import {
  ClusterChecker,
  ClusterUiSelect,
  ExplorerLink,
} from '../cluster/cluster-ui';
import toast, { Toaster } from 'react-hot-toast';

export function UiLayout({
  children,
  links,
}: {
  children: ReactNode;
  links: { label: string; path: string }[];
}) {
  const pathname = usePathname();

  return (
    <div className='h-full flex flex-col'>
      {/* Navbar */}
      <div className='navbar bg-base-300 text-neutral-content flex items-center justify-between px-4'>
        {/* Logo on the left */}
        <div className='flex-shrink-0 flex items-center'>
          <Link className='btn btn-ghost normal-case text-xl' href='/'>
            <Logo />
          </Link>
        </div>

        {/* Centered Links */}
        <div className='flex-1 flex justify-center'>
          <ul className='menu menu-horizontal flex space-x-4'>
            {links.map(({ label, path }) => (
              <li key={path}>
                <Link
                  className={`btn btn-ghost ${
                    pathname.startsWith(path)
                      ? 'bg-primary text-primary-content' // Styling for the selected link
                      : ''
                  }`}
                  href={path}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* WalletButton and ClusterUiSelect on the right */}
        <div className='flex-shrink-0 flex items-center space-x-2'>
          <WalletButton />
          <ClusterUiSelect />
        </div>
      </div>

      {/* Main content */}
      <ClusterChecker>
        <AccountChecker />
      </ClusterChecker>
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
      <footer className='footer footer-center p-4 bg-base-300 text-base-content'>
        <aside>
          <p>DeepBlueFund</p>
        </aside>
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
            <p className='py-6'>{subtitle}</p>
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
  <div className='w-16 h-16'>
    <svg width='396' height='220.47567567567566' viewBox='0 0 370 206'>
      <defs id='SvgjsDefs2211'></defs>
      <g id='SvgjsG2212' transform='matrix(1,0,0,1,0,0)' fill='#132562'>
        <rect width='370' height='206'></rect>
      </g>
      <g
        id='SvgjsG2213'
        transform='matrix(1.583029866218567,0,0,1.583029866218567,105.84850418565073,-0.4201354351622264)'
        fill='#ffffff'
      >
        <g xmlns='http://www.w3.org/2000/svg'>
          <path
            fill='#ffffff'
            d='M50,5.319C25.617,5.319,5.781,25.363,5.781,50S25.617,94.681,50,94.681S94.219,74.637,94.219,50   S74.383,5.319,50,5.319z M50,90.986C27.654,90.986,9.476,72.6,9.476,50S27.654,9.014,50,9.014S90.524,27.4,90.524,50   S72.346,90.986,50,90.986z'
          ></path>
          <path
            fill='#ffffff'
            d='M30.296,42.076c3.023,0,5.484-2.46,5.484-5.484c0-3.024-2.461-5.484-5.484-5.484s-5.484,2.46-5.484,5.484   C24.812,39.616,27.272,42.076,30.296,42.076z M30.296,32.032c2.515,0,4.561,2.045,4.561,4.561c0,2.514-2.046,4.561-4.561,4.561   s-4.561-2.046-4.561-4.561C25.735,34.077,27.781,32.032,30.296,32.032z'
          ></path>
          <rect
            x='37.599'
            y='26.725'
            transform='matrix(0.6515 0.7587 -0.7587 0.6515 36.1238 -18.2676)'
            fill='#ffffff'
            width='0.693'
            height='6.918'
          ></rect>
          <rect
            x='33.895'
            y='44.275'
            transform='matrix(-0.6578 -0.7532 0.7532 -0.6578 28.5143 102.1981)'
            fill='#ffffff'
            width='7.154'
            height='0.693'
          ></rect>
          <rect
            x='20.739'
            y='28.467'
            transform='matrix(0.6507 0.7593 -0.7593 0.6507 30.1906 -8.0075)'
            fill='#ffffff'
            width='6.12'
            height='0.693'
          ></rect>
          <rect
            x='17.791'
            y='35.553'
            transform='matrix(0.9998 0.0193 -0.0193 0.9998 0.6952 -0.3938)'
            fill='#ffffff'
            width='6.009'
            height='0.693'
          ></rect>
          <rect
            x='36.59'
            y='36.592'
            transform='matrix(0.9937 0.1118 -0.1118 0.9937 4.377 -4.2047)'
            fill='#ffffff'
            width='6.204'
            height='0.693'
          ></rect>
          <rect
            x='30.617'
            y='24.352'
            transform='matrix(0.9992 0.0395 -0.0395 0.9992 1.1018 -1.2023)'
            fill='#ffffff'
            width='0.692'
            height='5.835'
          ></rect>
          <rect
            x='29.95'
            y='43.403'
            fill='#ffffff'
            width='0.691'
            height='5.889'
          ></rect>
          <rect
            x='20.17'
            y='42.956'
            transform='matrix(-0.7715 0.6362 -0.6362 -0.7715 68.3854 62.0449)'
            fill='#ffffff'
            width='5.762'
            height='0.693'
          ></rect>
          <rect
            x='20.996'
            y='32.291'
            transform='matrix(0.9024 0.4308 -0.4308 0.9024 16.2541 -6.4966)'
            fill='#ffffff'
            width='2.948'
            height='0.693'
          ></rect>
          <rect
            x='26.324'
            y='28.38'
            transform='matrix(0.267 0.9637 -0.9637 0.267 48.0897 -5.7681)'
            fill='#ffffff'
            width='3.025'
            height='0.693'
          ></rect>
          <rect
            x='33.536'
            y='27.748'
            transform='matrix(0.8811 0.473 -0.473 0.8811 17.889 -12.5406)'
            fill='#ffffff'
            width='0.693'
            height='3.112'
          ></rect>
          <rect
            x='37.967'
            y='31.99'
            transform='matrix(0.2779 0.9606 -0.9606 0.2779 60.0998 -12.4238)'
            fill='#ffffff'
            width='0.692'
            height='3.546'
          ></rect>
          <rect
            x='37.621'
            y='38.994'
            transform='matrix(0.538 -0.843 0.843 0.538 -16.6859 50.7653)'
            fill='#ffffff'
            width='0.692'
            height='3.22'
          ></rect>
          <rect
            x='32.034'
            y='44.233'
            transform='matrix(-0.3536 -0.9354 0.9354 -0.3536 3.5118 91.5864)'
            fill='#ffffff'
            width='2.731'
            height='0.693'
          ></rect>
          <rect
            x='26.265'
            y='42.754'
            transform='matrix(0.8695 0.4939 -0.4939 0.8695 25.4104 -7.3485)'
            fill='#ffffff'
            width='0.693'
            height='3.32'
          ></rect>
          <rect
            x='21.332'
            y='38.901'
            transform='matrix(0.924 -0.3825 0.3825 0.924 -13.291 11.6329)'
            fill='#ffffff'
            width='2.566'
            height='0.693'
          ></rect>
          <path
            fill='#ffffff'
            d='M63.679,61.613c-2.907-0.439-5.711,1.8-8.423,3.967c-2.061,1.645-4.192,3.333-5.77,3.229   c-1.639-0.122-3.997-1.208-6.278-2.258c-3.426-1.577-6.662-3.064-9.067-2.386c-1.941,0.549-3.772,1.453-5.544,2.327   c-4.553,2.248-8.485,4.187-13.496,0.313l-1.13,1.461c5.923,4.58,10.763,2.192,15.443-0.118c1.697-0.837,3.451-1.703,5.229-2.206   c1.748-0.496,4.959,0.983,7.792,2.286c2.542,1.171,4.943,2.277,6.915,2.422c2.3,0.175,4.612-1.674,7.058-3.627   c2.403-1.918,4.884-3.907,6.994-3.584c4.275,0.645,8.249,1.924,20.499,7.796L84.7,69.57C72.236,63.596,68.142,62.287,63.679,61.613   z'
          ></path>
          <path
            fill='#ffffff'
            d='M59.327,73.342c-2.244-0.089-4.943,1.16-8.067,2.604c-1.077,0.497-2.189,1.011-3.367,1.513   c-1.65,0.701-3.48-0.715-5.417-2.215c-1.423-1.102-2.895-2.241-4.489-2.689c-2.517-0.704-4.675,0.333-7.662,1.772   c-0.333,0.161-0.677,0.327-1.035,0.496c-1.363,0.647-3.874,1.863-3.874,1.863l0.806,1.663c0,0,2.501-1.212,3.859-1.856   c0.361-0.171,0.71-0.339,1.046-0.5c2.72-1.31,4.516-2.177,6.36-1.658c1.248,0.351,2.575,1.378,3.858,2.372   c1.713,1.327,3.605,2.793,5.633,2.793c0.537,0,1.084-0.103,1.639-0.339c1.204-0.513,2.329-1.032,3.419-1.536   c2.907-1.345,5.418-2.5,7.221-2.436c2.213,0.085,6.132,2.271,8.236,3.446c0.685,0.381,1.179,0.657,1.492,0.798l0.757-1.685   c-0.24-0.108-0.754-0.395-1.349-0.727C65.995,75.683,61.982,73.443,59.327,73.342z'
          ></path>
        </g>
      </g>
      <g
        id='SvgjsG2214'
        transform='matrix(1.0058448314666748,0,0,1.0058448314666748,8.389052610971119,158.58829858581132)'
        fill='#ffffff'
      >
        <path d='M1.6016 10.390999999999998 l11.367 0 q2.03125 0 3.896484375 0.52734375 t3.4766 1.4844 t2.9297 2.2949 t2.2559 2.9785 t1.4453 3.5352 t0.50781 3.9453 t-0.50781 3.9453 t-1.4453 3.5449 t-2.2559 3.0078 t-2.9297 2.3242 t-3.4766 1.4941 t-3.8965 0.52734 l-11.367 0 l0 -5.3516 l2.3633 0 l0 -18.887 l-2.3633 0 l0 -5.3711 z M10.449 15.762 l0 18.887 l2.4805 0 q1.58203125 0 2.98828125 -0.7421875 t2.4414 -2.0215 t1.6406 -3.0078 t0.60547 -3.7207 q0 -1.97265625 -0.60546875 -3.69140625 t-1.6406 -2.9883 t-2.4414 -1.9922 t-2.9883 -0.72266 l-2.4805 0 z M32.02389453125 10.390999999999998 l23.555 0 l0 10.098 l-6.3672 0 l0 -4.1992 l-7.5977 0 l0 5.8398 l5.8789 0 l0 5.6641 l-5.8789 0 l0 6.8555 l7.5977 0 l0 -5.2539 l6.3672 0 l0 10.605 l-23.555 0 l0 -5.3516 l3.1055 0 l0 -18.359 l-3.1055 0 l0 -5.8984 z M60.1220390625 10.390999999999998 l23.555 0 l0 10.098 l-6.3672 0 l0 -4.1992 l-7.5977 0 l0 5.8398 l5.8789 0 l0 5.6641 l-5.8789 0 l0 6.8555 l7.5977 0 l0 -5.2539 l6.3672 0 l0 10.605 l-23.555 0 l0 -5.3516 l3.1055 0 l0 -18.359 l-3.1055 0 l0 -5.8984 z M88.22018359375 10.390999999999998 l13.672 0 q2.28515625 0 4.19921875 0.712890625 t3.3008 1.9238 t2.168 2.793 t0.78125 3.3008 q0 2.0703125 -0.615234375 3.876953125 t-1.9043 3.1348 t-3.2617 2.0996 t-4.668 0.77148 l-4.1211 0 l0 5.6445 l2.7148 0 l0 5.3516 l-12.266 0 l0 -5.3516 l3.0664 0 l0 -18.887 l-3.0664 0 l0 -5.3711 z M97.77118359375 15.762 l0 7.9492 l2.6758 0 q2.2265625 0 3.53515625 -0.9375 t1.3086 -2.9688 q0 -1.89453125 -1.23046875 -2.96875 t-3.6133 -1.0742 l-2.6758 0 z M116.708953125 34.6484 l3.0273 0 l0 -18.887 l-3.0273 0 l0 -5.4102 l14.434 0.039063 q2.01171875 0 3.681640625 0.712890625 t2.8809 1.9336 t1.8848 2.8516 t0.67383 3.4668 q0 2.1484375 -0.751953125 3.5546875 t-2.1387 2.2656 q1.46484375 0.9375 2.314453125 2.314453125 t0.84961 3.3496 q0 2.01171875 -0.693359375 3.69140625 t-1.8945 2.9004 t-2.8418 1.8945 t-3.5352 0.67383 l-14.863 0 l0 -5.3516 z M126.220953125 27.753999999999998 l0 6.8945 l4.9219 0 q0.56640625 0 1.064453125 -0.29296875 t0.85938 -0.77148 t0.57617 -1.1133 t0.21484 -1.3184 q0 -0.72265625 -0.21484375 -1.337890625 t-0.58594 -1.0742 t-0.86914 -0.72266 t-1.0449 -0.26367 l-4.9219 0 z M126.220953125 15.762 l0 6.6406 l4.6484 0 q0.546875 0 1.03515625 -0.2734375 t0.84961 -0.73242 t0.57617 -1.0352 t0.21484 -1.2012 q0 -0.60546875 -0.21484375 -1.2109375 t-0.57617 -1.0938 t-0.84961 -0.79102 t-1.0352 -0.30273 l-4.6484 0 z M144.92428515625 10.390999999999998 l12.676 0 l0 5.3711 l-3.125 0 l0 18.887 l6.4453 0 q0.25390625 0 0.498046875 -0.146484375 t0.42969 -0.38086 t0.30273 -0.50781 t0.11719 -0.52734 l0 -3.9648 l6.3281 0 l0 10.879 l-23.672 0 l0 -5.3516 l3.0664 0 l0 -18.887 l-3.0664 0 l0 -5.3711 z M171.1474571875 10.390999999999998 l11.875 0 l0 5.3711 l-2.7148 0 l0 12.285 q0 1.6796875 0.380859375 2.8515625 t1.0645 1.9141 t1.6211 1.084 t2.0508 0.3418 q1.15234375 0 2.099609375 -0.29296875 t1.6211 -1.0059 t1.0352 -1.9043 t0.36133 -2.9883 l0 -12.285 l-3.1445 0 l0 -5.3711 l11.875 0 l0 5.3711 l-2.3633 0 l0 11.523 q0 3.125 -0.8984375 5.556640625 t-2.4707 4.1113 t-3.6914 2.5586 t-4.541 0.87891 q-2.40234375 0 -4.4921875 -0.869140625 t-3.6426 -2.5195 t-2.4512 -4.0137 t-0.89844 -5.3516 l0 -11.875 l-2.6758 0 l0 -5.3711 z M203.99166796875 10.390999999999998 l23.555 0 l0 10.098 l-6.3672 0 l0 -4.1992 l-7.5977 0 l0 5.8398 l5.8789 0 l0 5.6641 l-5.8789 0 l0 6.8555 l7.5977 0 l0 -5.2539 l6.3672 0 l0 10.605 l-23.555 0 l0 -5.3516 l3.1055 0 l0 -18.359 l-3.1055 0 l0 -5.8984 z M232.0898125 10.390999999999998 l22.91 0 l0 10.098 l-6.3477 0 l0 -4.1602 l-7.0117 0 l0 6.2305 l6.0742 0 l0 5.6836 l-6.0742 0 l0 6.4063 l3.125 0 l0 5.3516 l-12.676 0 l0 -5.3516 l3.0664 0 l0 -18.32 l-3.0664 0 l0 -5.9375 z M257.14110953125 10.390999999999998 l11.875 0 l0 5.3711 l-2.7148 0 l0 12.285 q0 1.6796875 0.380859375 2.8515625 t1.0645 1.9141 t1.6211 1.084 t2.0508 0.3418 q1.15234375 0 2.099609375 -0.29296875 t1.6211 -1.0059 t1.0352 -1.9043 t0.36133 -2.9883 l0 -12.285 l-3.1445 0 l0 -5.3711 l11.875 0 l0 5.3711 l-2.3633 0 l0 11.523 q0 3.125 -0.8984375 5.556640625 t-2.4707 4.1113 t-3.6914 2.5586 t-4.541 0.87891 q-2.40234375 0 -4.4921875 -0.869140625 t-3.6426 -2.5195 t-2.4512 -4.0137 t-0.89844 -5.3516 l0 -11.875 l-2.6758 0 l0 -5.3711 z M308.6963203125 10.390999999999998 l11.25 0 l0 5.3711 l-2.4023 0 l0 24.238 l-6.4844 0 l-12.324 -19.141 l0 13.789 l2.4805 0 l0 5.3516 l-11.23 0 l0 -5.3516 l2.4414 0 l0 -18.887 l-2.4023 0 l0 -5.3711 l8.9453 0 l12.246 19.395 l0 -14.023 l-2.5195 0 l0 -5.3711 z M323.68900234375 10.390999999999998 l11.367 0 q2.03125 0 3.896484375 0.52734375 t3.4766 1.4844 t2.9297 2.2949 t2.2559 2.9785 t1.4453 3.5352 t0.50781 3.9453 t-0.50781 3.9453 t-1.4453 3.5449 t-2.2559 3.0078 t-2.9297 2.3242 t-3.4766 1.4941 t-3.8965 0.52734 l-11.367 0 l0 -5.3516 l2.3633 0 l0 -18.887 l-2.3633 0 l0 -5.3711 z M332.53640234375 15.762 l0 18.887 l2.4805 0 q1.58203125 0 2.98828125 -0.7421875 t2.4414 -2.0215 t1.6406 -3.0078 t0.60547 -3.7207 q0 -1.97265625 -0.60546875 -3.69140625 t-1.6406 -2.9883 t-2.4414 -1.9922 t-2.9883 -0.72266 l-2.4805 0 z'></path>
      </g>
    </svg>
  </div>
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
