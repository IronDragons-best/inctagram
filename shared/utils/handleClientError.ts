// import { UseFormSetError } from 'react-hook-form'
//
// export const handleClientError = <T>(message: string, setError: UseFormSetError<T>) => {
//   setError('root', { type: 'server', message })
//   console.log('error: ', message)
// }

// Текущий вариант
export function handleClientError(error: {
  status: number
  data: { message: string; details?: string }
}) {
  // if (error.status >= 500 || error.status === 0) {
  //   // TODO: тут тостер
  //   alert('Сервер недоступен. Попробуйте позже.')
  // } else {
  //   alert(error.data?.message ?? 'Что-то пошло не так')
  // }

  // Вот такой рабочий вариант получился
  if (error?.status >= 500 || error.status === 0) {
    // TODO: сюда тостер
    // setError('root', { message: 'Server error, please try again later' })
    alert(`Error: ${error.data.details}\nerror message: ${error.data.message}`)
    console.log(error)
  }

  if (error?.status === 429) {
    // TODO: сюда тостер
    // setError('root', { message: 'Too many attempts, try again later' })
    console.log(error)
  }
}
