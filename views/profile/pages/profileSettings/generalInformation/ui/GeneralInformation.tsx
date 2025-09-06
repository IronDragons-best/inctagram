import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { InputsName, generalSchema } from '../lib/schema'
import { AddAvatarSection } from './components/AddAvatarSection'
import { FooterForm } from './components/FooterForm'
import { GeneralForm } from './components/GeneralForm'
import s from './generalInformation.module.scss'
import { useUpdateProfileMutation } from '@/shared/schemas/api/profileApi'
import { Alert } from '@irondragons/ui-lib-inctagram'

export const GeneralInformation = () => {
  const methods = useForm<InputsName>({
    resolver: zodResolver(generalSchema),
    mode: 'onBlur',
  })

  const [updateProfile] = useUpdateProfileMutation()
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const showAlert = (message: string) => {
    setAlertMessage(message)
    setAlertOpen(true)

    setTimeout(() => {
      setAlertOpen(false)
    }, 5000)
  }

  const onSubmit = async (data: InputsName) => {
    try {
      await updateProfile(data).unwrap()
      showAlert('Профиль обновлен')
    } catch (err) {
      showAlert('Ошибка обновления профиля')
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
        <Alert onClose={() => setAlertOpen(false)} isOpen={alertOpen}>
          {alertMessage}
        </Alert>
      </form>
    </FormProvider>
  )
}
