import { QueryParams, type SanityDocument } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/sanity/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const MERCH_QUERY = `*[_type == "merch" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function MerchDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const merch = await client.fetch<SanityDocument>(
    MERCH_QUERY,
    params as QueryParams,
    options
  );

  if (!merch) {
    return notFound();
  }

  const imageUrls =
    merch.images?.map((image: SanityImageSource) =>
      urlFor(image)?.width(550).height(310).url()
    ) || [];

  return (
    <main className="min-h-screen p-4 pt-8 md:pt-10 mb-1 flex flex-col md:flex-row md:justify-center md:items-start items-center gap-4 m-0 dark:bg-gray-900">
      <div className="flex flex-col md:pr-8 max-w-[550px]">
        <Link href="/merch" className="hover:underline">
          ← Tilbake til merch
        </Link>
        <div className="relative">
          <Carousel className="w-full px-0 m-0">
            <CarouselContent>
              {Array.from({ length: imageUrls.length }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    {imageUrls && (
                      <Image
                        src={imageUrls[index]}
                        alt={merch.title}
                        className="aspect-video rounded-xl"
                        width="550"
                        height="310"
                      />
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        <h1 className="text-4xl font-bold md:mb-1 text-pretty break-words">
          {merch.title}
        </h1>

        {merch.description && <p className="mb-2">{merch.description}</p>}

        <p className="font-medium">På lager: {merch.stock ?? 'Ukjent'}</p>

        <p className="mt-4">
          <a
            href={`mailto:styret@sifi.no?subject=Bestilling%20av%20${encodeURIComponent(
              merch.title
            )}`}
            className="text-blue-500 underline font-semibold"
          >
            Kontakt for bestilling
          </a>
        </p>
      </div>
    </main>
  );
}
