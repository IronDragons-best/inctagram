'use client'

import s from './animatedCounte.module.scss'
import { Fragment } from 'react'

type Props = {
  value: number | string
  digitCount?: number
}

export const AnimatedCounter = ({ value, digitCount = 6 }: Props) => {
  const padded = value.toString().padStart(digitCount, '0').split('')

  const digitHeight = 20

  return (
    <div className={s.counter}>
      {padded.map((digit, index) => (
        <Fragment key={index}>
          <div key={index} className={s.digitContainer}>
            <div
              className={s.digitStrip}
              style={{
                transform: `translateY(-${Number(digit) * digitHeight}px)`,
              }}
            >
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className={s.digit}>
                  {i}
                </div>
              ))}
            </div>
          </div>
          {index !== padded.length - 1 && <div className={s.separator} />}
        </Fragment>
      ))}
    </div>
  )
}
