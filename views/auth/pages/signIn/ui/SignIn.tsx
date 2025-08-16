'use client'

import { useSignInMutation } from '@/features/auth/api/authApi'
import { PATH } from '@/shared/constants/path'
import { SignInFormTypes, signInSchema } from '@/views/auth/pages/signIn/lib/schemas/signIn'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, Input, UniversalIcon } from '@irondragons/ui-lib-inctagram'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import s from './signIn.module.scss'
import { TokenService } from '@/shared/schemas/api/client'

export const SignIn = () => {
  const {
    register,
    clearErrors,
    handleSubmit,
    setError,
    formState: { isValid, errors },
  } = useForm<SignInFormTypes>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
  })
  const [signInHandler] = useSignInMutation()

  const router = useRouter()

  const onSubmit: SubmitHandler<SignInFormTypes> = async data => {
    try {
      const res = await signInHandler(data).unwrap()

      const errorField = res.error?.errorsMessages[0]?.message

      if (errorField === 'Invalid email or password' || errorField === 'Invalid credentials.') {
        setError('email', { message: 'Invalid email or password' })
        return
      }
      if (res.data?.accessToken) {
        TokenService.setToken(res.data.accessToken)
        router.push(PATH.home)
      } else {
        router.push(PATH.sign_in)
      }
    } catch (error) {
      console.error('Error during sign in:', error)
    }
  }

  return (
    <Card>
      <div className={s.formWrapper}>
        <h2 className={s.title}>Sign In</h2>
        <div className={s.oAuth}>
          <Link href={'google.com'}>
            <UniversalIcon name={'google'} dataStatic={true} width={'36px'} height={'36px'} />
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
              fullWidth={true}
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
              fullWidth={true}
              {...register('password', {
                onChange: () => clearErrors('password'),
              })}
            />
          </div>

          <div className={s.forgotLink}>
            <Link href={PATH.forgot_password}>Forgot Password</Link>
          </div>
          <div className={s.buttonWraper}>
            <Button variant="primary" fullWidth={true} disabled={!isValid}>
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
