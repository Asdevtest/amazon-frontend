import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomSwitcher } from '@components/shared/custom-switcher'
import { TabPanel } from '@components/shared/tab-panel'

import { t } from '@utils/translations'

import { WarehouseTariffs } from './warehouse-tariffs'
import { WeightBasedLogisticsTariffs } from './weight-based-logistics-tariffs'

export const WarehouseManagement = observer(() => {
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <>
      <CustomSwitcher
        switchMode="medium"
        condition={tabIndex}
        switcherSettings={[
          { label: () => t(TranslationKey['Weight-based logistics tariffs']), value: 0 },
          { label: () => t(TranslationKey['Tariffs of warehouse services']), value: 2 },
        ]}
        changeConditionHandler={setTabIndex}
      />

      <TabPanel value={tabIndex} index={0}>
        <WeightBasedLogisticsTariffs />
      </TabPanel>

      <TabPanel value={tabIndex} index={2}>
        <WarehouseTariffs />
      </TabPanel>
    </>
  )
})
