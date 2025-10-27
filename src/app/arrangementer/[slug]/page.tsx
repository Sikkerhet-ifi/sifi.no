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
  const resolvedParams = await params;
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    resolvedParams as QueryParams,
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
      urlFor(image)?.width(2600).height(900).auto('format').url()
    ) || [];

  return (
    <main className="min-h-screen pt-8 dark:bg-gray-900 flex flex-col items-center">
      <div className="max-w-5xl mx-auto px-4">
        <Link
          href="/arrangementer"
          className="hover:underline inline-block mb-4"
        >
          ← Tilbake til arrangementer
        </Link>

        {/* Banner picture */}
        <div className="w-full mb-6">
          <Carousel className="w-full">
            <CarouselContent>
              {Array.from({ length: imageUrls.length }).map((_, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={imageUrls[index]}
                    alt={post.title}
                    width={2600}
                    height={900}
                    className="w-full h-auto rounded-xl"
                    unoptimized
                    priority
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </div>

      {/* Title and info */}
      <div className="mb-8 flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold mb-4">{post.title}</h1>

        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 mb-4 text-lg">
          <p className="text-gray-700 dark:text-gray-300">
            📅{' '}
            {new Date(post.eventStart).toLocaleDateString('nb-NO', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'Europe/Oslo',
            })}
          </p>
          <p className="text-gray-700 dark:text-gray-300">📍 {post.place}</p>
        </div>

        {post.registrationButton?.url && (
          <a
            href={post.registrationButton.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors text-lg"
          >
            {post.registrationButton.text || 'Meld deg på'}
          </a>
        )}
      </div>
      {/* Main description */}
      <div className="prose prose-lg max-w-3xl text-center px-4">
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
