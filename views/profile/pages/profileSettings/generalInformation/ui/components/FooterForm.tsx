import { Button } from '@irondragons/ui-lib-inctagram'
import { useFormContext } from 'react-hook-form'
import { InputsName } from '../../lib/schema'
import s from './components.module.scss'

export const FooterForm = () => {
  const {
    formState: { isValid },
  } = useFormContext<InputsName>()
  return (
    <>
      <div className={s.lineFooter}></div>
      <div className={s.buttonFooter}>
        <Button variant="primary" children={'Save Changes'} disabled={!isValid}></Button>
      </div>
    </>
  )
}
