'use client';

import { store } from '@/src/app/provider/store';

import { TabsSettings } from '@/views/profile/pages/profileSettings/tabsSettings/TabsSettings';
import '@irondragons/ui-lib-inctagram/dist/style.css';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import 'src/styles/index.scss';


export default function SettingsLayout({
                                     children,
                                   }: Readonly<{
  children: ReactNode;
}>) {
  
     
  return (
    <Provider store={store}>
      <html lang="en">
      <body>
         <TabsSettings/>
      </body>
      </html>
    </Provider>
  );
}
