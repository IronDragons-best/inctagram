"use client";

import { store } from "@/src/app/provider/store";
import { Sidebar } from "@/widgets/sidebar/ui/Sidebar";
import "@irondragons/ui-lib-inctagram/dist/style.css";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import "src/styles/index.scss";
import s from "./page.module.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <Sidebar/>
          <div className={s.rootLayout}>{children}</div>
        </body>
      </html>
    </Provider>
  );
}
