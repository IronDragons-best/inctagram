'use client'

import { Card, UniversalIcon } from '@irondragons/ui-lib-inctagram'
import { Dialog } from 'radix-ui'
import React from 'react'
import s from './dropdown.module.scss'

type DropdownItem = {
  icon: string
  label: string
  onClick: (e: React.MouseEvent) => void
}

type Props = {
  isModalOpen: boolean
  onClose?: () => void
  items: DropdownItem[]
}

export const Dropdown = ({ isModalOpen, onClose, items }: Props) => {
  return (
    <Dialog.Root onOpenChange={onClose} open={isModalOpen}>
      <Dialog.Overlay className={s.Overlay} />
      <Dialog.Title className={s.MainTitle}>Post actions</Dialog.Title>
      <Dialog.Content className={s.Content}>
        <Card fullWidth size={'sm'}>
          {items.map((item, index) => (
            <div key={index} className={s.FieldCard} onClick={item.onClick}>
              <div className={s.IconField}>
                <UniversalIcon name={item.icon} />
              </div>
              <div className={s.TextField}>{item.label}</div>
            </div>
          ))}
        </Card>
      </Dialog.Content>
    </Dialog.Root>
  )
}
