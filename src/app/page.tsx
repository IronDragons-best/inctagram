'use client'

import styles from "./page.module.css";
import '@irondragons/ui-lib-inctagram/dist/style.css';

export default function Home() {
  return (
    <>
      <header>header</header>
      {/* Should be visible if user is logged in */}
      <aside>aside</aside>
      <main className={styles.page}>home page</main>
    </>
  );
}
