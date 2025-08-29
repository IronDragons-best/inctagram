import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { InputsName, generalSchema } from '../lib/schema'
import { AddAvatarSection } from './components/AddAvatarSection'
import { FooterForm } from './components/FooterForm'
import { GeneralForm } from './components/GeneralForm'
import s from './generalInformation.module.scss'
import { useUpdateProfileMutation } from '@/shared/schemas/api/profileApi'

export const GeneralInformation = () => {
  const methods = useForm<InputsName>({
    resolver: zodResolver(generalSchema),
    mode: 'onBlur',
  })

  const [updateProfile] = useUpdateProfileMutation()

  const onSubmit = async (data: InputsName) => {
    try {
      await updateProfile(data).unwrap()
      console.log('Профиль обновлен', data)
    } catch (err) {
      console.error('Ошибка обновления профиля', err)
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
