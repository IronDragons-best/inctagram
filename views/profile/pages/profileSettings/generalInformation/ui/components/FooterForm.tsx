import { Button } from '@irondragons/ui-lib-inctagram'
import { useFormContext } from 'react-hook-form'
import { InputsName } from '../../lib/schema'
import s from './components.module.scss'

export const FooterForm = ({ onSubmit }: Props) => {
  const {
    formState: { isValid, isSubmitting },
  } = useFormContext<InputsName>()

  return (
    <>
      <div className={s.lineFooter}></div>
      <div className={s.buttonFooter}>
        <Button variant="primary" disabled={!isValid || isSubmitting} onClick={onSubmit}>
          Save Changes
        </Button>
      </div>
    </>
  )
}

type Props = {
  onSubmit: () => void
}
