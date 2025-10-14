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

const ANNONSE_QUERY = `*[_type == "stillingsannonse" && slug.current == $slug][0]`;

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
    ANNONSE_QUERY,
    params as QueryParams,
    options
  );
  console.log(post);
  if (post == null) {
    return notFound();
  }
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;
  return (
    <main className="min-h-screen p-4 pt-8 md:pt-10 flex flex-col md:flex-row md:justify-center md:items-start items-center gap-4 m-0 dark:bg-gray-900">
      <div className="">
        <Link href="/stillingsannonser" className="hover:underline">
          ← Tilbake til stillingsannonser
        </Link>
        {postImageUrl && (
          <Image
            src={postImageUrl}
            alt={post.title}
            className="aspect-video rounded-xl"
            width="550"
            height="310"
          />
        )}
        <h1 className="text-4xl font-bold mb-8 text-pretty break-words">
          {post.title}
        </h1>
        <p>
          Søknadsfrist:{' '}
          {new Date(post.eventStart).toLocaleDateString('nb-NO', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'Europe/Oslo',
          })}{' '}
        </p>
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
