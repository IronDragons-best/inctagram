import { redirect } from 'next/navigation'
import { PATH } from '@/shared/constants/path'
import { CreateNewPasswordForm } from '@/views/auth/pages/create-new-password/ui/CreateNewPasswordForm'

type SearchProps = {
  searchParams: Promise<{ code: string }>
}

export default async function Page({ searchParams }: SearchProps) {
  const { code } = await searchParams

  if (!code) {
    redirect(PATH.sign_in)
  }

  return <CreateNewPasswordForm refreshCode={code} />
}
