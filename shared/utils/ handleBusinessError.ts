// import { Path, UseFormSetError } from 'react-hook-form'
//
// export const handleBusinessError = <T>(
//   fieldErrors: { field: Path<T>; message: string }[],
//   setError: UseFormSetError<T>
// ) => {
//   fieldErrors.forEach(err => {
//     setError(err.field, { type: 'server', message: err.message })
//   })
// }

// Текущий вариант
import { UseFormSetError } from 'react-hook-form'

export function handleBusinessError(
  error: { status: number; data: { message: string; field?: string }[] },
  setError: UseFormSetError<any>
) {
  if (Array.isArray(error.data)) {
    error.data.forEach(err => {
      if (err.field) {
        setError(err.field, { type: 'server', message: err.message })
      } else {
        // TODO: тут тостер
        alert(err.message)
      }
    })
  }
}
