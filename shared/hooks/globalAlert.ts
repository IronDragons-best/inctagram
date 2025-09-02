import { useState } from 'react'

let externalShowAlert: (msg: string, type: 'success' | 'error') => void = () => {}

export const useGlobalAlert = () => {
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false)
  const [variant, setVariant] = useState<'success' | 'error'>('success')

  externalShowAlert = (msg, type) => {
    setMessage(msg)
    setVariant(type)
    setOpen(true)
  }

  return { open, message, variant, setOpen }
}

export const showGlobalAlert = () => externalShowAlert
