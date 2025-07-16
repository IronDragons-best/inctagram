"use client";

import styles from "./page.module.scss";
import "@irondragons/ui-lib-inctagram/dist/style.css";
import { Alert, Button, Header, Pagination } from "@irondragons/ui-lib-inctagram";

export default function Home() {
  return (
    <>
      <Button variant="primary" fullWidth={false}>
        btn
      </Button>
      <Alert closable={true} variant={"success"}>
        "ЕЛИСЕЙ!"
      </Alert>
    </>
  );
}
