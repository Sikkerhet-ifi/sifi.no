'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Home() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure theme is loaded before rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid rendering until mounted

  return (
    <div className="flex flex-col items-center justify-items-center dark:bg-gray-900 p-8 pb-20 md:pb-32 gap-8 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl mb:text-5xl font-bold mb-2 text-center underline decoration-sifiblue">
        SIFI - Linjeforeningen for informasjonssikkerhet
      </h1>
      <h2 className="text-2xl mb:text-4xl font-bold mb-2 p-4 text-white text-center bg-gradient-to-r from-sifiblue to-blue-500 rounded">
        Velkommen til SIFI.no
      </h2>
      <main className="flex flex-col gap-y-20 items-center justify-center">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <p className="max-w-96 text-center">
            Vi jobber med å gjøre studiehverdagen til studenter ved
            informasjonssikkerhet masterprogrammet ved UiO ved å tilby sosiale
            og faglige arrangementer.
          </p>
          <Link
            href="/about"
            className="inline w-48 bg-gradient-to-r from-sifiblue to-transparent px-2 py-1 text-center rounded-full hover:underline"
          >
            Les mer om SIFI
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image
            src={
              resolvedTheme === 'light'
                ? '/images/mnemonic-logo.png'
                : '/images/mnemonic_logo_light.png'
            }
            alt="mnemonic logo"
            height={300}
            width={250}
            className="shrink-0 pb-8 justify-center items-center"
          ></Image>
          <p className="text-center max-w-xl pb-4">
            Vår samarbeidspartner er en av Europas ledende innenfor
            cybersikkerhetstjenester. Ekspertene deres er alltid klar til å
            håndtere cyberangrep.
          </p>
          <Link
            href="https://www.mnemonic.io/"
            className="inline w-48 bg-gradient-to-r from-sifiblue to-transparent px-2 py-1 text-center rounded-full hover:underline"
          >
            Les mer om dem her
          </Link>
        </div>
      </main>
    </div>
  );
}
