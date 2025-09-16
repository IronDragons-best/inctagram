'use client'

import { useMeQuery } from '@/features/auth/api/authApi'
import { useLazyGetProfileQuery } from '@/shared/schemas/api/profileApi'
import { Card } from '@irondragons/ui-lib-inctagram'
import { useEffect } from 'react'

const Page = () => {
  const { data: me } = useMeQuery(undefined)
  const [getProfile, { data }] = useLazyGetProfileQuery()

  useEffect(() => {
    if (me) {
      try {
        getProfile(Number(me.id))
        console.log(data)
      } catch {}
    }
  }, [me, data, getProfile])

  // redirect(PATH.home)
  return <Card>Me</Card>
}

export default Page
