import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="w-full bottom-0 justify-between position:absolute maxW:1400px mx:auto px-4 md:px-20 py-10 max-w-7xl mx-auto rounded-t-[40px] bg-sifiblue">
      <div className="w-full mx-auto max-w-screen-xl flex flex-row md:flex md:items-center justify-between px-8">
        <div className="flex flex-col text-gray-900 dark:text-gray-100">
          <p className="text-white w-full">Ta kontakt: </p>
          <a href="mailto:sikkerhet@ifi.uio.no" className="hover:underline">
            sikkerhet@ifi.uio.no
          </a>
          <Link
            href="https://data.brreg.no/enhetsregisteret/oppslag/enheter/929168097"
            className="text-white hover:underline"
          >
            Organisasjonsnummer: 929 168 097
          </Link>
        </div>
        <div className="flex flex-col text-gray-900 dark:text-gray-100">
          <h4>Følg oss 💻</h4>
          <Link
            href="https://www.facebook.com/groups/122081460976446"
            className="hover:underline"
          >
            Facebook
          </Link>
          <Link
            href="https://www.instagram.com/sikkerhetifi/"
            className="hover:underline"
          >
            Instagram
          </Link>
        </div>
        <div>
          <picture>
            <Image
              src={'/images/logo_liten_utenbak_white.png'}
              alt="white logo"
              height={50}
              width={25}
            ></Image>
          </picture>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
