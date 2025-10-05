'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Home() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="dark:bg-gray-900">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-sifiblue to-blue-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Velkommen til SIFI 
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-6">
          Linjeforeningen for informasjonssikkerhet på ifi!
        </p>
        <Link
          href="/about"
          className="bg-white text-sifiblue px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Les mer om oss
        </Link>
      </section>

      {/* Quick Links Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        <Link
          href="/arrangementer"
          className="p-6 bg-slate-100 dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold mb-2">🎉 Arrangementer</h2>
          <p>Se våre kommende arrangementer, både faglige og sosiale.</p>
        </Link>

         <Link
          href="/stillingsannonser"
          className="p-6 bg-slate-100 dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold mb-2">💼 Stillingsannonser</h2>
          <p>Finn spennende stillinger fra vår samarbeidspartnere.</p>
        </Link>

        <Link
          href="/merch"
          className="p-6 bg-slate-100 dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold mb-2">🛍️ Merch</h2>
          <p>Sjekk ut vår genser, kopp og mer!</p>
        </Link>
       
      </section>

      {/* Partner Section */}
      <section className="flex flex-col justify-center items-center py-16">
        <h3 className="text-xl font-semibold mb-6 text-center">
          Vår samarbeidspartner:
        </h3>
        <Image
          src={
            resolvedTheme === 'light'
              ? '/images/mnemonic-logo.png'
              : '/images/mnemonic_logo_light.png'
          }
          alt="mnemonic logo"
          height={200}
          width={200}
          className="pb-6"
        />
        <p className="text-center max-w-xl pb-4">
          Vår samarbeidspartner er en av Europas ledende innenfor
          cybersikkerhetstjenester. Ekspertene deres er alltid klar til å håndtere
          cyberangrep.
        </p>
        <Link
          href="https://www.mnemonic.io/"
          className="inline w-48 bg-sifiblue px-2 py-1 text-center rounded-full hover:underline text-white"
        >
          Les mer om dem
        </Link>
      </section>
    </div>
  );
}
