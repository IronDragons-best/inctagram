import { redirect } from 'next/navigation'
import { PATH } from '@/shared/constants/path'

const Profile = async () => {
  redirect(PATH.home)
}

export default Profile
