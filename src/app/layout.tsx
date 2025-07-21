"use client";

import { ReactNode } from "react";
import "src/styles/index.scss";
import "@irondragons/ui-lib-inctagram/dist/style.css";
import s from "./page.module.scss";
import { store } from "@/src/app/provider/store";
import { Provider } from "react-redux";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <div className={s.rootLayout}>{children}</div>
        </body>
      </html>
    </Provider>
  );
}
