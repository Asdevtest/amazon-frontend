import { FC, memo } from 'react'

import { CustomSwitcher } from '@components/shared/custom-switcher'
import { TabPanel } from '@components/shared/tab-panel'

import { IDestination, IDestinationStorekeeper } from '@typings/destination'
import { IPlatformSettings } from '@typings/patform-settings'

import { useStyles } from './tabs.style'

import { IOrderWithAdditionalFields, SetFormFieldsType } from '../../my-order-modal.type'

import { BasicInfoTab, BoxesToOrderTab, ListSuppliersTab } from './components'
import { customSwitcherSettings } from './tabs.config'
import { SwitcherConditions } from './tabs.type'

interface TabsProps {
  isOrderEditable: boolean
  formFields: IOrderWithAdditionalFields
  destinations: IDestination[]
  storekeepers: IDestinationStorekeeper[]
  platformSettings: IPlatformSettings
  switcherCondition: SwitcherConditions
  destinationsFavourites: string[]
  setDestinationsFavouritesItem: () => void
  setFormFields: SetFormFieldsType
  onClickChangeCondition: () => void
  isClient?: boolean
  isPendingOrdering?: boolean
}

export const Tabs: FC<TabsProps> = memo(props => {
  const {
    isOrderEditable,
    isClient,
    isPendingOrdering,
    formFields,
    destinations,
    storekeepers,
    platformSettings,
    switcherCondition,
    destinationsFavourites,
    setDestinationsFavouritesItem,
    setFormFields,
    onClickChangeCondition,
  } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.tabs}>
      <CustomSwitcher
        fullWidth
        switchMode="medium"
        condition={switcherCondition}
        switcherSettings={customSwitcherSettings}
        changeConditionHandler={onClickChangeCondition}
      />

      <TabPanel value={switcherCondition} index={SwitcherConditions.BASIC_INFORMATION}>
        <BasicInfoTab
          isOrderEditable={isOrderEditable}
          isClient={isClient}
          isPendingOrdering={isPendingOrdering}
          formFields={formFields}
          destinations={destinations}
          storekeepers={storekeepers}
          destinationsFavourites={destinationsFavourites}
          setDestinationsFavouritesItem={setDestinationsFavouritesItem}
          setFormFields={setFormFields}
        />
      </TabPanel>

      <TabPanel value={switcherCondition} index={SwitcherConditions.LIST_O_FSUPPLIERS}>
        <ListSuppliersTab formFields={formFields} storekeepers={storekeepers} platformSettings={platformSettings} />
      </TabPanel>

      <TabPanel value={switcherCondition} index={SwitcherConditions.BOXES_TO_ORDER}>
        <BoxesToOrderTab formFields={formFields} platformSettings={platformSettings} />
      </TabPanel>
    </div>
  )
})
