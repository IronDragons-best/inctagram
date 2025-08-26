import { RegisteredUsers } from '@/shared/ui/registeredUsers'
import { UserCardList } from '@/shared/ui/userFeedCard/ui/UserCardList/UserCardList'
import s from './publicPage.module.scss'
import { fetchLatestPostForHome } from '@/shared/services/postsService'
import { fetchRegisteredUsersCount } from '@/shared/services/userService'

export default async function PublicPage() {
  const [usersCount, items] = await Promise.all([
    fetchRegisteredUsersCount(),
    fetchLatestPostForHome(),
  ])

  return (
    <div className={s.container}>
      <RegisteredUsers initialCount={usersCount} />
      <UserCardList items={items} />
    </div>
  )
}
