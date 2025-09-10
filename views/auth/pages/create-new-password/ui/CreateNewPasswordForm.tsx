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
import { useRouter } from 'next/navigation'
import { PATH } from '@/shared/constants/path'
import { createNewPasswordDto } from '@/shared/schemas/types/auth'
import { normalizeError } from '@/shared/utils/handleErrors'

type Props = {
  refreshCode: string
}
// TODO: сделать type guard для поля status
export const CreateNewPasswordForm = ({ refreshCode }: Props) => {
  const [createNewPasswordHandler] = useCreateNewPasswordMutation()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordRecoveryFormType>({
    resolver: zodResolver(passwordRecoveryValidation),
    mode: 'onBlur',
  })

  // TODO: доработать обработку ошибок
  const onSubmitHandler: SubmitHandler<PasswordRecoveryFormType> = async data => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      // тост
      alert('No network connection — please check your internet and try again.')
      return
    }

    const payloadForNewPassword: createNewPasswordDto = {
      newPassword: data.password,
      recoveryCode: refreshCode,
    }

    try {
      await createNewPasswordHandler(payloadForNewPassword).unwrap()
      router.push(PATH.sign_in)
    } catch (rawErr: any) {
      const err = normalizeError(rawErr)

      if (!err.status || err.status >= 500) {
        // тост
        alert((err.data as any)?.message ?? 'Network or server error. Please try later.')
        return
      }

      if (err.status === 404) {
        router.push(PATH.sign_up)
      } else if (err.status === 400) {
        router.push(PATH.expired_link)
      } else if (err.status === 429) {
        // тост
        alert('Too many attempts, try again later')
      } else {
        alert('Something went wrong. Please try again.')
      }
    }
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
          <Button className={s.button} variant={'primary'} type="submit">
            Create new password
          </Button>
        </form>
      </div>
    </Card>
  )
}
