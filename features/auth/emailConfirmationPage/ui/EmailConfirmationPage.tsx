import styles from "./emailConfirmationPage.module.scss";
import { ReactElement } from "react";

type Props = {
  title: string;
  description: string;
  button: ReactElement;
  children: ReactElement;
};

export const EmailConfirmationPage = ({
  button,
  children,
  description,
  title,
  ...rest
}: Props) => {
  return (
    <>
      title: {title}
      description: {description}
      button: {button}
      children: {children}
    </>
  );
};
