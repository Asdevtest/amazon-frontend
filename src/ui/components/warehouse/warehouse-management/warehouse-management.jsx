import { Tabs } from '@mui/material'

import React, { useEffect } from 'react'

import { observer } from 'mobx-react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { ITab } from '@components/shared/i-tab'
import { TabPanel } from '@components/shared/tab-panel'

import { t } from '@utils/translations'

import { LogisticsTariffs } from './logistics-tariffs'
import { useClassNames } from './warehouse-management.style'
import { WarehouseTariffs } from './warehouse-tariffs'
import { WeightBasedLogisticsTariffs } from './weight-based-logistics-tariffs'

export const WarehouseManagement = observer(() => {
  const { classes: classNames } = useClassNames()

  const [tabIndex, setTabIndex] = React.useState(0)

  useEffect(() => {
    setTabIndex(() => tabIndex)
  }, [SettingsModel.languageTag])

  return (
    <React.Fragment>
      <Tabs
        variant="fullWidth"
        classes={{
          root: classNames.row,
          indicator: classNames.indicator,
        }}
        value={tabIndex}
        onChange={(e, index) => setTabIndex(index)}
      >
        <ITab
          tooltipInfoContent={t(TranslationKey['Rates for shipping boxes to Amazon warehouses'])}
          label={t(TranslationKey['Weight-based logistics tariffs'])}
        />
        <ITab
          tooltipInfoContent={t(TranslationKey['Rates for shipping boxes to Amazon warehouses'])}
          label={t(TranslationKey['Logistics tariffs'])}
        />
        <ITab
          tooltipInfoContent={t(TranslationKey['Prices for additional warehouse services'])}
          label={t(TranslationKey['Tariffs of warehouse services'])}
        />
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
        <WeightBasedLogisticsTariffs />
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        <LogisticsTariffs />
      </TabPanel>

      <TabPanel value={tabIndex} index={2}>
        <WarehouseTariffs />
      </TabPanel>
    </React.Fragment>
  )
})
