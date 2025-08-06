'use client';

import { RegisteredUsers } from '@/shared/ui/registeredUsers';
import { UserCardList } from '@/shared/ui/userFeedCard/ui/UserCardList/UserCardList';

export const PublicPage = () => {
  return (
    <>
      <RegisteredUsers />
      <UserCardList />
    </>
  );
};
