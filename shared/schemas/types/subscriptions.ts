import { components } from '@/shared/schemas/api/schema'

export type CurrentSubscription = components['schemas']['CurrentSubscriptionViewDto']
export type PaymentsSubscription = components['schemas']['PagedPaymentsViewDto']
export type PaymentsSubscriptionQuery = {
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'ASC' | 'DESC'
}
export type CreateSubscriptionRequest = components['schemas']['CreateSubscriptionInputDto']
export type NewSubscription = components['schemas']['NewSubscriptionViewDto']
export type TariffsSubscription = {
  plans: {
    plan: string
    planType: 'monthly' | '3month' | '6month' | 'yearly'
    price: number
  }[]
  currentPlan: 'personal' | 'business'
}
