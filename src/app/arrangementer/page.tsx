import Link from 'next/link';
import Image from 'next/image';
import { type SanityDocument } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/sanity/client';

const POST_QUERY = `
  *[_type == "post"] | order(eventStart asc)
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
  images?: SanityImageSource[];
  slug?: { current: string };
  publishedAt: string;
  eventStart: string;
  eventEnd: string;
  body: string;
}

async function PostPage() {
  const posts = await client.fetch<SanityDocument>(POST_QUERY, {}, options);
  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-start items-center gap-4 pt-20 dark:bg-gray-900">
        <p className="text-2xl font-semibold">Her var det tomt gitt!</p>
        <p className="text-xl">Følg med her for fremtidige arrangementer 😄</p>
      </div>
    );
  }

  const today = new Date();
  const filteredPosts =
    posts?.filter((post: Post) => {
      const eventEnd = new Date(post.eventEnd);
      return eventEnd.getTime() > today.getTime();
    }) || [];

  // Viser riktig info når sanity ikke er tomt, men filtered

  if (filteredPosts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-start items-center gap-4 pt-20 dark:bg-gray-900">
        <p className="text-2xl font-semibold">Her var det tomt gitt!</p>
        <p className="text-xl">
          Følg med her for fremtidige arrangementer 😄
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post: Post) => {
          const imageUrls =
            post.images?.map((image: SanityImageSource) =>
              urlFor(image)?.width(550).height(310).url()
            ) || [];

          const page_id = post.slug?.current || '';
          const firstImageUrl = imageUrls[0];

          return (
            <div
              key={post._id}
              className="p-4 rounded-xl shadow bg-white dark:bg-gray-800"
            >
              {firstImageUrl && (
                <Link href={`/arrangementer/${page_id}`}>
                  <Image
                    src={firstImageUrl}
                    alt={post.title}
                    className="aspect-video rounded-xl mb-3"
                    width="550"
                    height="310"
                  />
                </Link>
              )}
              <Link href={`/arrangementer/${page_id}`}>
                <h1 className="text-2xl font-bold mb-2 text-pretty break-words">
                  {post.title}
                </h1>
              </Link>

              <p className="text-sm text-gray-700 dark:text-gray-300">
                Tidspunkt:{' '}
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
            </div>
          );
        })}
      </div>
    </div>
  );
}

const Arrangementer = () => {
  return (
    <div className="min-h-screen flex flex-col justify-start items-center dark:bg-gray-900">
      <PostPage />
    </div>
  );
};

export default Arrangementer;
