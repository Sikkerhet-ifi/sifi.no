import Link from 'next/link';
import Image from 'next/image';
import { type SanityDocument } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/sanity/client';

const MERCH_QUERY = `
  *[_type == "merch"] | order(_createdAt desc)
`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

interface Merch {
  _id: string;
  title: string;
  images?: SanityImageSource[];
  slug?: { current: string };
  description?: string;
  stock?: number;
}

async function MerchPageInner() {
  const merchItems = await client.fetch<SanityDocument>(MERCH_QUERY, {}, options);

  if (!merchItems || merchItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-start items-center gap-4 pt-20 dark:bg-gray-900">
        <p className="text-2xl font-semibold">Ingen merch enda!</p>
        <p className="text-xl">Følg med her, vi fyller på snart 😄</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {merchItems.map((item) => {
          const imageUrls =
            item.images?.map((image: SanityImageSource) =>
              urlFor(image)?.width(550).height(310).url()
            ) || [];

          const page_id = item.slug?.current || '';
          const firstImageUrl = imageUrls[0];

          return (
            <div
              key={item._id}
              className="p-4 rounded-xl shadow bg-white dark:bg-gray-800"
            >
              {firstImageUrl && (
                <Link href={`/merch/${page_id}`}>
                  <Image
                    src={firstImageUrl}
                    alt={item.title}
                    className="aspect-video rounded-xl mb-3"
                    width={550}
                    height={310}
                  />
                </Link>
              )}

              <Link href={`/merch/${page_id}`}>
                <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
              </Link>

              {item.description && (
                <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                  {item.description}
                </p>
              )}
              <p className="font-medium">På lager: {item.stock ?? 'Ukjent'}</p>

              <p className="mt-3">
                <a
                  href={`mailto:styret@sifi.no?subject=Bestilling%20av%20${encodeURIComponent(
                    item.title
                  )}`}
                  className="text-blue-500 underline font-semibold"
                >
                  Kontakt for bestilling
                </a>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const Merch = () => {
  return (
    <div className="min-h-screen flex flex-col justify-start items-center dark:bg-gray-900">
      <MerchPageInner />
    </div>
  );
};

export default Merch;
