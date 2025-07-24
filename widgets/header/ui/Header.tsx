"use client";
import {
  Button,
  Selectbox,
  UniversalIcon,
} from "@irondragons/ui-lib-inctagram";

import s from "./header.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PATH } from "@/shared/constants/path";

type Props = {
  isAuth: boolean;
  isProcessingAuth?: boolean;
  localization: string;
  notificationCount?: number;
};

export const Header = ({
  isAuth,
  isProcessingAuth = false,
  localization,
  notificationCount = 0,
}: Props) => {
  const router = useRouter();
  const convertNumber = (notificationCount: number): string => {
    return notificationCount > 9 ? `9+` : `${notificationCount}`;
  };

  const redirectionHandler = (path: string) => {
    router.push(path);
  };

  return (
    <header className={s.Header}>
      <div>
        <Link href={PATH.home} className={s.Logo}>
          Inctagram
        </Link>
      </div>
      <div className={s.Content}>
        {isAuth && (
          <div
            className={s.IconWrapper}
            data-notificationcount={convertNumber(notificationCount)}
          >
            <UniversalIcon name={"outline-bell"} />
          </div>
        )}
        <Selectbox
          value={localization}
          name={"aaa"}
          options={[
            { label: "Russian", value: "rus", icon: "Flag-Russia" },
            { label: "English", value: "eng", icon: "Flag-United-Kingdom" },
          ]}
          idProp={localization}
        />
        {!isAuth && !isProcessingAuth && (
          <>
            <Button
              variant="text_button"
              onClick={() => redirectionHandler(PATH.sign_in)}
            >
              Sign in
            </Button>
            <Button
              variant="primary"
              onClick={() => redirectionHandler(PATH.sign_up)}
            >
              Sign up
            </Button>
          </>
        )}
      </div>
    </header>
  );
};
