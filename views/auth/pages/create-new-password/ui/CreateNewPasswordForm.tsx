'use client'

import { Button, Card, Input } from '@irondragons/ui-lib-inctagram'
import s from './createNewPassword.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import {
  PasswordRecoveryFormType,
  passwordRecoveryValidation,
} from '@/views/auth/pages/create-new-password/lib/schemas/passwordConfirmation'
import { useCreateNewPasswordMutation } from '@/features/auth/api/authApi'
import { redirect } from 'next/navigation'
import { PATH } from '@/shared/constants/path'
import { createNewPasswordDto } from '@/shared/schemas/types/auth'

type Props = {
  refreshCode: string
}
// TODO: сделать type guard для поля status
export const CreateNewPasswordForm = ({ refreshCode }: Props) => {
  const [createNewPasswordHandler] = useCreateNewPasswordMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordRecoveryFormType>({
    resolver: zodResolver(passwordRecoveryValidation),
    mode: 'onBlur',
  })
  const onSubmitHandler: SubmitHandler<PasswordRecoveryFormType> = async data => {
    const payloadForNewPassword: createNewPasswordDto = {
      newPassword: data.passwordConfirmation,
      recoveryCode: refreshCode,
    }
    try {
      const res = await createNewPasswordHandler(payloadForNewPassword)
      const errorStatus = res.error?.status as number
      if (res.data === 204) {
        redirect(PATH.sign_in)
      } else if (errorStatus === 404) {
        redirect(PATH.sign_up)
      } else if (errorStatus === 400) {
        redirect(PATH.expired_link)
      }
    } catch {}
  }

  return (
    <Card>
      <div className={s.formWrapper}>
        <h2 className={s.formTitle}>Create New Password</h2>

        <form onSubmit={handleSubmit(onSubmitHandler)} className={s.form}>
          <Input
            id={'newPassword'}
            inputType={'password'}
            label={'New password'}
            placeholder={'New password'}
            errorText={errors.password?.message}
            fullWidth
            {...register('password')}
          />
          <Input
            id={'passwordConfirmation'}
            inputType={'password'}
            label={'Password confirmation'}
            placeholder={'Password confirmation'}
            fullWidth
            errorText={errors.passwordConfirmation?.message}
            {...register('passwordConfirmation')}
          />
          <span className={s.underTitle}>Your password must be between 6 and 20 characters</span>
          <Button className={s.button} variant={'primary'}>
            Create new password
          </Button>
        </form>
      </div>
    </Card>
  )
}
