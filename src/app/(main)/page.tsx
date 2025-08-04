"use client";

import { useMeQuery } from "@/features/auth/api/authApi";
import { PublicPage } from "@/views/auth/pages/public-page/ui";

export default function Home() {
  const { data } = useMeQuery();

  console.log(data);

  return <PublicPage />;
}
