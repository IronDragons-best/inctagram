"use client";

import { store } from "@/src/app/provider/store";
import "@irondragons/ui-lib-inctagram/dist/style.css";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import "@/src/styles/index.scss";
import s from "./authLayout.module.scss";
import { Header } from "@/widgets/header";

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <div className={s.authContent}>
            <Header
              isAuth={false}
              isProcessingAuth={true}
              localization={"eng"}
            />
            <div className={s.formWrapper}>{children}</div>
          </div>
        </body>
      </html>
    </Provider>
  );
}
