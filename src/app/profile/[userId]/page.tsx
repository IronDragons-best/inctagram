type Props = {
  params: Promise<{ userId: string }>;
};

const UserPage = async ({ params }: Props) => {
  const id = (await params).userId;

  return <div>user id: {id}</div>;
};

export default UserPage;
