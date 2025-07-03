import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{ isAuth: string }>;
};

const Profile = async ({ searchParams }: Props) => {
  // Вместо параметров будет me запрос
  const { isAuth } = await searchParams;

  if (isAuth === "false") {
    redirect("/");
  }

  return (
    <>
      <div>Profile page (private)</div>
    </>
  );
};

export default Profile;
