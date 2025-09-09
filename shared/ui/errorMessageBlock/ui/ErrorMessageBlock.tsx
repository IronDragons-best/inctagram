import React from 'react'
import s from './errorMessageBlock.module.scss'

type Props = {
  message?: string
}

export const ErrorMessageBlock = ({ message }: Props) => {
  if (!message) return null

  return (
    <div className={s.errorMessageBlock}>
      <div className={s.content}>
        <b>Error!</b> {message}
      </div>
    </div>
  )
}
