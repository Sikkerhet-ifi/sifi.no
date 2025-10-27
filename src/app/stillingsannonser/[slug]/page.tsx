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
  const resolvedParams = await params;
  const post = await client.fetch<SanityDocument>(
    ANNONSE_QUERY,
    resolvedParams as QueryParams,
    options
  );
  console.log(post);
  if (post == null) {
    return notFound();
  }
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(450).height(250).auto('format').url()
    : null;
  return (
    <main className="min-h-screen p-4 md:p-10 flex flex-col items-center dark:bg-gray-900">
      {/*Back */}
      <div className="w-full max-w-6xl mb-12">
        <Link
          href="/stillingsannonser"
          className="text-left hover:underline mb-6"
        >
          ← Tilbake til stillingsannonser
        </Link>
      </div>

      <div className="flex flex-col  justify-center md:flex-row md:justify-center md:items-start gap-10 w-full max-w-6xl mt-6">
        <h1 className="text-3xl font-bold mb-2 text-center block md:hidden">
          {post.title}
        </h1>
        <div className="flex flex-col items-center md:items-center w-full md:w-1/2 space-y-6">
          {/* Picture */}
          {postImageUrl && (
            <Image
              src={postImageUrl}
              alt={post.title}
              className="aspect-video rounded-xl mb-8 border-1 border-gray-700 shadow-lg shadow-gray-400"
              width="380"
              height="200"
            />
          )}

          {post.applyButton?.url && (
            <a
              href={post.applyButton.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors text-2xl"
            >
              {post.applyButton.text || 'Søk her'}
            </a>
          )}

          <p className="text-gray-500 text-sm italic">
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
        <div className="prose md:flex md:flex-col md:items-center md:flex-wrap text-center md:w-1/2 md:pt-[rem]">
          <h1 className="text-3xl font-bold mb-10 text-center hidden md:block">
            {post.title}
          </h1>

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
      </div>
    </main>
  );
}
