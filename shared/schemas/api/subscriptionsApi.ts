import { baseApi, TAGS } from '@/src/app/provider/baseApi'
import { normalizeError } from '@/shared/utils/handleErrors'
import { getClient } from '@/shared/schemas/api/client'
import {
  CreateSubscriptionRequest,
  CurrentSubscription,
  NewSubscription,
  PaymentsSubscription,
  TariffsSubscription,
} from '@/shared/schemas/types/subscriptions'

const client = getClient()

export const subscriptionsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getSubscriptionsCurrent: build.query<CurrentSubscription, void>({
      queryFn: async () => {
        try {
          const res = await client.GET('/subscriptions/current')

          if (res.response?.status === 200 && res.data) {
            return { data: res.data }
          }

          return { error: normalizeError(res) }
        } catch (e: unknown) {
          return { error: normalizeError(e) }
        }
      },
      providesTags: result =>
        result?.subscriptionId
          ? [{ type: TAGS.SUBSCRIPTION, id: result.subscriptionId }]
          : [TAGS.SUBSCRIPTION],
    }),
    getSubscriptionsPayments: build.query<
      PaymentsSubscription,
      { pageNumber?: number; pageSize?: number; sortBy?: string; sortDirection?: 'ASC' | 'DESC' }
    >({
      queryFn: async arg => {
        try {
          const res = await client.GET('/subscriptions/payments', { params: { query: arg } })

          if (res.response?.status === 200 && res.data) {
            return { data: res.data }
          }
          return { error: normalizeError(res) }
        } catch (e: unknown) {
          return { error: normalizeError(e) }
        }
      },
      providesTags: () => [TAGS.SUBSCRIPTION],
    }),
    getSubscriptionsTariffs: build.query<TariffsSubscription, void>({
      queryFn: async () => {
        try {
          const res = await client.GET('/subscriptions/tariffs')
          if (res.response?.status === 200 && res.data) {
            return { data: res.data as unknown as TariffsSubscription }
          }
          return { error: normalizeError(res) }
        } catch (e: unknown) {
          return { error: normalizeError(e) }
        }
      },
      providesTags: () => [TAGS.SUBSCRIPTION],
    }),
    createSubscription: build.mutation<NewSubscription, CreateSubscriptionRequest>({
      queryFn: async body => {
        try {
          const res = await client.POST('/subscriptions', { body })

          if (res.response?.status === 201 && res.data) {
            return { data: res.data }
          }
          return { error: normalizeError(res) }
        } catch (e: unknown) {
          return { error: normalizeError(e) }
        }
      },
      invalidatesTags: [TAGS.SUBSCRIPTION],
    }),
    removeSubscription: build.mutation<null, string>({
      queryFn: async subscriptionId => {
        try {
          const res = await client.DELETE(`/subscriptions/auto-renewal/{subscriptionId}`, {
            params: {
              path: { subscriptionId },
            },
          })

          if (res.response?.status === 204) {
            return { data: null }
          }

          return { error: normalizeError(res) }
        } catch (e: unknown) {
          return { error: normalizeError(e) }
        }
      },
      invalidatesTags: (_result, _error, subscriptionId) => [
        { type: TAGS.SUBSCRIPTION, id: subscriptionId },
      ],
    }),
  }),
})

export const {
  useGetSubscriptionsCurrentQuery,
  useLazyGetSubscriptionsCurrentQuery,
  useGetSubscriptionsPaymentsQuery,
  useGetSubscriptionsTariffsQuery,
  useCreateSubscriptionMutation,
  useRemoveSubscriptionMutation,
} = subscriptionsApi
