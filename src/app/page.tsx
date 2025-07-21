"use client";

import { Header } from '@/widgets/header';

export default function Home() {
  return (
    <>
      <Header isAuth={false} isProcessingAuth={true} localization={"eng"} />
      <div>
        Тут будут красивые карточки, но не сегодня
      </div>
    </>
  );
}
