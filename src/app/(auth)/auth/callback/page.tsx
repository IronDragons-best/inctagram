'use client'

import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'
import s from '@/src/common/components/mainLayout/mainLayout.module.scss'

const Page = () => {
  return (
    <div className={s.loader}>
      <Ring size="40" stroke="5" bgOpacity="0" speed="2" color="white" />
    </div>
  )
}

export default Page
