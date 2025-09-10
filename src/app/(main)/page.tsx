import { PublicPage } from '@/views/publicPage/pages/public-page/ui'

export const revalidate = 60 // ISR. Обновление раз в минуту

export default function Home() {
  return (
    <>
      <PublicPage />
    </>
  )
}
