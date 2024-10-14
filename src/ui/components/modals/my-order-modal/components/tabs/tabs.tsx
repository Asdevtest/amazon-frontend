import { FC, memo } from 'react'

import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { TabPanel } from '@components/shared/tab-panel'
import { BoxesToOrder } from '@components/shared/tables/boxes-to-order'
import { ListSuppliers } from '@components/shared/tables/list-suppliers'

import { IDestination, IDestinationStorekeeper } from '@typings/shared/destinations'
import { IPlatformSettings } from '@typings/shared/patform-settings'

import { useStyles } from './tabs.style'

import { IOrderWithAdditionalFields, SetFormFieldsType } from '../../my-order-modal.type'

import { BasicInfo } from './basic-info'
import { generateSwitcherSettings } from './tabs.config'
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
  onClickChangeCondition: (value: string) => void
  isClient?: boolean
  isPendingOrdering?: boolean
  isNotMultiple?: boolean
  isMultiple?: boolean
  amountInBox?: number
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
    isNotMultiple,
    isMultiple,
    amountInBox,
    setDestinationsFavouritesItem,
    setFormFields,
    onClickChangeCondition,
  } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.tabs}>
      <CustomRadioButton
        size="large"
        options={generateSwitcherSettings()}
        value={switcherCondition}
        onChange={e => onClickChangeCondition(e.target.value)}
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
          isNotMultiple={isNotMultiple}
          isMultiple={isMultiple}
          amountInBox={amountInBox}
          setDestinationsFavouritesItem={setDestinationsFavouritesItem}
          setFormFields={setFormFields}
        />
      </TabPanel>

      <TabPanel value={switcherCondition} index={MyOrderModalSwitcherConditions.LIST_O_FSUPPLIERS}>
        <ListSuppliers readOnly formFields={formFields} />
      </TabPanel>

      <TabPanel value={switcherCondition} index={MyOrderModalSwitcherConditions.BOXES_TO_ORDER}>
        <BoxesToOrder formFields={formFields} platformSettings={platformSettings} />
      </TabPanel>
    </div>
  )
})
