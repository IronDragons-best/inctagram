import { format } from 'date-fns'
import s from './datePicker.module.scss'
import { Calendar } from './Calendar'
import { Popover } from 'radix-ui'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'

type Props = {
  /** Initial value */
  value: DateRange | undefined
  /** Label displayed above the select input */
  label: string
  /** Callback called when a date is selected */
  onChange?: (range: DateRange | undefined) => void
  /** Disables the select input */
  disabled?: boolean
  /** Shows the error status */
  hasError?: boolean
  /** Shows the error status Error message under the component if `hasError` = true */
  errorText?: string
  /** If true, the input to the full width of its container */
  fullWidth?: boolean
}

export const DatePicker = ({
  value,
  label,
  onChange,
  hasError,
  errorText,
  disabled = false,
  fullWidth = false,
}: Props) => {
  const inputId = 'datepicker-trigger'
  const [open, setOpen] = useState(false)

  const getDisplayValue = (range?: DateRange) => {
    if (!range?.from) return format(new Date(), 'dd/MM/yyyy')
    if (!range.to || range.from.getTime() === range.to.getTime()) {
      return format(range.from, 'dd/MM/yyyy')
    }
    return `${format(range.from, 'dd/MM/yyyy')} - ${format(range.to, 'dd/MM/yyyy')}`
  }

  const triggerClass = [
    s.datePicker__trigger,
    fullWidth && s.fullWidth,
    disabled && s.disabled,
    hasError && s['datePicker__trigger--error'],
    open && s['datePicker__trigger--open'],
    disabled && s['datePicker__trigger--disabled'],
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={s.datePicker} data-HUI="HUI">
      <label htmlFor={inputId} className={s.datePicker__label}>
        {label}
      </label>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger
          onClick={() => setOpen(!open)}
          id={inputId}
          className={triggerClass}
          disabled={disabled}
          aria-label={label}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError && errorText ? `${inputId}-error` : undefined}
        >
          <span className={s.datePicker__dateValue}>{getDisplayValue(value)}</span>
        </Popover.Trigger>

        <Popover.Content
          className={s.datePicker__popover}
          sideOffset={1}
          align="start"
          side="bottom"
        >
          <Calendar value={value} onChange={onChange} />
        </Popover.Content>
      </Popover.Root>

      {hasError && errorText && (
        <span id={`${inputId}-error`} className={s.datePicker__errorText} role="alert">
          {errorText}
        </span>
      )}
    </div>
  )
}
