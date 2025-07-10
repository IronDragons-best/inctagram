"use client";

import { ReactNode } from "react";
import { Header } from "@irondragons/ui-lib-inctagram";
import styles from "./authLayout.module.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      {/*   Заглушка   */}
      <Header isAuth={false} isProcessingAuth={true} localization={"rus"} />
      <div className={styles.authContent}>{children}</div>
    </>
  );
}
