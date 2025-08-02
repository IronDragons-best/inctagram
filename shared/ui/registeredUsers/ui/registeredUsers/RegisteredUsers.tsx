'use client'

import React, { useState, useEffect } from 'react'
import { Card } from '@irondragons/ui-lib-inctagram'
import { AnimatedCounter } from '@/shared/ui/registeredUsers'
import s from './registeredUsers.module.scss'

export const RegisteredUsers = () => {
  // TODO: в count сейчас заглуша
  const [count, setCount] = useState(9213)

  // TODO: В проде сюда подставляется значение с сервера
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + 1)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={s.wrapper}>
      <Card fullWidth>
        <div className={s.container}>
          <h3 className={s.title}>Registered users:</h3>
          <AnimatedCounter value={count} />
        </div>
      </Card>
    </div>
  )
}
