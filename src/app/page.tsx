import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center dark:bg-gray-900 min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl mb:text-5xl font-bold mb-8 text-center">
        SIFI - Linjeforeningen for informasjonsikkerhet
      </h1>
      <main className="flex flex-col gap-y-20 row-start-2 items-center justify-between md:items-start">
        <div className="flex gap-4 items-center flex-col md:flex-col">
          <p>
            Vi jobber med å gjøre studiehverdagen til studenter ved
            informasjonsikkerhet masterprogrammet ved UiO med å tilby sosiale og
            faglige arrangementer.
          </p>
          <Link href="/about" className="border-solid border-2 p-2">
            Les mer om SIFI
          </Link>
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl">For bedrifter:</h3>
          <p>
            Vi tilbyr også muligheten for bedrifter til å holde en
            bedriftspresentasjon som må finne sted på IFI (Ole-Johan Dahls hus).
            Dette er begrenset til 1 bedriftspresentasjon i semesteret totalt,
            uavhengig av bedrift.
          </p>
        </div>
      </main>
    </div>
  );
}
