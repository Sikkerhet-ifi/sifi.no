import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Store all boards here
const boards = {
  2025: {
    groupPhoto: '/images/Styret/Styret25ny.jpeg',
    members: [
      { name: 'Pernille Vannebo', role: 'Leder', image: '/images/Styret/PernilleLeder.jpeg' },
      { name: 'Tobias With Thorsen', role: 'Nestleder', image: '/images/Styret/TobiasNestleder.jpeg' },
      { name: 'Vegard Otterlei', role: 'Økonomiansvarlig', image: '/images/Styret/VegardØkonomi.jpeg' },
      { name: 'Magnus Økstad', role: 'Bedriftskontakt', image: '/images/Styret/MagnusBedrift.jpeg' },
      { name: 'Julia Vister', role: 'PR', image: '/images/Styret/JuliaPR.jpeg' },
      { name: 'Adrian Skansen', role: 'Arrangementansvarlig', image: '/images/Styret/AdrianArrangement.jpeg' },
      { name: 'Ahmed Abdulahi Ahmed', role: 'Styremedlem', image: '/images/Styret/AhmedStyremedlem.jpeg' },
      { name: 'Emil Johannessen', role: 'Styremedlem', image: '/images/Styret/EmilStyremedlem.jpeg' },
      { name: 'Sindre Vikre', role: 'Styremedlem', image: '/images/Styret/SindreStyremedlem.jpeg' },
    ],
  },
  2026: {
    groupPhoto: '/images/Styret/Styret25.jpeg',
    members: [
      { name: 'Ny leder', role: 'Leder', image: '/images/spørsmål.png' },
      { name: 'Ny nestleder', role: 'Nestleder', image: '/images/spørsmål.png' },
      { name: 'Ny økonomi', role: 'Økonomiansvarlig', image: '/images/spørsmål.png' },
      { name: 'Ny', role: 'Bedriftskontakt', image: '/images/spørsmål.png' },
      { name: 'Ny', role: 'PR', image: '/images/spørsmål.png' },
      { name: 'Ny', role: 'Arrangementansvarlig', image: '/images/spørsmål.png' },
      { name: 'Ny', role: 'Teknisk ansvarlig', image: '/images/spørsmål.png' },
      { name: 'Ny', role: 'Styremedlem', image: '/images/spørsmål.png' },
      { name: 'Ny', role: 'Styremedlem', image: '/images/spørsmål.png' },
    ],
  },
  // Add more years later...
};

const About = () => {
  const years = Object.keys(boards).map(Number).sort((a, b) => a - b);
  const currentYear = new Date().getFullYear();
  const startYear = years.includes(currentYear) ? currentYear : years[years.length - 1];

  return (
    <div className="min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Hvem er vi?</h1>

        {/* Intro */}
        <section className="mb-12">
          <p>
            SIFI, Sikkerhet på IFI, er linjeforeningen for Informasjonssikkerhet
            ved UiO, og alle studenter ved{' '}
            <a
              href="https://www.uio.no/studier/program/informasjonssikkerhet-master/"
              className="hover:underline"
            >
              Master i Informasjonssikkerhet
            </a>{' '}
            er automatisk medlemmer i foreningen.
          </p>
          <p className="mt-4">
            Vi arrangerer sosiale og faglige arrangement for å skape et godt
            miljø for våre medlemmer og andre interesserte studenter ved
            Institutt for Informatikk. Foreningen drives av frivillige og
            engasjerte studenter. Uten om hovedstyret, har SIFI opptil 15
            frivillige studenter som er det vi kaller for interne. De støtter
            hovedstyret med arrangementer og andre oppgaver. Takk til alle
            interne!
          </p>
        </section>

        {/* Board Carousel */}
        <section className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-6">Møt styret</h2>

          <Carousel
            className="w-full"
            opts={{ startIndex: years.indexOf(startYear) }}
          >
            <CarouselContent>
              {Object.entries(boards).map(([year, data]) => (
                <CarouselItem key={year}>
                  <div className="flex flex-col items-center">
                    <h3 className="text-xl font-bold mb-4">Styret {year}</h3>

                    {/* Group photo */}
                    <div className="w-full max-w-4xl mx-auto aspect-[16/9] relative mb-6">
                      <Image
                        src={data.groupPhoto}
                        alt={`Styret ${year}`}
                        fill
                        className="w-full rounded-lg shadow-lg object-cover"
                      />
                    </div>

                    {/* Members grid */}
                    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {data.members.map((member) => (
                        <div
                          key={member.name}
                          className="flex flex-col items-center text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full"
                        >
                          <div className="w-full aspect-[3/4] relative mb-4">
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="rounded-lg object-cover"
                            />
                          </div>
                          <p className="font-semibold text-lg">{member.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {member.role}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      </div>
    </div>
  );
};

export default About;
