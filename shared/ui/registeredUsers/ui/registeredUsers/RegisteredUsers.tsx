'use client'

import React, { useState } from 'react'
import { Card } from '@irondragons/ui-lib-inctagram'
import { AnimatedCounter } from '@/shared/ui/registeredUsers'
import s from './registeredUsers.module.scss'

type Props = {
  initialCount?: number
}

export const RegisteredUsers = ({ initialCount = 0 }: Props) => {
  const [count] = useState(initialCount)

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
