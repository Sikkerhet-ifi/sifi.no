import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="w-full bottom-0 md:border-100 md:border-gray-300 md:mx-0 px-10 md:px-20 py-10 rounded-t-[40px] bg-sifiblue">
      <div className="w-full mx-auto max-w-screen-xl flex flex-col md:flex-row md:items-center justify-between md:justify-evenly px-4">
        <div className="flex flex-col text-gray-900 dark:text-gray-100 pb-2">
          <p className="text-white w-full underline">Ta kontakt:</p>
          <a
            href="mailto:sikkerhet@ifi.uio.no"
            className="hover:underline text-white"
          >
            sikkerhet@ifi.uio.no
          </a>
          <Link
            href="https://data.brreg.no/enhetsregisteret/oppslag/enheter/929168097"
            className="text-white hover:underline"
          >
            Organisasjonsnummer: 929 168 097
          </Link>
        </div>
        <div className="flex flex-col pb-2">
          <h4 className="text-white underline">Følg oss 💻</h4>
          <Link
            href="https://www.facebook.com/profile.php?id=100091625065665"
            className="hover:underline text-white"
          >
            Facebook
          </Link>
          <Link
            href="https://www.instagram.com/sikkerhetifi/"
            className="hover:underline text-white"
          >
            Instagram
          </Link>
        </div>
        <div>
          <p className="text-white underline">Samarbeidspartner:</p>
          <picture>
            <Image
              src={'/images/mnemonic-logo.png'}
              alt="white logo"
              height={300}
              width={250}
              className="shrink-0"
            ></Image>
          </picture>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
