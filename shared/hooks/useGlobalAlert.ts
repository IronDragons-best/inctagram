import { useMemo, useState } from 'react'

let externalShowAlert: (msg: string, type: 'success' | 'error') => void = () => {}

export const useGlobalAlert = () => {
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false)
  const [variant, setVariant] = useState<'success' | 'error'>('success')

  externalShowAlert = useMemo(
    () => (msg: string, type: 'success' | 'error') => {
      setMessage(msg)
      setVariant(type)
      setOpen(true)
    },
    []
  )

  return { open, message, variant, setOpen }
}

export const showGlobalAlert = (msg: string, type: 'success' | 'error') => {
  externalShowAlert(msg, type)
}
