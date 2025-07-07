import { PageGuard } from "@/common/components/pageGuard/PageGuard";

const Page = () => {
  return (
    <PageGuard isAuthenticated={false}>
      <div>sign in</div>
    </PageGuard>
  );
};

export default Page;
