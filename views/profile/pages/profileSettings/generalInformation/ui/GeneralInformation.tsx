import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { InputsName, generalSchema } from '../lib/schema'
import { AddAvatarSection } from './components/AddAvatarSection'
import { FooterForm } from './components/FooterForm'
import { GeneralForm } from './components/GeneralForm'
import s from './generalInformation.module.scss'

export const GeneralInformation = () => {
  const methods = useForm<InputsName>({
    resolver: zodResolver(generalSchema),
    mode: 'onBlur',
  })

  return (
    <FormProvider {...methods}>
      <div className={s.content}>
        <AddAvatarSection />
        <GeneralForm />
      </div>
      <div className={s.footer}>
        <FooterForm />
      </div>
    </FormProvider>
  )
}
