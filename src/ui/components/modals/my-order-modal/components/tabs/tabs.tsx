import { FC, memo } from 'react'

import { CustomSwitcher } from '@components/shared/custom-switcher'
import { TabPanel } from '@components/shared/tab-panel'

import { IDestination, IDestinationStorekeeper } from '@typings/destination'
import { IPlatformSettings } from '@typings/patform-settings'

import { useStyles } from './tabs.style'

import { BasicInfoTab, ListSuppliersTab } from './components'
import { customSwitcherSettings } from './tabs.config'
import { SwitcherConditions } from './tabs.type'

interface TabsProps {
  order: any
  destinations: IDestination[]
  storekeepers: IDestinationStorekeeper[]
  platformSettings: IPlatformSettings
  switcherCondition: SwitcherConditions
  onClickChangeCondition: () => void
}

export const Tabs: FC<TabsProps> = memo(props => {
  const { order, destinations, storekeepers, platformSettings, switcherCondition, onClickChangeCondition } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.tabs}>
      <CustomSwitcher
        fullWidth
        switchMode="big"
        condition={switcherCondition}
        switcherSettings={customSwitcherSettings}
        changeConditionHandler={onClickChangeCondition}
      />

      <TabPanel value={switcherCondition} index={SwitcherConditions.BASIC_INFORMATION}>
        <BasicInfoTab order={order} destinations={destinations} storekeepers={storekeepers} />
      </TabPanel>

      <TabPanel value={switcherCondition} index={SwitcherConditions.LIST_O_FSUPPLIERS}>
        <ListSuppliersTab order={order} platformSettings={platformSettings} />
      </TabPanel>

      <TabPanel value={switcherCondition} index={SwitcherConditions.BOXES_TO_ORDER}>
        BOXES_TO_ORDER
      </TabPanel>
    </div>
  )
})
