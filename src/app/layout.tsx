'use client';

import { store } from '@/src/app/provider/store';
import { Sidebar } from '@/widgets/sidebar/ui/Sidebar';
import '@irondragons/ui-lib-inctagram/dist/style.css';
import { Fragment, ReactNode } from 'react';
import { Provider } from 'react-redux';
import 'src/styles/index.scss';
import s from './page.module.scss';
import { Header } from '@/widgets/header';

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
      <body>
      <div className={s.rootLayout}>
        <Header isAuth={true} localization={'eng'} />
        <div className={s.display}>
          <Sidebar />
          <div className={s.display}>{children}</div>
        </div>
      </div>
      </body>
      </html>
    </Provider>
  );
}
