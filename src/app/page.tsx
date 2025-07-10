"use client";

import 'src/styles/_boilerplate.scss'
import "@irondragons/ui-lib-inctagram/dist/style.css";
import { Alert, Button, Header } from "@irondragons/ui-lib-inctagram";

export default function Home() {
  return (
    <>
      <Header isAuth={true} localization={'eng'}/>

      {/* Should be visible if user is logged in */}
      {/*<aside>aside</aside>*/}
      {/*<main className={styles.page}>home page</main>*/}
    </>
  );
}
