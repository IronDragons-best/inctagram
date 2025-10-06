import { Checkbox } from '@irondragons/ui-lib-inctagram'
import { useGetSubscriptionsCurrentQuery } from '@/shared/schemas/api/subscriptionsApi'
import { useEffect, useState } from 'react'
import s from './currentSubscription.module.scss'

export const CurrentSubscription = () => {
  const { data: currentSubscription } = useGetSubscriptionsCurrentQuery()
  const [checked, setChecked] = useState(currentSubscription?.isAutoRenewal || false)

  useEffect(() => {
    const isAutoRenewal = currentSubscription?.isAutoRenewal
    if (isAutoRenewal === true || isAutoRenewal === false) {
      setChecked(isAutoRenewal)
    }
  }, [currentSubscription?.isAutoRenewal])

  if (!currentSubscription || currentSubscription.subscriptionPlan === 'personal') {
    return null
  }

  const subscriptionData = [
    {
      key: 'expire-at',
      label: 'Expire at',
      value: currentSubscription.expireAt
        ? new Date(currentSubscription.expireAt).toLocaleDateString()
        : 'Not set',
    },
    {
      key: 'next-payment',
      label: 'Next payment',
      value: currentSubscription.nextPayment
        ? new Date(currentSubscription.nextPayment).toLocaleDateString()
        : 'Not set',
    },
  ]

  return (
    <div className={s.container}>
      <div className={s.subtitle}>Current Subscription:</div>
      <div className={s.contentBox}>
        {subscriptionData.map(({ key, label, value }) => (
          <div key={key}>
            <div className={s.label}>{label}</div>
            <div className={s.date}>{value}</div>
          </div>
        ))}
      </div>
      <Checkbox
        className={s.autoRenewal}
        idProp="autoRenewal"
        label="Auto-Renewal"
        checked={checked}
        onCheckedChange={() => setChecked(!checked)}
      />
    </div>
  )
}
