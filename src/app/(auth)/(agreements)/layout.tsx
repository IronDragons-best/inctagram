"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { UniversalIcon } from "@irondragons/ui-lib-inctagram";
import s from "./agreementsLayout.module.scss";
import { PATH } from "@/shared/constants/path";

function AgreementsLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <div className={s.wrapper}>
      <button className={s.btn} onClick={() => router.push(PATH.sign_up)}>
        <div className={s.iconWrapper}>
          <UniversalIcon name={"arrow-back-outline"} />
        </div>
        <span>Back to Sign Up</span>
      </button>
      {children}
    </div>
  );
}

export default AgreementsLayout;
