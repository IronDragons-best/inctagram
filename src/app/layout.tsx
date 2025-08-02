"use client";

import { store } from "@/src/app/provider/store";
import "@irondragons/ui-lib-inctagram/dist/style.css";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import "src/styles/index.scss";
import s from "./page.module.scss";
import { Header } from "@/widgets/header";
import { Sidebars } from "@/widgets/sidebars";
import { usePathname } from "next/navigation";
import { PATH } from "@/shared/constants/path";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const path = usePathname();
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <div className={s.rootLayout}>
            <Header isAuth={true} localization={"eng"} />
            <div className={s.display}>
              {path !== PATH.sign_up && <Sidebars />}
              <div className={s.mainWrapper} data-isuserauthorized={false}>
                {children}
              </div>
            </div>
          </div>
        </body>
      </html>
    </Provider>
  );
}
