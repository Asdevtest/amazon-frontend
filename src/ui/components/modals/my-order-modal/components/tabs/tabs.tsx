import { FC, memo } from 'react'

import { CustomSwitcher } from '@components/shared/custom-switcher'
import { TabPanel } from '@components/shared/tab-panel'
import { ListSuppliers } from '@components/shared/tables/list-suppliers'

import { IDestination, IDestinationStorekeeper } from '@typings/shared/destinations'
import { IPlatformSettings } from '@typings/shared/patform-settings'

import { useStyles } from './tabs.style'

import { IOrderWithAdditionalFields, SetFormFieldsType } from '../../my-order-modal.type'

import { BasicInfo, BoxesToOrder } from './components'
import { customSwitcherSettings } from './tabs.config'
import { MyOrderModalSwitcherConditions } from './tabs.type'

interface TabsProps {
  isOrderEditable: boolean
  formFields: IOrderWithAdditionalFields
  destinations: IDestination[]
  storekeepers: IDestinationStorekeeper[]
  platformSettings: IPlatformSettings
  switcherCondition: MyOrderModalSwitcherConditions
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

      <TabPanel value={switcherCondition} index={MyOrderModalSwitcherConditions.BASIC_INFORMATION}>
        <BasicInfo
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

      <TabPanel value={switcherCondition} index={MyOrderModalSwitcherConditions.LIST_O_FSUPPLIERS}>
        <ListSuppliers formFields={formFields} storekeepers={storekeepers} platformSettings={platformSettings} />
      </TabPanel>

      <TabPanel value={switcherCondition} index={MyOrderModalSwitcherConditions.BOXES_TO_ORDER}>
        <BoxesToOrder formFields={formFields} platformSettings={platformSettings} />
      </TabPanel>
    </div>
  )
})
