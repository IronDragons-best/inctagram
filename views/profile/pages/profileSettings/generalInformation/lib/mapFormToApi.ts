import { InputsName } from '@/views/profile/pages/profileSettings/generalInformation/lib/schema'
import { UpdateProfile } from '@/shared/schemas/types/profile'
import { format } from 'date-fns'

export const mapFormToApi = (form: InputsName): UpdateProfile => {
  return {
    firstName: form.firstName,
    lastName: form.lastName,
    dateOfBirth:
      form.dateOfBirth?.from instanceof Date
        ? format(form.dateOfBirth.from, 'dd.MM.yyyy')
        : undefined,
    countryId: form.countryId,
    cityId: form.cityId,
    aboutMe: form.aboutMe,
  }
}
