import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between md:justify-items-end p-4 md:p-8 dark:bg-gray-900">
      <div className="flex-shrink-0">
        <picture className="w-40 md:w-auto h-40 md:h-auto">
          <source
            srcSet={'/images/logo_full_utenbak_hvitskrift.png'}
            media="(prefers-color-scheme: dark)"
          />
          <Image
            src={'/images/logo_full_utenbak.png'}
            alt="logo"
            width={200}
            height={100}
            className="object-contain"
          ></Image>
        </picture>
      </div>
      <div className='flex flex-row justify-between space-x-4 mt-4 md:mt-0 text-center md:text-left"'>
        <div className="text-gray-900 dark:text-gray-100 mt-4 md:mt-0 text-lg md:text-xl font-semibold text-center md:text-left">
          <Link href="/">Hjem</Link>
        </div>
        <div className="text-gray-900 dark:text-gray-100 mt-4 md:mt-0 text-lg md:text-xl font-semibold text-center md:text-left">
          <Link href="/arrangementer">Arrangementer</Link>
        </div>
        <div className="text-gray-900 dark:text-gray-100 mt-4 md:mt-0 text-lg md:text-xl font-semibold text-center md:text-left">
          <Link href="/about">Om oss</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
