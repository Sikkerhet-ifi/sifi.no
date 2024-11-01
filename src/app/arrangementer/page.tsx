import Link from 'next/link';
import Image from 'next/image';
import { type SanityDocument } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/sanity/client';
import { notFound } from 'next/navigation';

const POST_QUERY = `
  *[_type == "post"] | order(_createdAt desc)[0...3]
`;
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
const options = { next: { revalidate: 30 } };
interface Post {
  _id: string;
  title: string;
  image?: SanityImageSource;
  slug?: { current: string };
  publishedAt: string;
  eventStart: string;
  body: string;
}
async function PostPage() {
  const posts = await client.fetch<SanityDocument>(POST_QUERY, {}, options);
  console.log(posts);
  if (!posts || posts.length === 0) {
    return notFound();
  }
  return (
    <div>
      {posts.map((post: Post) => {
        const postImageUrl = post.image
          ? urlFor(post.image)?.width(550).height(310).url()
          : null;

        const page_id = post.slug?.current || '';

        return (
          <div key={post._id} className="mb-12 p-8">
            {postImageUrl && (
              <Link href={`/arrangementer/${page_id}`}>
                <Image
                  src={postImageUrl}
                  alt={post.title}
                  className="aspect-video rounded-xl pb-2"
                  width="550"
                  height="310"
                />
              </Link>
            )}
            <Link href={`/arrangementer/${page_id}`}>
              <h1 className="text-4xl font-bold mb-4 ">{post.title}</h1>
            </Link>

            <div className="">
              <p>
                Publisert:{' '}
                {new Date(post.publishedAt).toLocaleDateString('nb-NO')}
              </p>
              <p>
                Tidspunkt:{' '}
                {new Date(post.eventStart).toLocaleDateString('nb-NO')}{' '}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const Arrangementer = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center-start items-center md:flex-row md:justify-center gap-0 md:gap-4 dark:bg-gray-900">
      <PostPage></PostPage>
    </div>
  );
};

export default Arrangementer;
