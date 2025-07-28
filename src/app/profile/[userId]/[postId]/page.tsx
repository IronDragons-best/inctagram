type ParamsType = {
  userId: string;
  postId: string;
};

type Props = {
  params: Promise<ParamsType>;
};

const Page = async ({ params }: Props) => {
  console.log(params);
  const postId = (await params).postId;

  return <div>post id</div>;
};

export default Page;
