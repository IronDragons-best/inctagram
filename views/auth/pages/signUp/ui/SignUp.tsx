'use client'

import { useState } from 'react'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, Checkbox, Input, UniversalIcon } from '@irondragons/ui-lib-inctagram'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import s from './signUp.module.scss'

import { useRegistrationMutation } from '@/features/auth/api/authApi'
import { PATH } from '@/shared/constants/path'
import {
  signInValidationSchema,
  SignUpFormTypes,
} from '@/views/auth/pages/signUp/lib/schemas/signUp'
import { TextModal } from '@/shared/modals/textModal'
import { handleFormError } from '@/shared/utils/handleErrors'

const Label = (
  <span className={s.conditions}>
    I agree to the&nbsp;
    <Link href={PATH.terms_of_service} className="small-link">
      Terms of Service
    </Link>
    &nbsp;and&nbsp;
    <Link href={PATH.privacy_policy} className="small-link">
      Privacy Policy
    </Link>
  </span>
)

export const SignUp = () => {
  const [openModal, setOpenModal] = useState(false)
  const [registrationHandler] = useRegistrationMutation()

  const resetFormFields = () => {
    setOpenModal(false)
    reset()
  }

  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    reset,
    watch,
    setError,
    getValues,
    formState: { isDirty, isValid, errors },
  } = useForm<SignUpFormTypes>({
    defaultValues: { agreeToTerms: false },
    resolver: zodResolver(signInValidationSchema),
    mode: 'onBlur',
  })

  // Наблюдает за состоянием поля agreeToTerms, оно нужно, чтобы активировать кнопку отправки формы
  const isAgreeChecked = watch('agreeToTerms')

  // Проверяет валидны ли поля формы и заполнены ли они
  const isSubmitDisabled = !isDirty || !isValid

  const onSubmit: SubmitHandler<SignUpFormTypes> = async data => {
    try {
      // при успехе unwrap() не вернёт ошибку и просто завершится — сервер отдаёт 204
      await registrationHandler(data).unwrap()

      // успех — показываем модалку подтверждения
      setOpenModal(true)
      // НЕ вызываем reset() здесь, чтобы getValues('email') оставался доступным в модалке
    } catch (err) {
      // err — normalized/RTK error, прокидываем в общий хендлер
      // handleFormError выставит field errors (если есть) или глобальный alert.
      handleFormError(err, setError, ['username', 'email'])
    }
  }

  // TODO: Не забыть поменять ссылки на актуальные
  return (
    <Card>
      <div className={s.formWrapper}>
        <h2 className={s.formTitle}>Sign Up</h2>

        <div className={s.oAuthWrapper}>
          {/* пока что вместо ссылок заглушки */}
          <Link href={'google.com'}>
            <UniversalIcon name={'google'} dataStatic width={'36px'} height={'36px'} />
          </Link>
          <Link href={'google.com'}>
            <UniversalIcon name={'github'} width={'36px'} height={'36px'} />
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <div className={s.fieldsWrapper}>
            <Input
              fullWidth
              inputType={'text'}
              label={'Username'}
              id={'username'}
              errorText={errors.username?.message}
              placeholder={'Enter your name'}
              required
              {...register('username', {
                onChange: () => {
                  clearErrors('username')
                },
              })}
            />
            <Input
              fullWidth
              required
              label={'Email'}
              errorText={errors.email?.message}
              placeholder={'example@example.com'}
              id={'email'}
              inputType={'email'}
              {...register('email', {
                onChange: () => {
                  clearErrors('email')
                },
              })}
            />
            <Input
              fullWidth
              required
              errorText={errors.password?.message}
              id={'password'}
              placeholder={'••••••••••••••'}
              label={'Password'}
              inputType={'password'}
              {...register('password', {
                onChange: () => clearErrors('password'),
              })}
            />
            <Input
              fullWidth
              required
              id={'passwordConfirmation'}
              errorText={errors.passwordConfirmation?.message}
              placeholder={'••••••••••••••'}
              label={'Password confirmation'}
              inputType={'password'}
              {...register('passwordConfirmation', {
                onChange: () => clearErrors('passwordConfirmation'),
              })}
            />
          </div>

          <div className={s.actionsWrapper}>
            <Controller
              name="agreeToTerms"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Checkbox
                  idProp={'sign-up-1'}
                  checked={value}
                  onCheckedChange={onChange}
                  label={Label}
                />
              )}
            />

            <Button variant={'primary'} disabled={isSubmitDisabled || !isAgreeChecked} fullWidth>
              Sign Up
            </Button>
          </div>

          <div className={s.switchToSignIn}>
            <p>Do you have an account?</p>

            <Link href={PATH.sign_in}>Sign In</Link>
          </div>
        </form>
      </div>
      <TextModal
        title={'Email sent'}
        description={`We have sent a link to confirm your email to ${getValues('email')}`}
        openModal={resetFormFields}
        isModalOpen={openModal}
      >
        <Button variant={'primary'}>OK</Button>
      </TextModal>
    </Card>
  )
}
