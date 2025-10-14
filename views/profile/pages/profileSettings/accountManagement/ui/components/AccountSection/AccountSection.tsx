'use client'

import { Radio, RadioOptionsType } from '@irondragons/ui-lib-inctagram'
import s from './accountSection.module.scss'

type Props = {
  title: string
  options: RadioOptionsType[]
  selected: string
  onChange: (value: string) => void
}

export const AccountSection = ({ title, options, selected, onChange }: Props) => {
  return (
    <div className={s.container}>
      <div className={s.subtitle}>{title}</div>
      <div className={s.contentBox}>
        <Radio options={options} value={selected} onValueChange={onChange} />
      </div>
    </div>
  )
}
