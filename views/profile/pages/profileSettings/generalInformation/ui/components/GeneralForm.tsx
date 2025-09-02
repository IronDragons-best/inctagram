'use client'

import React from 'react'
import { DatePicker, Input, Selectbox, TextAreaComponent } from '@irondragons/ui-lib-inctagram'
import { Controller, useFormContext } from 'react-hook-form'
import { InputsName } from '../../lib/schema'
import Link from 'next/link'
import { PATH } from '@/shared/constants/path'
import { useRouter } from 'next/navigation'
import s from './components.module.scss'

export const GeneralForm = () => {
  const {
    register,
    clearErrors,
    control,
    formState: { errors },
  } = useFormContext<InputsName>()
  const router = useRouter()

  const { getValues } = useFormContext<InputsName>()

  const handlePrivacyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    const currentValues = getValues()

    sessionStorage.setItem('profileForm', JSON.stringify(currentValues))
    sessionStorage.setItem('shouldRestoreForm', 'true')

    router.push(PATH.privacy_policy)
  }

  return (
    <div className={s.rightContent}>
      <div className={s.formName}>
        <Input
          required
          label={'Username'}
          id={'username'}
          inputType={'text'}
          fullWidth
          errorText={errors.userName?.message}
          {...register('userName', {
            onChange: () => clearErrors('userName'),
          })}
        />
        <Input
          required
          label={'First name'}
          id={'firstname'}
          inputType={'text'}
          fullWidth
          errorText={errors.firstName?.message}
          {...register('firstName', {
            onChange: () => clearErrors('firstName'),
          })}
        />
        <Input
          required
          label={'Last name'}
          id={'lastname'}
          inputType={'text'}
          fullWidth
          errorText={errors.lastName?.message}
          {...register('lastName', {
            onChange: () => clearErrors('lastName'),
          })}
        />
      </div>
      <div className={s.datePicker}>
        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              label={'Date of birth'}
              value={value}
              onChange={onChange}
              hasError={!!errors.dateOfBirth?.from}
              errorText={
                errors.dateOfBirth?.from?.message && (
                  <>
                    {errors.dateOfBirth?.from?.message}{' '}
                    <Link href={PATH.privacy_policy} onClick={handlePrivacyClick}>
                      <u>Privacy Policy</u>
                    </Link>
                  </>
                )
              }
              fullWidth
            />
          )}
        />
      </div>
      <div className={s.selectLive}>
        <div className={s.selectContainer}>
          <Selectbox
            idProp="select-country"
            label="Select your country"
            options={[
              { label: 'Украина', value: '1' },
              { label: 'Польша', value: 'pl' },
              { label: 'Германия', value: 'de' },
              { label: 'Франция', value: 'fr' },
              { label: 'Италия', value: 'it' },
              { label: 'Испания', value: 'es' },
              { label: 'Нидерланды', value: 'nl' },
              { label: 'Бельгия', value: 'be' },
            ]}
            placeholder="Country"
            fullWidth
            {...register('countryId')}
          />
        </div>
        <div className={s.selectContainer}>
          <Selectbox
            idProp="select-city"
            label="Select your city"
            options={[
              { label: 'Харьков', value: 'ua' },
              { label: 'Киев', value: 'pl' },
              { label: 'Минск', value: 'de' },
              { label: 'Москва', value: 'fr' },
              { label: 'Кельн', value: 'es' },
              { label: 'Штутгарт', value: 'nl' },
              { label: 'Берлин', value: 'be' },
            ]}
            placeholder="City"
            fullWidth
            {...register('cityId')}
          />
        </div>
      </div>
      <div className={s.ariaText}>
        <TextAreaComponent
          {...register('aboutMe')}
          placeholder="Type something..."
          variant="surface"
          label="About me"
          id="1"
          fullWidth
          error={!!errors.aboutMe}
          errorText={errors.aboutMe?.message}
        />
      </div>
    </div>
  )
}
