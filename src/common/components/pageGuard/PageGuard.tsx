"use client";

import { ReactNode } from "react";

type Props = {
  isAuthenticated: boolean;
  children: ReactNode;
};

export const PageGuard = ({ isAuthenticated, children }: Props) => {

  return <>{children}</>;
};
