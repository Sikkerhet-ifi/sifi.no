'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Darkmode from './darkmode';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full bg-slate-100 dark:bg-gray-900 border-b-2 border-slate-200 md:border-slate-100">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-2">
        {/* Logo */}
        <div className="flex-shrink-0">
          <picture className="w-32 md:w-auto h-20 md:h-auto px-2">
            <Image
              src={'/images/logo_liten_utenbak.png'}
              alt="logo"
              width={50}
              height={25}
              className="object-contain"
            />
          </picture>
        </div>

        {/* Nav + darkmode */}
        <div className="flex items-center space-x-4">
          {/* Hamburger menu (mobile) */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-900 dark:text-gray-100"
          >
            <span className="block w-6 h-0.5 bg-gray-900 dark:bg-gray-100 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-900 dark:bg-gray-100 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-900 dark:bg-gray-100"></span>
          </button>

          {/* Links */}
          <div
            className={`${
              isOpen ? 'block' : 'hidden'
            } md:flex md:items-center md:space-x-6 text-lg md:text-xl font-semibold`}
          >
            <Link
              href="/"
              className="p-2 hover:underline hover:bg-sifiblue hover:text-white hover:rounded-full"
              onClick={toggleMenu}
            >
              Hjem
            </Link>
            <Link
              href="/arrangementer"
              className="p-2 hover:underline hover:bg-sifiblue hover:text-white hover:rounded-full"
              onClick={toggleMenu}
            >
              Arrangementer
            </Link>
            <Link
              href="/stillingsannonser"
              className="p-2 hover:underline hover:bg-sifiblue hover:text-white hover:rounded-full"
              onClick={toggleMenu}
            >
              Stillingsannonser
            </Link>
            <Link
              href="/merch"
              className="p-2 hover:underline hover:bg-sifiblue hover:text-white hover:rounded-full"
              onClick={toggleMenu}
            >
              Merch
            </Link>
            <Link
              href="/about"
              className="p-2 hover:underline hover:bg-sifiblue hover:text-white hover:rounded-full"
              onClick={toggleMenu}
            >
              Om oss
            </Link>
            <Link
              href="/si-ifra"
              className="p-2 hover:underline hover:bg-sifiblue hover:text-white hover:rounded-full"
              onClick={toggleMenu}
            >
              Si ifra
            </Link>
          </div>

          {/* Darkmode toggle */}
          <Darkmode />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
