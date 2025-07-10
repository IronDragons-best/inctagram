import styles from "./emailConfirmationPage.module.scss";
import { ReactElement } from "react";

type Props = {
  title: string;
  description: string;
  children: ReactElement;
};

export const EmailConfirmationPage = ({
  children,
  description,
  title,
  ...rest
}: Props) => {
  return (
    <>
      title: {title}
      description: {description}
      children: {children}
    </>
  );
};
