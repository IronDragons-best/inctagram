'use client'

import { JSX, useState } from 'react'
import { TabsComponent } from '@irondragons/ui-lib-inctagram'
import { GeneralInformation } from '../generalInformation/ui/GeneralInformation'
import { AccountManagement } from '@/views/profile/pages/profileSettings/accountManagement'

type Tab = {
  id: string
  label: string
  component?: JSX.Element
}

export const TabsSettings = () => {
  const tabs: Tab[] = [
    {
      id: '1',
      label: 'General information',
      component: <GeneralInformation />,
    },
    { id: '2', label: 'Devices' },
    {
      id: '3',
      label: 'Account Management',
      component: <AccountManagement />,
    },
    { id: '4', label: 'My payments' },
  ]

  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id as string)
  return (
    <TabsComponent onValueChange={setActiveTab} value={activeTab} fullWidth tabs={tabs}>
      {tabs.map(({ id, component }) => {
        return activeTab === id ? (
          <div key={id} style={{ color: 'white' }}>
            {component}
          </div>
        ) : null
      })}
    </TabsComponent>
  )
}
