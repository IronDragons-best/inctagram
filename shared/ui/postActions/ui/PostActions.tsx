'use client';

import { UniversalIcon } from '@irondragons/ui-lib-inctagram';

import s from './postActions.module.scss';

type Props = {
  isMessage?: boolean;
};


export const PostActions = ({isMessage = false}: Props) => {
  return (
    <div className={s.PostLikes}>
      <div className={s.IconGroup}>
        <div className={s.IconWrapper}>
          <UniversalIcon name={'heart-outline'} />
        </div>
        {isMessage && <div className={s.IconWrapper}>
          <UniversalIcon name={'message-circle-outline'} />
        </div>}
        <div className={s.IconWrapper}>
          <UniversalIcon name={'paper-plane-outline'} />
        </div>
      </div>
      <div className={s.IconGroup}>
        <div className={s.IconWrapper}>
          <UniversalIcon name={'bookmark-outline'} />
        </div>
      </div>
    </div>
  );
};