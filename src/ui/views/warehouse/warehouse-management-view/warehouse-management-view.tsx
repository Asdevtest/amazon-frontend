import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomSwitcher } from '@components/shared/custom-switcher'
import { TabPanel } from '@components/shared/tab-panel'

import { t } from '@utils/translations'

import { WarehouseTariffs } from './warehouse-tariffs'
import { WeightBasedLogisticsTariffs } from './weight-based-logistics-tariffs'

const switcherConfig = [
  { label: () => t(TranslationKey['Weight-based logistics tariffs']), value: 0 },
  { label: () => t(TranslationKey['Tariffs of warehouse services']), value: 1 },
]

export const WarehouseManagementView = () => {
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <>
      <CustomSwitcher
        switchMode="medium"
        condition={tabIndex}
        switcherSettings={switcherConfig}
        changeConditionHandler={setTabIndex}
      />

      <TabPanel value={tabIndex} index={0}>
        <WeightBasedLogisticsTariffs />
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        <WarehouseTariffs />
      </TabPanel>
    </>
  )
}
