import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { generalSchema, InputsName } from '../lib/schema'
import { AddAvatarSection } from './components/AddAvatarSection'
import { FooterForm } from './components/FooterForm'
import { GeneralForm } from './components/GeneralForm'
import { useUpdateProfileMutation } from '@/shared/schemas/api/profileApi'
import { useEffect, useRef } from 'react'
import { useMeQuery } from '@/features/auth/api/authApi'
import { useParams } from 'next/navigation'
import { UpdateProfile } from '@/shared/schemas/types/profile'
import { format } from 'date-fns'
import { showGlobalAlert } from '@/shared/hooks/useGlobalAlert'
import s from './generalInformation.module.scss'

export const GeneralInformation = () => {
  const { data: currentUser } = useMeQuery(undefined)
  const [updateProfile] = useUpdateProfileMutation()
  const { userId } = useParams<{ userId: string }>()

  const methods = useForm<InputsName>({
    resolver: zodResolver(generalSchema),
    mode: 'onBlur',
  })

  const { reset } = methods

  const isFormRestored = useRef(false)

  useEffect(() => {
    if (isFormRestored.current) return

    const shouldRestoreProfileForm = sessionStorage.getItem('shouldRestoreForm') === 'true'
    const savedProfileFormData = sessionStorage.getItem('profileForm')

    if (shouldRestoreProfileForm && savedProfileFormData) {
      const parsed = JSON.parse(savedProfileFormData)

      if (parsed.dateOfBirth?.from && !isNaN(Date.parse(parsed.dateOfBirth.from))) {
        parsed.dateOfBirth.from = new Date(parsed.dateOfBirth.from)
      } else {
        parsed.dateOfBirth.from = undefined
      }

      if (parsed.dateOfBirth?.to && !isNaN(Date.parse(parsed.dateOfBirth.to))) {
        parsed.dateOfBirth.to = new Date(parsed.dateOfBirth.to)
      } else {
        parsed.dateOfBirth.to = undefined
      }

      reset(parsed)
      isFormRestored.current = true
      sessionStorage.removeItem('shouldRestoreForm')
      return
    }

    if (currentUser?.username) {
      reset({ userName: currentUser.username })
      isFormRestored.current = true
    }
  }, [currentUser, reset])

  const onSubmit: SubmitHandler<InputsName> = async data => {
    const body: UpdateProfile = {
      ...data,
      dateOfBirth:
        data.dateOfBirth?.from instanceof Date
          ? format(data.dateOfBirth.from, 'dd.MM.yyyy')
          : undefined,
    }
    try {
      await updateProfile({ userId: Number(userId), body }).unwrap()
      sessionStorage.removeItem('profileForm')
      sessionStorage.removeItem('shouldRestoreForm')
      showGlobalAlert('Your settings are saved!', 'success')
    } catch {
      showGlobalAlert('Server is not available!', 'error')
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={s.content}>
          <AddAvatarSection />
          <GeneralForm />
        </div>
        <div className={s.footer}>
          <FooterForm />
        </div>
      </form>
    </FormProvider>
  )
}
