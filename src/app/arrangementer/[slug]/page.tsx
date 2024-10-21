import { PortableText, type SanityDocument } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/sanity/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';

// Get all possible events for static compiling
export async function generateStaticParams() {
  // Sanity query to get all slugs for your documents
  const query = `*[_type == "event"]{ "slug": slug.current }`;

  // Fetch the slugs from Sanity
  const slugs = await client.fetch(query);

  // Return the list of params as required by Next.js
  return slugs.map((event: { slug: string; }) => ({
    slug: event.slug, // The slug used in the route
  }));
}

const POST_QUERY = `*[_type == "event" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = await client.fetch<SanityDocument>(POST_QUERY, params, options);
  if (event == null) {
    return notFound();
  }
  const eventImageUrl = event.image
    ? urlFor(event.image)?.width(550).height(310).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">
        ← Tilbake til forsiden
      </Link>
      {eventImageUrl && (
        <Image
          src={eventImageUrl}
          alt={event.title}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{event.title}</h1>
      <div className="prose">
        <p>Published: {new Date(event.publishedAt).toLocaleDateString()}</p>
        <p>Tidspunkt: {new Date(event.eventStart).toLocaleDateString()} </p>
        {Array.isArray(event.body) && <PortableText value={event.body} />}
      </div>
    </main>
  );
}
