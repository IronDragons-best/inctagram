export const ACCOUNT_TYPES = {
  PERSONAL: 'Personal',
  BUSINESS: 'Business',
} as const

export type AccountType = 'Personal' | 'Business'

export const ACCOUNT_TYPE_OPTIONS = [
  { id: 'account-personal', radioName: ACCOUNT_TYPES.PERSONAL },
  { id: 'account-business', radioName: ACCOUNT_TYPES.BUSINESS },
]
