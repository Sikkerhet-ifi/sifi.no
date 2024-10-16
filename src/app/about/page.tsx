import Image from 'next/image';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Om oss</h1>
        <div className="space-y-8">
          <section className="flex flex-col md:flex-row items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-2"></h2>
              <p>Sikkerhet på IFI</p>
            </div>
          </section>
          <section className="flex flex-col md:flex-row items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Ta kontakt</h2>
              <p>sikkerhet@ifi.no</p>
            </div>
          </section>
          <section className="flex flex-col items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Hovedstyret</h2>
              <p>SIFI sitt hovedstyre består av</p>
            </div>
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <Image
                src="/images/logo_liten_utenbak_white.png"
                alt="Our Team"
                width={100}
                height={50}
                className="w-full md:w-48 rounded-lg shadow-lg"
              ></Image>
            </div>
          </section>
          <section className="flex flex-col md:flex-row items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Interne</h2>
              <p>Takk til alle interne!</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
