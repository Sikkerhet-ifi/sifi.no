'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Darkmode from './darkmode';

const Navbar = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap items-center justify-between justify md:justify-items-center pb-4 md:pb-2 md:px-96 bg-slate-100 dark:bg-gray-900 border-b-2 border-slate-200 md:border-slate-100">
      <div className="flex-shrink-0">
        <picture className="w-40 md:w-auto h-40 md:h-auto px-5">
          <Image
            src={'/images/logo_liten_utenbak.png'}
            alt="logo"
            width={50}
            height={25}
            className="object-contain"
          />
        </picture>
      </div>
      <div className="flex flex-row flex-wrap align-items:center justify-center space-x-4 md:mt-0 items-center text-center md:text-left">
        <div className="text-gray-900 dark:text-gray-100 mt-4 md:mt-0 text-lg md:text-xl font-semibold text-center md:text-left">
          <Link
            href="/"
            className="p-2 hover:underline hover:bg-sifiblue hover:text-white hover:rounded-full "
          >
            Hjem
          </Link>
        </div>
        <div className="text-gray-900 dark:text-gray-100 mt-4 md:mt-0 text-lg md:text-xl font-semibold text-center md:text-left">
          <Link
            href="/arrangementer"
            className="p-2 hover:underline hover:bg-sifiblue hover:text-white hover:rounded-full "
          >
            Arrangementer
          </Link>
        </div>
        <div className="text-gray-900 dark:text-gray-100 mt-4 md:mt-0 text-lg md:text-xl font-semibold text-center md:text-left">
          <Link
            href="/stillingsannonser"
            className="p-2 hover:underline hover:bg-sifiblue hover:text-white hover:rounded-full "
          >
            Stillingsannonser
          </Link>
        </div>
        <div className="text-gray-900 dark:text-gray-100 mt-4 md:mt-0 text-lg md:text-xl font-semibold text-center md:text-left">
          <Link
            href="/about"
            className="p-2 hover:underline hover:bg-sifiblue hover:text-white hover:rounded-full "
          >
            Om oss
          </Link>
        </div>
        <Darkmode></Darkmode>
      </div>
    </div>
  );
};

export default Navbar;
