import { showGlobalAlert } from '@/shared/hooks/globalAlert'

export const notifySuccess = (msg: string) => {
  showGlobalAlert()(msg, 'success')
}

export const notifyError = (msg: string) => {
  showGlobalAlert()(msg, 'error')
}
