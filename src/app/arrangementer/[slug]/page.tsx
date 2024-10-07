interface Props {
  params: {
    slug: string;
  };
}

const Slug = ({ params }: Props) => {
  return <div>{params.slug}</div>;
};

export default Slug;
