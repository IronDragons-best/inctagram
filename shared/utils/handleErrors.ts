import { Path, UseFormSetError } from 'react-hook-form'

type FormFieldError = { field: string; message: string }

type ServerErrorData =
  | { message: string }
  | { fieldErrors: Record<string, string> }
  | { errorsMessages: Array<{ field: string; message: string }> }
  | Array<{ field: string; message: string }>
  | null

// Нормализует ошибку
export const normalizeError = (err: any): { status: number; data: ServerErrorData } => {
  if (err && (err.status !== undefined || err.data !== undefined)) {
    return { status: err.status ?? 500, data: err.data ?? null }
  }
  if (err?.response?.data) {
    return { status: err.response?.status ?? 500, data: err.response.data ?? null }
  }
  if (err instanceof Error) {
    return { status: 500, data: { message: err.message } }
  }
  return { status: 500, data: { message: 'Unknown error' } }
}

// Извлекаем поле и глобальное сообщение
const extractFromData = (
  data: ServerErrorData
): { fieldErrors?: FormFieldError[]; message?: string } => {
  if (!data) return {}

  if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
    return { fieldErrors: data.map((it: any) => ({ field: it.field, message: it.message })) }
  }

  if (Array.isArray((data as any)?.errorsMessages)) {
    return {
      fieldErrors: (data as any).errorsMessages.map((it: any) => ({
        field: it.field,
        message: it.message,
      })),
    }
  }

  if ((data as any)?.fieldErrors && typeof (data as any).fieldErrors === 'object') {
    return {
      fieldErrors: Object.entries((data as any).fieldErrors).map(([field, message]) => ({
        field,
        message: String(message),
      })),
    }
  }

  if (typeof data === 'string') return { message: data }
  if ((data as any)?.message && typeof (data as any).message === 'string')
    return { message: (data as any).message }

  return {}
}

// Бизнес ошибки — подсветка полей
export const handleFieldErrors = <T>(
  data: ServerErrorData,
  setError: UseFormSetError<T>,
  fallbackFields: string[] = []
) => {
  const { fieldErrors } = extractFromData(data)
  if (!fieldErrors || fieldErrors.length === 0) return false

  let applied = false

  // Нормализуем имя поля от бэка — НО НЕ мапим "username" в "email".
  // Мапим только "login" (или похожие) -> "email" для случая логина.
  const mapField = (f?: string) => {
    if (!f) return f
    const norm = f.trim().toLowerCase()
    // Только эти специальные ключи мапим на email
    if (norm === 'login' || norm === 'userlogin' || norm === 'user_login') return 'email'
    return f
  }

  // Проставляем ошибки по явным полям (если backend их передаёт)
  fieldErrors.forEach(f => {
    const fieldName = mapField(f.field?.toString?.().trim())
    if (fieldName) {
      setError(fieldName as unknown as Path<T>, { type: 'server', message: f.message })
      applied = true
    }
  })

  // Если ни на одно поле не проставилось — используем переданные fallbackFields
  if (!applied && fallbackFields.length > 0) {
    const firstMsg = String(fieldErrors[0]?.message ?? 'Something went wrong')
    fallbackFields.forEach(ff => {
      setError(ff as unknown as Path<T>, { type: 'server', message: firstMsg })
    })
    applied = true
  }

  return applied
}
// Клиентские ошибки — глобально
export const handleGlobalError = <T>(
  data: ServerErrorData,
  setError: UseFormSetError<T>,
  fallbackMessage?: string
) => {
  const { message } = extractFromData(data)
  const msg = message ?? fallbackMessage ?? 'Something went wrong'
  setError('root' as any, { type: 'server', message: msg })
  // TODO: сделать тост
  alert(`Error: ${msg}`)
}

// Универсальный хендлер ошибок
export const handleFormError = <T>(
  rawErr: any,
  setError: UseFormSetError<T>,
  fallbackFields: string[] = [] // <-- пробрасываем сюда фоллбек поля формы
) => {
  const err = normalizeError(rawErr)

  // Глобальные статусы → клиентские ошибки
  if (err.status === 429) {
    handleGlobalError(err.data, setError, 'Too many attempts, try again later')
    return
  }

  if (err.status >= 500) {
    handleGlobalError(err.data, setError, 'Server error, please try again later')
    return
  }

  // Сначала пробуем бизнес ошибки (теперь с опцией fallbackFields)
  const hasFieldErrors = handleFieldErrors(err.data, setError, fallbackFields)

  // Если полей нет — показываем глобальное сообщение
  if (!hasFieldErrors) {
    handleGlobalError(err.data, setError)
  }
}
