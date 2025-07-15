"use client";

import { ReactNode } from "react";
import styles from "./authLayout.module.scss";
import { Header } from "@/widgets/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      {/*   Заглушка   */}
      <Header isAuth={false} isProcessingAuth={true} localization={"eng"} />
      <div className={styles.authContent}>{children}</div>
    </>
  );
}
