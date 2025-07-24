"use client";

import { ReactNode } from "react";
import "src/styles/index.scss";
import "@irondragons/ui-lib-inctagram/dist/style.css";
import s from "./page.module.scss";
import { store } from "@/src/app/provider/store";
import { Provider } from "react-redux";
import { Header } from "@/widgets/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          {/*   Заглушка   */}

          <div className={s.rootLayout}>
            <Header
              isAuth={false}
              isProcessingAuth={true}
              localization={"eng"}
            />
            {children}
          </div>
        </body>
      </html>
    </Provider>
  );
}
