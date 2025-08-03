'use client';
import React from 'react';
import { Header } from '@/widgets/header';
import { Sidebar } from '@/widgets/sidebars';

export const PublicAuthorizedUser = () => {
  return (
    <div>
      <Header isAuth={false} isProcessingAuth={true} localization={"eng"} />
      <Sidebar />
    </div>
  );
};