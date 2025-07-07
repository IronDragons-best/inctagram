import { PageGuard } from "@/common/components/pageGuard/PageGuard";

const Profile = async () => {
  const isAuthenticated = true;

  return (
    <PageGuard isAuthenticated={isAuthenticated}>
      <div>Profile page (private)</div>
    </PageGuard>
  );
};

export default Profile;
