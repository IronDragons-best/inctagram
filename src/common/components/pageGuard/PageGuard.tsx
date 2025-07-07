"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  isAuthenticated: boolean;
  children: ReactNode;
};

export const PageGuard = ({ isAuthenticated, children }: Props) => {
  const router = useRouter();

  return <>{children}</>;
};
