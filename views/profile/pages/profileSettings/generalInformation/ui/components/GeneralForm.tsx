'use client'

import { DatePicker, Input, Selectbox, TextAreaComponent } from '@irondragons/ui-lib-inctagram'
import { useFormContext } from 'react-hook-form'
import { InputsName } from '../../lib/schema'
import s from './components.module.scss'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'

export const GeneralForm = () => {
  const {
    register,
    clearErrors,
    setValue,
    formState: { errors },
  } = useFormContext<InputsName>()

  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
  })

  const dateHandler = (newRange: DateRange | undefined) => {
    setRange(newRange)
    // TODO бек поправит и огромный if заменится строчкой снизу
    // setValue('dateOfBirth', newRange?.to)
    if (newRange?.from) {
      const day = String(newRange.from.getDate()).padStart(2, '0')
      const month = String(newRange.from.getMonth() + 1).padStart(2, '0')
      const year = newRange.from.getFullYear()
      setValue('dateOfBirth', `${day}.${month}.${year}`)
    }
  }

  return (
    <div className={s.rightContent}>
      <div className={s.formName}>
        <Input
          label={'UserName'}
          id={'username'}
          inputType={'text'}
          fullWidth
          errorText={errors.username?.message}
          disabled
        />
        <Input
          required
          label={'First name'}
          id={'firstName'}
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
          id={'lastName'}
          inputType={'text'}
          fullWidth
          errorText={errors.lastName?.message}
          {...register('lastName', {
            onChange: () => clearErrors('lastName'),
          })}
        />
      </div>
      <div className={s.datePicker}>
        <DatePicker
          label="Date of birth"
          value={range}
          onChange={newRange => dateHandler(newRange)}
          fullWidth
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
          placeholder="Type something..."
          variant="surface"
          label="About me"
          id="1"
          fullWidth
          {...register('aboutMe')}
        />
      </div>
    </div>
  )
}
