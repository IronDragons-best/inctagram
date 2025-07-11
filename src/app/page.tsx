"use client";

import styles from "./page.module.scss";
import "@irondragons/ui-lib-inctagram/dist/style.css";
import { Alert, Button, Header } from "@irondragons/ui-lib-inctagram";

export default function Home() {
  return (
    <>
      <Button variant="primary" fullWidth={false}>
        btn
      </Button>
      <Alert closable={true} variant={"success"}>
        "ЕЛИСЕЙ!"
      </Alert>
      {/* Should be visible if user is logged in */}
      <aside>aside</aside>
      <main className={styles.page}>home page</main>
    </>
  );
}
