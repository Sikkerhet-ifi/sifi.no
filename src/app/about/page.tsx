import Image from 'next/image';
const boardMembers = [
  {
    name: "Pernille Vannebo",
    role: "Leder",
    image: "/images/Styret/PernilleLeder.jpeg",
  },
  {
    name: "Tobias With Thorsen",
    role: "Nestleder",
    image: "/images/Styret/TobiasNestleder.jpeg",
  },
  {
    name: "Vegard Otterlei",
    role: "Økonomiansvarlig",
    image: "/images/Styret/VegardØkonomi.jpeg",
  },
  {
    name: "Magnus Økstad",
    role: "Bedriftskontakt",
    image: "/images/Styret/MagnusBedrift.jpeg",
  },
  {
    name: "Julia Vister",
    role: "PR",
    image: "/images/Styret/JuliaPR.jpeg",
  },
  {
    name: "Adrian Skansen",
    role: "Arrangementansvarlig",
    image: "/images/Styret/AdrianArrangement.jpeg",
  },
  {
    name: "Ahmed Abdulahi Ahmed",
    role: "Styremedlem",
    image: "/images/Styret/AhmedStyremedlem.jpeg",
  },
  {
    name: "Emil Johannessen",
    role: "Styremedlem",
    image: "/images/Styret/EmilStyremedlem.jpeg",
  },
  {
    name: "Sindre Vikre",
    role: "Styremedlem",
    image: "/images/Styret/SindreStyremedlem.jpeg",
  },
];
const About = () => {
  return (
    <div className="min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Hvem er vi?</h1>
        <div className="space-y-8">
          <section className="flex flex-col md:flex-row items-center">
            <div>
              <p>
                SIFI, Sikkerhet på IFI, er linjeforeningen for
                Informasjonssikkerhet ved UiO, og alle studenter ved{' '}
                <a
                  href="https://www.uio.no/studier/program/informasjonssikkerhet-master/"
                  className="hover:underline"
                >
                  Master i Informasjonssikkerhet
                </a>{' '}
                er automatisk medlemmer i foreningen.
              </p>
              <p>
                Vi arrangerer sosiale og faglige arrangement for å skape et godt
                miljø for våre medlemmer og andre interesserte studenter ved
                Institutt for Informatikk. Foreningen drives av frivillige og
                engasjerte studenter
              </p>
            </div>
          </section>
          <section className="flex flex-col items-center">
            <div className="items-center">
              <h2 className="text-2xl font-semibold mb-2">Møt styret 2025</h2>
              <p>
                Linjeforeningens styre består av 9 medlemmer som er demokratisk
                valgt, og har som hovedansvar å aktivt arbeide for å drive
                linjeforeningen, styre økonomien og sørge for at foreningens
                formål blir møtt.
              </p>
              <div className="w-full mt-6 aspect-[16/9]  relative">
              <Image
                src="/images/Styret/Styret25.jpeg"
                alt="Styret 2025"
                width={1920}
                height={1080}
                className="w-full rounded-lg shadow-lg"
              ></Image>
              </div>
              {/*<p className="py-2">SIFI sitt hovedstyre består av:</p> */}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
              {boardMembers.map((member) => (
                <div
                  key={member.name}
                  className="flex flex-col items-center text-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
                 >
                  <div className="w-48 h-48 relative mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 200px"
                      className="rounded-full object-cover"
                    />
                  </div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {member.role}
                  </p>
                </div>
              ))}
          </div>
              {/*<ul className="list-inside list-disc pb-8">
                <li>Leder: Pernille Vannebo</li>
                <li>Nestleder: Tobias With Thorsen</li>
                <li>Økonomiansvarlig: Vegard Otterlei</li>
                <li>Bedriftskontakt: Magnus Økstad</li>
                <li>PR: Julia Vister</li>
                <li>Arrangementansvarlig: Adrian Skansen</li>
                <li>Styremedlem: Ahmed Abdulahi Ahmed</li>
                <li>Styremedlem: Emil Johannessen</li>
                <li>Styremedlem: Sindre Vikre</li>
              </ul>*/}
            </div> 
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              {/* Legg inn bildet av styret her! */}
              {/* <Image
                src="/images/logo_liten_utenbak_white.png"
                alt="Our Team"
                width={100}
                height={50}
                className="w-full md:w-48 rounded-lg shadow-lg"
              ></Image> */}
            </div>
          </section>
          <section className="flex flex-col md:flex-row items-center">
            <div className="items-center">
              <h2 className="text-2xl font-semibold mb-2 items-center">
                Interne
              </h2>
              <p className="items-center">
                Uten om hovedstyret, har SIFI opptil 15 frivillige studenter som
                er det vi kaller for interne. De støtter hovedstyret med
                arrangementer og andre oppgaver. Takk til alle interne!
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
