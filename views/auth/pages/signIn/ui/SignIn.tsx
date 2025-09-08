'use client'

import { useLazyMeQuery, useSignInMutation } from '@/features/auth/api/authApi'
import { PATH } from '@/shared/constants/path'
import { SignInFormTypes, signInSchema } from '@/views/auth/pages/signIn/lib/schemas/signIn'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, Input, UniversalIcon } from '@irondragons/ui-lib-inctagram'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import s from './signIn.module.scss'
import { handleFormError } from '@/shared/utils/handleErrors'

export const SignIn = () => {
  const {
    register,
    clearErrors,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInFormTypes>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
  })
  const router = useRouter()

  const [signInHandler] = useSignInMutation()
  const [getMe] = useLazyMeQuery()

  const onSubmit = async (data: SignInFormTypes) => {
    try {
      await signInHandler(data).unwrap()
      const currentUser = await getMe(undefined).unwrap()

      if (currentUser?.id) {
        router.push(PATH.user_profile(currentUser.id))
      }
    } catch (err) {
      handleFormError(err, setError, ['password'])
    }
  }

  return (
    <Card>
      <div className={s.formWrapper}>
        <h2 className={s.title}>Sign In</h2>
        <div className={s.oAuth}>
          <Link href={'google.com'}>
            <UniversalIcon name={'google'} dataStatic width={'36px'} height={'36px'} />
          </Link>
          <Link href={'github.com'}>
            <UniversalIcon name={'github'} width={'36px'} height={'36px'} />
          </Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <div className={s.fieldsWrapper}>
            <Input
              label={'Email'}
              id={'email'}
              placeholder={'Epam@epam.com'}
              inputType={'email'}
              errorText={errors.email?.message}
              fullWidth
              {...register('email', {
                onChange: () => clearErrors('email'),
              })}
            />

            <Input
              label={'Password'}
              id={'password'}
              placeholder={'••••••••••••••'}
              inputType={'password'}
              errorText={errors.password?.message}
              fullWidth
              {...register('password', {
                onChange: () => clearErrors('password'),
              })}
            />
          </div>

          <div className={s.forgotLink}>
            <Link href={PATH.forgot_password}>Forgot Password</Link>
          </div>
          <div className={s.buttonWraper}>
            <Button variant="primary" fullWidth>
              Sign In
            </Button>
          </div>
          <div className={s.bottomText}>
            <div className={s.textContent}>
              <p>Don’t have an account?</p>
            </div>
            <div className={s.signUpLink}>
              <Link href={PATH.sign_up}>Sign Up</Link>
            </div>
          </div>
        </form>
      </div>
    </Card>
  )
}
