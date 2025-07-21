"use client";

import { Alert, Button } from "@irondragons/ui-lib-inctagram";

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
