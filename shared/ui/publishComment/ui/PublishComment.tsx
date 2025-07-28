'use client';

import * as React from 'react';
import { Button, TextAreaComponent } from '@irondragons/ui-lib-inctagram';
import s from './publishComment.module.scss';

type Props = {

};

export const PublishComment = ({}: Props) => {
  return (
    <div className={s.AddPostComment}>
      <div className={s.AddPostCommentField}>
        <TextAreaComponent id={'1'} className={s.AreaWrapper} placeholder={'Add a' +
          ' Comment'} />
      </div>
      <div className={s.AddPostCommentButton}>
        <Button variant={'text_button'}>
          Publish
        </Button>
      </div>
    </div>
  );
};