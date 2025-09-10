'use client'

import { useState } from 'react'
import { Button, Input, UniversalIcon } from '@irondragons/ui-lib-inctagram'
import { useExpiredLinkMutation } from '@/features/auth/api/authApi'
import { EmailConfirmationPage } from '@/views/auth/pages/emailConfirmationPage'
import s from './expiredLink.module.scss'

const ExpiredLink = () => {
  const [email, setEmail] = useState('')
  const [expiredLinkHandler] = useExpiredLinkMutation()

  const handleResend = async () => {
    try {
      await expiredLinkHandler(email).unwrap()
      // тост в услучае успеха
      alert('Verification link sent successfully. Please check your email.')
    } catch (err: any) {
      if (err?.status === 429) {
        // тост в услучае ошибки
        alert('Too many attempts, try again later.')
      } else {
        alert(err?.data?.message ?? 'Something went wrong, please try again.')
      }
    }
  }

  return (
    <EmailConfirmationPage
      title="Email verification link expired"
      description="Looks like the verification link has expired. Not to worry, we can send the link again"
    >
      <>
        <div className={s.wrapper}>
          <div className={s.inputWrapper}>
            <Input
              fullWidth
              inputType={'email'}
              placeholder={'Epam@epam.com'}
              label={'Email'}
              onBlur={e => setEmail(e.target.value)}
            />
          </div>
          <Button variant={'primary'} fullWidth onClick={handleResend}>
            Resend verification link
          </Button>
        </div>
        <div className={s.iconWrapper}>
          <UniversalIcon name={'ExpiredLink'} dataStatic />
        </div>
      </>
    </EmailConfirmationPage>
  )
}

export default ExpiredLink
