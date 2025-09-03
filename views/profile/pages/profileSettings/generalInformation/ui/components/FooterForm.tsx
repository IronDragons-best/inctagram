import { Button } from '@irondragons/ui-lib-inctagram'
import { useFormContext } from 'react-hook-form'
import { InputsName } from '../../lib/schema'
import s from './components.module.scss'

export const FooterForm = () => {
  const {
    formState: { isValid, isSubmitting },
  } = useFormContext<InputsName>()

  return (
    <>
      <div className={s.lineFooter}></div>
      <div className={s.buttonFooter}>
        <Button type="submit" variant="primary" disabled={!isValid || isSubmitting}>
          Save Changes
        </Button>
      </div>
    </>
  )
}
