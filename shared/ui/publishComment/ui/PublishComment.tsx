'use client'

import { Button, TextAreaComponent } from '@irondragons/ui-lib-inctagram'
import s from './publishComment.module.scss'

export const PublishComment = () => {
  return (
    <div className={s.addPostComment}>
      <div className={s.addPostCommentField}>
        <TextAreaComponent id={'1'} className={s.areaWrapper} placeholder={'Add a' + ' Comment'} />
      </div>
      <div className={s.addPostCommentButton}>
        <Button variant={'text_button'}>Publish</Button>
      </div>
    </div>
  )
}
