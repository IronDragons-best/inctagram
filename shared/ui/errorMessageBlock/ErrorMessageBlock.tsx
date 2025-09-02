import React from 'react'
import s from './ErrorMessageBlock.module.scss'

type Props = {
  message?: string
}

export const ErrorMessageBlock = ({ message }: Props) => {
  if (!message) return null

  return (
    <div className={s.errorMessageBlock}>
      <b>Error!</b> {message}
    </div>
  )
}
