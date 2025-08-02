"use client";

import { useMeQuery } from "@/features/auth/api/authApi";

export default function Home() {
  const { data } = useMeQuery();

  console.log(data);

  return <>HOMeE</>;
}
