'use client'

import { AccountSection } from '@/views/profile/pages/profileSettings/accountManagement/ui/components/AccountSection/AccountSection'
import React, { useEffect, useMemo, useState } from 'react'
import { ACCOUNT_TYPE_OPTIONS, ACCOUNT_TYPES, AccountType } from '@/shared/constants/accountTypes'
import {
  useCreateSubscriptionMutation,
  useGetSubscriptionsTariffsQuery,
  useLazyGetSubscriptionsCurrentQuery,
} from '@/shared/schemas/api/subscriptionsApi'
import { Button, Checkbox, UniversalIcon } from '@irondragons/ui-lib-inctagram'
import { TextModal } from '@/shared/modals/textModal'
import { io } from 'socket.io-client'
import { CurrentSubscription } from '@/views/profile/pages/profileSettings/accountManagement/ui/components'
import s from './accountManagement.module.scss'

export const AccountManagement = () => {
  const [accountValue, setAccountValue] = useState<AccountType>(ACCOUNT_TYPES.PERSONAL)
  const [selectedSubscription, setSelectedSubscription] = useState('')
  const [check, setCheck] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)

  const { data: tariffs } = useGetSubscriptionsTariffsQuery()
  const [createSubscription] = useCreateSubscriptionMutation()

  const [fetchCurrent] = useLazyGetSubscriptionsCurrentQuery()

  useEffect(() => {
    fetchCurrent()
  }, [fetchCurrent])

  useEffect(() => {
    const socket = io('https://nodewebdev.online/notifications', {
      withCredentials: true,
    })

    socket.on('notification', async data => {
      if (data.type === 'payment_success') {
        await fetchCurrent()
        setIsSuccessModalOpen(true)
      }
    })

    return () => {
      socket.disconnect()
    }
  }, [fetchCurrent])

  const subscriptionPlans = useMemo(() => {
    if (!tariffs?.plans) return []

    return tariffs.plans.map((plan, idx) => ({
      id: `${plan.planType}-${idx}`,
      radioName: `$${plan.price} per ${plan.planType.toLowerCase()}`,
      planType: plan.planType,
    }))
  }, [tariffs])

  useEffect(() => {
    if (subscriptionPlans.length > 0 && !selectedSubscription) {
      const firstPlan = subscriptionPlans[0]
      if (firstPlan) {
        setSelectedSubscription(firstPlan.radioName)
      }
    }
  }, [subscriptionPlans, selectedSubscription])

  const setChecked = () => setCheck(!check)
  const openModal = () => setIsOpenModal(true)
  const closeModal = () => {
    setIsOpenModal(false)
    setCheck(false)
  }

  const handleAccountChange = (value: string) => {
    if (value === ACCOUNT_TYPES.PERSONAL || value === ACCOUNT_TYPES.BUSINESS) {
      setAccountValue(value as AccountType)
    }
  }

  const handleSubscriptionChange = (value: string) => {
    setSelectedSubscription(value)
  }

  const selectedPlan = subscriptionPlans.find(plan => plan.radioName === selectedSubscription)

  const handlePayment = async () => {
    try {
      if (!selectedPlan) return

      const res = await createSubscription({
        planType: selectedPlan.planType,
        paymentMethod: 'stripe',
      }).unwrap()

      if (res.paymentUrl) {
        window.open(res.paymentUrl, '_blank')

        closeModal()

        setCheck(false)
      }
    } catch {
      setIsErrorModalOpen(true)
    }
  }

  const handleSuccessModalClose = () => setIsSuccessModalOpen(false)
  const handleErrorModalClose = () => setIsErrorModalOpen(false)

  return (
    <>
      <CurrentSubscription />
      <TextModal
        title="Success"
        description="Payment was successful!"
        isModalOpen={isSuccessModalOpen}
        openModal={handleSuccessModalClose}
      >
        <div className={s.suggestion}>
          <Button className={s.modalButton} onClick={handleSuccessModalClose} fullWidth>
            OK
          </Button>
        </div>
      </TextModal>

      <TextModal
        title="Error"
        description="Transaction failed. Please, write to support"
        isModalOpen={isErrorModalOpen}
        openModal={handleErrorModalClose}
      >
        <Button onClick={handleErrorModalClose} fullWidth>
          Back to payment
        </Button>
      </TextModal>

      <AccountSection
        title="Account type:"
        options={ACCOUNT_TYPE_OPTIONS}
        selected={accountValue}
        onChange={handleAccountChange}
      />
      {accountValue === ACCOUNT_TYPES.BUSINESS && (
        <>
          <AccountSection
            title="Your subscription costs:"
            options={subscriptionPlans}
            selected={selectedSubscription}
            onChange={handleSubscriptionChange}
          />
          <div className={s.iconWrapper}>
            <Button variant="text_button" onClick={openModal}>
              <UniversalIcon name={'stripe-black'} dataStatic width="96px" height="64px" />
            </Button>
          </div>
          <TextModal
            title="Create payment"
            description="Auto-renewal will be enabled with this payment. You can disable it anytime in your profile settings"
            openModal={closeModal}
            isModalOpen={isOpenModal}
            closeOnChildrenClick={false}
          >
            <div className={s.suggestion}>
              <Checkbox
                idProp="Agree"
                checked={check}
                onCheckedChange={setChecked}
                label="I agree"
              />
              <Button className={s.modalButton} onClick={handlePayment} disabled={!check}>
                OK
              </Button>
            </div>
          </TextModal>
        </>
      )}
    </>
  )
}
