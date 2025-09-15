import { Popover } from 'radix-ui'
import s from './notificationPopover.module.scss'
import { useEffect } from 'react'

type Props = {
  setNotificationCount: (args: number) => void
}

type NotificationMockDataType = {
  isNotificationNew: boolean
  notificationHeading: string
  notificationDescription: string
  notificationIncomeTime: string
}

const mockNotifications: NotificationMockDataType[] = [
  {
    notificationHeading: 'Новое уведомление!',
    isNotificationNew: true,
    notificationDescription: 'Новое Следующий платеж у  вас спишется через 1 день',
    notificationIncomeTime: '1 час назад',
  },
  {
    notificationHeading: 'Новое уведомление!',
    isNotificationNew: false,
    notificationDescription: 'Ваша подписка истекает через 7 дней',
    notificationIncomeTime: '1 день назад',
  },
  {
    notificationHeading: 'Новое уведомление!',
    isNotificationNew: true,
    notificationDescription: 'Новое Следующий платеж у  вас спишется через 1 день',
    notificationIncomeTime: '1 день назад',
  },
  {
    notificationHeading: 'Новое уведомление!',
    isNotificationNew: false,
    notificationDescription: 'Ваша подписка истекает через 7 дней',
    notificationIncomeTime: '1 день назад',
  },
  {
    notificationHeading: 'Новое уведомление!',
    isNotificationNew: true,
    notificationDescription: 'Новое Следующий платеж у  вас спишется через 1 день',
    notificationIncomeTime: '1 час назад',
  },
  {
    notificationHeading: 'Новое уведомление!',
    isNotificationNew: false,
    notificationDescription: 'Ваша подписка истекает через 7 дней',
    notificationIncomeTime: '1 день назад',
  },
  {
    notificationHeading: 'Новое уведомление!',
    isNotificationNew: true,
    notificationDescription: 'Новое Следующий платеж у  вас спишется через 1 день',
    notificationIncomeTime: '1 день назад',
  },
  {
    notificationHeading: 'Новое уведомление!',
    isNotificationNew: false,
    notificationDescription: 'Ваша подписка истекает через 7 дней',
    notificationIncomeTime: '1 день назад',
  },
  {
    notificationHeading: 'Новое уведомление!',
    isNotificationNew: true,
    notificationDescription: 'Новое Следующий платеж у  вас спишется через 1 день',
    notificationIncomeTime: '1 час назад',
  },
  {
    notificationHeading: 'Новое уведомление!',
    isNotificationNew: false,
    notificationDescription: 'Ваша подписка истекает через 7 дней',
    notificationIncomeTime: '1 день назад',
  },
  {
    notificationHeading: 'Новое уведомление!',
    isNotificationNew: true,
    notificationDescription: 'Новое Следующий платеж у  вас спишется через 1 день',
    notificationIncomeTime: '1 день назад',
  },
  {
    notificationHeading: 'Новое уведомление!',
    isNotificationNew: false,
    notificationDescription: 'Ваша подписка истекает через 7 дней',
    notificationIncomeTime: '1 день назад',
  },
]

export const NotificationPopover = ({ setNotificationCount }: Props) => {
  useEffect(() => {
    const newNotificationsCount = mockNotifications.filter(el => el.isNotificationNew).length

    setNotificationCount(newNotificationsCount)
  }, [setNotificationCount])

  return (
    <Popover.Content className={s.content} align="end">
      <h2 className={s.notificationTitle}>Уведомления</h2>

      <div className={s.notificationWrapper}>
        {mockNotifications.map((el, i) => (
          <div className={s.notification} key={i}>
            <div className={s.notificationHeading}>
              <h3>{el.notificationHeading}</h3>
              {el.isNotificationNew && <span>Новое</span>}
            </div>
            <p className={s.notificationText}>{el.notificationDescription}</p>
            <p className={s.notificationIncomeTime}>{el.notificationIncomeTime}</p>
          </div>
        ))}
      </div>

      <div className={s.arrow}>
        <svg viewBox="9 0 16 16">
          <polygon points="0,16 20,0 36,16" />

          <line x1="0" y1="16" x2="20" y2="0" />
          <line x1="20" y1="0" x2="48" y2="26" />
        </svg>
      </div>
    </Popover.Content>
  )
}
