import { PortableText, type SanityDocument } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/sanity/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';

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
  params: { slug: string };
}) {
  const post = await client.fetch<SanityDocument>(POST_QUERY, params, options);
  console.log(post);
  if (post == null) {
    return notFound();
  }
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;
  return (
    <main className="min-h-screen w-full p-4 flex flex-col justify-top items-center gap-4 m-0 dark:bg-gray-900">
      <Link href="/" className="hover:underline">
        ← Tilbake til forsiden
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
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <div className="prose md:flex md:flex-col md:justify-center md:items-center md:flex-wrap md:text-center md:w-96">
        <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        <p>Tidspunkt: {new Date(post.eventStart).toLocaleDateString()} </p>
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>
    </main>
  );
}
