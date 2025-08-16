'use client'

import { CreateNewPasswordForm } from '@/views/auth/pages/create-new-password/ui/CreateNewPasswordForm'
import { redirect, useSearchParams } from 'next/navigation'
import { PATH } from '@/shared/constants/path'

const Page = () => {
  const queryParams = useSearchParams()
  const refreshCode = queryParams.get('code')

  if (!refreshCode) {
    redirect(PATH.sign_in)
  }

  return <CreateNewPasswordForm refreshCode={refreshCode} />
}

export default Page
