'use client';

import s from './emailConfirmationPage.module.scss';
import { ReactElement } from 'react';

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
    <div className={s.wrapper} {...rest}>
      <div className={s.content}>
        <h1 className={s.title}>{title}</h1>
        <p className={s.text}>{description}</p>
      </div>
      {children}
    </div>
  );
};
