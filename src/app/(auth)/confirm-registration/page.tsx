'use client'

import s from './congratulations.module.scss'
import { Button, UniversalIcon } from '@irondragons/ui-lib-inctagram'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { useConfirmEmailMutation } from '@/features/auth/api/authApi'
import { useEffect, useState } from 'react'
import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'
import { EmailConfirmationPage } from '@/views/auth/pages/emailConfirmationPage'
import { normalizeError } from '@/shared/utils/handleErrors'
import { mapConfirmEmailErrorToRedirect } from '@/shared/utils/mapConfirmEmailErrorToRedirect'

const Page = () => {
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false)
  const [confirmEmailHandler] = useConfirmEmailMutation()
  const queryParams = useSearchParams()
  const confirmationCode = queryParams.get('code')
  const router = useRouter()

  useEffect(() => {
    if (!confirmationCode) {
      router.push('/')
      return
    }

    let mounted = true

    const run = async () => {
      try {
        // unwrap выбросит, если пришла ошибка
        await confirmEmailHandler(confirmationCode).unwrap()
        if (!mounted) return
        setIsEmailConfirmed(true)
      } catch (rawErr) {
        if (!mounted) return

        const err = normalizeError(rawErr) // { status, data }
        // Извлекаем человекочитаемое сообщение (первое, если массив errorsMessages)
        let message: string | undefined = undefined
        const data = err.data as any
        if (Array.isArray(data) && data.length > 0 && typeof data[0]?.message === 'string') {
          message = data[0].message
        } else if (Array.isArray(data?.errorsMessages) && data.errorsMessages.length > 0) {
          message = data.errorsMessages[0]?.message
        } else if (typeof data?.message === 'string') {
          message = data.message
        }

        const redirectTo = mapConfirmEmailErrorToRedirect(err.status, message)
        if (redirectTo) {
          router.push(redirectTo)
          return
        }

        // Не мапится на редирект: показываем клиентский фидбек
        if (err.status === 429) {
          // тут можно сделать тост, пока как заглушка - alert
          alert('Too many attempts, try again later')
        } else {
          alert(message ?? 'Email confirmation failed')
        }
      }
    }

    run()

    return () => {
      mounted = false
    }
  }, [confirmationCode, confirmEmailHandler, router])

  if (!isEmailConfirmed) {
    return <Ring size="40" stroke="5" bgOpacity="0" speed="2" color="white" />
  }

  return (
    <EmailConfirmationPage title="Congratulations!" description="Your email has been confirmed">
      <>
        <div className={s.wrapper}>
          <Button variant={'primary'} onClick={() => redirect('/sign-in')}>
            Sign In
          </Button>
        </div>
        <div className={s.iconWrapper}>
          <UniversalIcon name={'Congratulations'} dataStatic={true} />
        </div>
      </>
    </EmailConfirmationPage>
  )
}

export default Page
