import {
  PortableText,
  PortableTextReactComponents,
  QueryParams,
  type SanityDocument,
} from 'next-sanity';
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

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
const options = { next: { revalidate: 30 } };
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    params as QueryParams,
    options
  );
  console.log(
    post.eventStart.toLocaleString('nb-NO', { timeZone: 'Europe/Oslo' })
  );
  if (!post) {
    return notFound();
  }

  const imageUrls =
    post.images?.map((image: SanityImageSource) =>
      urlFor(image)?.width(550).height(310).url()
    ) || [];

  return (
    <main className="min-h-screen p-4 pt-8 md:pt-10 mb-1 flex flex-col md:flex-row md:justify-center md:items-start items-center gap-4 m-0 dark:bg-gray-900">
      <div className="flex flex-col md:pr-8 max-w-[550px]">
        <Link href="/arrangementer" className="hover:underline">
          ← Tilbake til arrangementer
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
                        alt={post.title}
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
          {post.title}
        </h1>
        <p>
          Tidspunkt:{' '}
          {new Date(post.eventStart).toLocaleDateString('nb-NO', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Europe/Oslo',
          })}{' '}
        </p>
        <p className="max-w-[550px]">Sted: {post.place}</p>
      </div>
      <div className="prose md:flex md:flex-col md:justify-center md:items-center md:flex-wrap md:text-center md:w-96 md:pt-8">
        {Array.isArray(post.body) && (
          <PortableText
            value={post.body}
            components={
              {
                marks: {
                  link: ({ children, value }) => (
                    <a
                      href={value.href}
                      className="text-blue-500 hover:underline"
                    >
                      {children}
                    </a>
                  ),
                },
                block: {
                  // Define block-level styles here for headers, paragraphs, etc.
                  // Not entirely sure why, but h2 and below works, but not h1.
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold">{children}</h2>
                  ),
                  normal: ({ children }) => (
                    <p className="whitespace-pre-line leading-tight">
                      {children
                        ? Array.isArray(children)
                          ? children.map((line: string, index: number) => (
                              <span key={index}>
                                {line}
                                <br />
                              </span>
                            ))
                          : children // Handle the case where children is a single element or string
                        : null}
                    </p>
                  ),
                },
              } as Partial<PortableTextReactComponents>
            }
          />
        )}
      </div>
    </main>
  );
}
