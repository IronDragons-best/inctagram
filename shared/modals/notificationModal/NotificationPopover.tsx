import { Popover } from 'radix-ui'
import s from './notificationPopover.module.scss'
import { DarkColors } from '@/src/styles/colorsType'

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
  const newNotificationsCount = mockNotifications.filter(el => el.isNotificationNew).length

  setNotificationCount(newNotificationsCount)

  return (
    <Popover.Content className={s.content} sideOffset={10} align="end">
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
        <svg width={'20px'} height={'8px'} viewBox="9 0 16 16" fill={DarkColors['500']}>
          {/* сам треугольник */}
          <polygon points="0,16 20,0 36,16" fill="currentColor" color={DarkColors['500']} />

          {/* линии для отдельных сторон */}
          {<line x1="0" y1="16" x2="20" y2="0" stroke={'2px'} />}
          {<line x1="20" y1="0" x2="48" y2="26" stroke={'2px'} />}
        </svg>
      </div>
    </Popover.Content>
  )
}
