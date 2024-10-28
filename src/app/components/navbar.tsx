'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Darkmode from './darkmode';
import { useTheme } from 'next-themes';

const Navbar = () => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col md:flex-row flex-wrap items-center justify-between md:justify-items-end pb-4 md:pb-10 md:px-24 dark:bg-gray-900">
      <div className="flex-shrink-0">
        <picture className="w-40 md:w-auto h-40 md:h-auto px-5">
          <Image
            src={
              theme === 'light'
                ? '/images/logo_full_utenbak.png'
                : '/images/logo_full_utenbak_hvitskrift.png'
            }
            alt="logo"
            width={200}
            height={100}
            className="object-contain"
          />
        </picture>
      </div>
      <div className="flex flex-row flex-wrap align-items:center justify-center space-x-4 md:mt-0 items-center text-center md:text-left">
        <div className="text-gray-900 dark:text-gray-100 mt-4 md:mt-0 text-lg md:text-xl font-semibold text-center md:text-left">
          <Link href="/" className="hover:underline">
            Hjem
          </Link>
        </div>
        <div className="text-gray-900 dark:text-gray-100 mt-4 md:mt-0 text-lg md:text-xl font-semibold text-center md:text-left">
          <Link href="/arrangementer" className="hover:underline">
            Arrangementer
          </Link>
        </div>
        <div className="text-gray-900 dark:text-gray-100 mt-4 md:mt-0 text-lg md:text-xl font-semibold text-center md:text-left">
          <Link href="/stillingsannonser" className="hover:underline">
            Stillingsannonser
          </Link>
        </div>
        <div className="text-gray-900 dark:text-gray-100 mt-4 md:mt-0 text-lg md:text-xl font-semibold text-center md:text-left">
          <Link href="/about" className="hover:underline">
            Om oss
          </Link>
        </div>
        <Darkmode></Darkmode>
      </div>
    </div>
  );
};

export default Navbar;
