// This function is needed for static builing to Github Pages.
// TODO: When we implement Sanity, change this to fetching all slugs.
export async function generateStaticParams() {
  // Manually specify all possible slugs
  const slugs = ['test'];

  return slugs.map((slug) => ({
    slug,
  }));
}

interface Props {
  params: {
    slug: string;
  };
}

const Slug = ({ params }: Props) => {
  return <div>{params.slug}</div>;
};

export default Slug;
