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
    <div className="h-full flex flex-col">
      {/* Navbar */}
      <div className="navbar bg-base-300 text-neutral-content flex items-center justify-between px-4">
        {/* Logo on the left */}
        <div className="flex-shrink-0 flex items-center">
          <Link className="btn btn-ghost normal-case text-xl" href="/">
          <Logo />
            <img className="h-4 md:h-6" alt="Logo" src="/logo.png" />
          </Link>
        </div>

        {/* Centered Links */}
        <div className="flex-1 flex justify-center">
          <ul className="menu menu-horizontal flex space-x-4">
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
        <div className="flex-shrink-0 flex items-center space-x-2">
          <WalletButton />
          <ClusterUiSelect />
        </div>
      </div>

      {/* Main content */}
      <ClusterChecker>
        <AccountChecker />
      </ClusterChecker>
      <div className="flex-grow mx-4 lg:mx-auto flex flex-col items-center">
        <Suspense
          fallback={
            <div className="text-center my-32">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          }
        >
          {children}
        </Suspense>
        <Toaster position="bottom-right" />
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
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
    <div className="hero py-[64px] flex flex-col items-center justify-center">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          {typeof title === 'string' ? (
            <h1 className="text-5xl font-bold">{title}</h1>
          ) : (
            title
          )}
          {typeof subtitle === 'string' ? (
            <p className="py-6">{subtitle}</p>
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
    <dialog className="modal" ref={dialogRef}>
      <div className="modal-box space-y-5">
        <h3 className="font-bold text-lg">{title}</h3>
        {children}
        <div className="modal-action">
          <div className="join space-x-2 justify-center">
            {submit ? (
              <button
                className="btn btn-xs lg:btn-md btn-primary"
                onClick={submit}
                disabled={submitDisabled}
              >
                {submitLabel || 'Save'}
              </button>
            ) : null}
            <button onClick={hide} className="btn">
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

const Logo = () => (
  <div className="w-16 h-16">
      <svg 
    version="1.0"
    xmlns="http://www.w3.org/2000/svg" 
    width="100%" 
    height="100%" 
    viewBox="0 0 340.000000 250.000000" 
    preserveAspectRatio="xMidYMid meet" 
    color-interpolation-filters="sRGB" 
    style={{ margin: 'auto' }}>
    <g fill="#3699ea" transform="translate(48.31500244140625,96.67753791809082)">
        <g transform="translate(0,0)">
            <g>
                <rect 
                    fill="#3699ea" 
                    fill-opacity="0" 
                    stroke-width="2" 
                    x="0" 
                    y="0" 
                    width="60" 
                    height="56.644921310763486" 
                    className="image-rect" />
                <svg x="0" y="0" width="60" height="56.644921310763486" className="image-svg-svg primary" style={{ overflow: 'visible' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.0035364627838134766 -0.003859281539916992 264.3553466796875 249.573974609375">
                        <g>
                            <g fill="#3699ea">
                                <path d="M88.26 14.26a19 19 0 0 0 18.69 5.47l65.67-17a1.38 1.38 0 0 0-.37-2.73L87.36 1a5 5 0 0 0-3.63 8.44zM204.69 14.78a10.81 10.81 0 0 0-14-7l-65.62 23.58a5.34 5.34 0 0 0-.92 9.62l98.48 58.41a4.39 4.39 0 0 0 6.43-5.06zM103 177.28a6.6 6.6 0 0 0 9.88 5.69l99.32-57.07.09-.05a6.62 6.62 0 0 0 .08-11.44L112.1 54.94a6.42 6.42 0 0 0-9.7 5.55zM263.73 136.83a5.62 5.62 0 0 0-5.94-8.11 18.67 18.67 0 0 0-14.57 12.6l-27.67 85.05a.92.92 0 0 0 1.69.7zM258.31 113.62a4.34 4.34 0 0 0 4.7-6.3L217.6 22.4a.76.76 0 0 0-1.39.63L246 103.09a16.74 16.74 0 0 0 12.31 10.53zM75.55 180.29a5.87 5.87 0 0 0 9.24-4.84l-.53-112.18A5.5 5.5 0 0 0 75.34 59L3.2 116.43A8.46 8.46 0 0 0 3.62 130zM2.32 99.68a1.64 1.64 0 0 0 2.53 2l66.77-62a11.35 11.35 0 0 0 .6-16l-7.49-8.08A8.45 8.45 0 0 0 51.25 17zM107.85 219.33a15.23 15.23 0 0 0-17.45 5.08l-10.09 13.38a5.83 5.83 0 0 0 4.51 9.35l93.49 2.43a1.9 1.9 0 0 0 .71-3.67zM226.49 147.65a4.73 4.73 0 0 0-6.94-5.3l-95.85 55.31a5.83 5.83 0 0 0 .5 10.36l66.92 30.4a9.55 9.55 0 0 0 13.2-6.28zM74.21 215.48a11.75 11.75 0 0 0-2.06-16.19L6 146.19a2.07 2.07 0 0 0-3.08 2.67l47.64 80.84a7.54 7.54 0 0 0 12.54.68z"></path>
                            </g>
                        </g>
                    </svg>
                </svg>
            </g>
        </g>
        <g transform="translate(67,14.932462692260742)">
            <g data-gra="path-name" fill-rule="" className="tp-name iconsvg-namesvg">
                <g transform="scale(1)">
                    <g>
                        <path d="M4.26-20.83L8.57-20.83Q9.92-20.83 11.09-20.49 12.26-20.15 13.13-19.47 14-18.79 14.5-17.78 15-16.77 15-15.41L15-15.41 15-6.19Q15-5.03 14.74-4.14 14.49-3.26 14.08-2.61 13.67-1.96 13.15-1.51 12.63-1.06 12.1-0.77L12.1-0.77Q10.82-0.09 9.19 0L9.19 0 4.26 0Q3.41 0 2.95-0.29 2.48-0.58 2.28-1.06 2.07-1.55 2.03-2.16 1.99-2.77 1.99-3.42L1.99-3.42 1.99-17.44Q1.99-18.08 2.03-18.69 2.07-19.3 2.28-19.77 2.48-20.25 2.95-20.54 3.41-20.83 4.26-20.83L4.26-20.83ZM8.45-17.35L6.52-17.35 6.52-3.54 8.45-3.54Q9.09-3.57 9.6-3.84L9.6-3.84Q9.8-3.94 10.01-4.12 10.22-4.3 10.39-4.55 10.55-4.79 10.65-5.13 10.74-5.48 10.74-5.92L10.74-5.92 10.74-14.7Q10.74-15.19 10.65-15.57 10.55-15.95 10.39-16.23 10.22-16.52 10.01-16.71 9.8-16.9 9.6-17.02L9.6-17.02Q9.09-17.3 8.45-17.35L8.45-17.35ZM30.2-9.4L30.2-8.48Q30.2-8.24 30.17-7.92 30.14-7.6 29.94-7.31 29.74-7.02 29.31-6.81 28.88-6.61 28.09-6.61L28.09-6.61 22.17-6.61 22.17-5.18Q22.17-4.82 22.26-4.43 22.35-4.05 22.56-3.72 22.78-3.39 23.14-3.18 23.49-2.98 24.01-2.98L24.01-2.98Q24.61-2.98 24.93-3.12 25.25-3.26 25.43-3.47 25.62-3.67 25.77-3.94 25.92-4.21 25.92-4.65L25.92-4.65 25.92-5.87Q25.92-6.4 26.03-6.71 26.14-7.02 26.41-7.32 26.67-7.62 27.1-7.77 27.54-7.92 28.05-7.92L28.05-7.92 28.05-3.54 28.05-3.54Q28.05-2.95 28.12-2.7 28.19-2.44 28.19-2.14 28.19-1.84 28.05-1.49 27.91-1.14 27.54-0.96 27.17-0.78 26.55-0.78L26.55-0.78Q25.66-0.78 25.07-0.91 24.49-1.03 24.13-1.33 23.76-1.62 23.5-1.92 23.25-2.21 23.15-2.66 23.05-3.12 23.05-3.4 23.05-3.68 23.05-4.08 23.07-4.51 23.14-4.91 23.25-5.37 23.56-5.87 23.94-6.26 24.39-6.6 25-6.89 25.94-6.89L25.94-6.89 30.2-6.89 30.2-9.4ZM42.32-18.03Q42.75-18.03 43.06-18.03 43.37-18.03 43.59-18.03 43.81-18.03 44.16-18.03L44.16-18.03Q44.58-18.03 44.88-18.03 45.17-18.03 45.53-18.03L45.53-18.03 45.53-6.39 45.53-6.39Q45.53-5.15 44.56-5.15 43.58-5.15 42.32-5.15 41.06-5.15 40.13-5.15L40.13-5.15 40.13-18.03ZM46.99-22.9Q47.06-22.9 47.06-22.9 47.06-22.9 47.06-22.9 47.06-22.9 47.06-22.9 47.06-22.9 47.06-22.9L47.06-22.9Q47.06-22.9 47.06-22.9 47.06-22.9 47.06-22.9 47.06-22.9 47.06-22.9 47.06-22.9L47.06-22.9ZM53.99-9.16L53.99-6.39Q53.99-5.15 54.96-5.15 55.93-5.15 57.71-5.15 58.48-5.15 59.33-5.15 60.11-5.15 61.06-5.15L61.06-5.15Q61.45-5.15 62.29-5.15 63.12-5.15 63.12-6.39L63.12-6.39 63.12-7.38L63.12-7.38Q63.12-8.88 62.24-8.88 61.37-8.88 60.5-8.88 59.62-8.88 58.75-8.88 57.87-8.88 57.16-8.88L57.16-8.88 57.16-9.16L57.16-9.16Q57.16-9.16 57.16-9.16 57.16-9.16 57.16-9.16L57.16-9.16ZM69.65-20.83Q70.51-20.83 71.16-20.83 71.8-20.83 72.22-20.83 72.64-20.83 73.01-20.83 73.38-20.83 73.56-20.83 73.75-20.83 74.11-20.83 74.48-20.83 74.74-20.83 74.9-20.83 75.06-20.83 75.2-20.83 75.33-20.83 75.46-20.83 75.62-20.83 75.77-20.83 75.89-20.83 76.01-20.83 76.13-20.83 76.24-20.83 76.36-20.83 76.47-20.83 76.58-20.83 76.67-20.83 76.77-20.83 76.87-20.83 76.96-20.83 77.06-20.83 77.16-20.83 77.26-20.83 77.35-20.83 77.45-20.83 77.55-20.83 77.65-20.83 77.75-20.83 77.85-20.83 77.94-20.83 78.03-20.83 78.12-20.83 78.21-20.83 78.29-20.83 78.38-20.83 78.47-20.83 78.56-20.83 78.64-20.83 78.73-20.83 78.81-20.83 78.89-20.83 78.98-20.83 79.06-20.83 79.14-20.83 79.22-20.83 79.3-20.83 79.37-20.83 79.44-20.83 79.51-20.83 79.58-20.83 79.65-20.83 79.71-20.83 79.77-20.83 79.83-20.83 79.89-20.83 79.94-20.83 80-20.83L80-20.83 80-20.83 80-20.83 80-20.83 80-20.83 80-20.83 80-20.83 80-20.83ZM4.26 1.93L0.02 4.39 2.56 6.44 4.26 4.53 4.26 1.93Z"></path>
                    </g>
                </g>
            </g>
        </g>
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
        <div className="text-lg">Transaction sent</div>
        <ExplorerLink
          path={`tx/${signature}`}
          label={'View Transaction'}
          className="btn btn-xs btn-primary"
        />
      </div>
    );
  };
}
