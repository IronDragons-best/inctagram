'use client'

import { RECAPTCHA_SITE_KEY } from '@/shared/config/recaptcha'
import { Button, Card, Input, ReCaptcha } from '@irondragons/ui-lib-inctagram'
import * as React from 'react'
import { useState } from 'react'
import s from './ForgotPasswordForm.module.scss'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordFormSchema, InputForm } from '@/features/auth/forgot-password/lib/schemas/forgotPasswordForm'

export const ForgotPasswordForm = () => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [isCaptchaPassed, setIsCaptchaPassed] = useState(false)
  const [isLinkSent, setIsLinkSent] = useState(false)

  const handleCaptcha = (token: string) => {
    setCaptchaToken(token)
    setIsCaptchaPassed(true)
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputForm>({
    resolver: zodResolver(forgotPasswordFormSchema),
  })

  const onSubmit: SubmitHandler<InputForm> = data => {
    setIsLinkSent(true)
    if (!captchaToken) {
      alert('Подтвердите капчу')
      return
    }
    console.log(data)
    console.log({ captchaToken })
  }

  // const handleSubmit = async () => {
  //   if (!captchaToken) {
  //     alert('Подтвердите капчу')
  //     return
  //   }
  //
  //   console.log({ captchaToken })
  // }

  return (
    <Card>
      <form className={s.forgotPassForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.forgotPassForm__container}>
          <h1 className={s.forgotPassForm__title}>Forgot Password</h1>
          <Input
            id={'email'}
            inputType={'email'}
            label={'Email'}
            placeholder="Epam@epam.com"
            fullWidth={true}
            errorText={errors.email?.message}
            required
            {...register('email')}
          />
          <p className={s.forgotPassForm__descr}>Enter your email address and we will send you further instructions </p>
          {isLinkSent && (
            <div className={s.forgotPassForm__info}>
              <p>The link has been sent by email.</p>
              <p>If you don’t receive an email send link again</p>
            </div>
          )}
          <Button className={s.forgotPassForm__sendLink} fullWidth={true} type="submit">
            {isLinkSent ? 'Send Link Again' : 'Send Link'}
          </Button>
          <Link href={'/'} className={s.forgotPassForm__backSignIn}>
            Back to Sign In
          </Link>
          {!isLinkSent && (
            <ReCaptcha
              siteKey={RECAPTCHA_SITE_KEY}
              setCaptchaToken={handleCaptcha}
              isCaptchaPassed={isCaptchaPassed}
            ></ReCaptcha>
          )}
        </div>
      </form>
    </Card>
  )
}
