import { useGlobalAlert } from '@/shared/hooks/globalAlert'
import { Alert } from '@irondragons/ui-lib-inctagram'

export const GlobalAlert = () => {
  const { open, message, variant, setOpen } = useGlobalAlert()

  return (
    <Alert isOpen={open} variant={variant} onClose={() => setOpen(false)}>
      {message}
    </Alert>
  )
}
