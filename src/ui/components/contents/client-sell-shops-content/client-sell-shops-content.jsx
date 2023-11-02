import { observer } from 'mobx-react'
import React from 'react'

import { Tabs } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { ITab } from '@components/shared/i-tab'
import { TabPanel } from '@components/shared/tab-panel'

import { t } from '@utils/translations'

import { useClassNames } from './client-sell-shops-content.style'

import { ClientSellShopsAds } from './client-sell-shops-ads'
import { ClientSellShopsDeals } from './client-sell-shops-deals'

export const ClientSellShopsContent = observer(() => {
  const { classes: classNames } = useClassNames()

  const [tabIndex, setTabIndex] = React.useState(0)

  return (
    <React.Fragment>
      {SettingsModel.languageTag && (
        <>
          <Tabs
            variant={'fullWidth'}
            classes={{
              root: classNames.row,
              indicator: classNames.indicator,
            }}
            value={tabIndex}
            onChange={(e, index) => setTabIndex(index)}
          >
            <ITab label={t(TranslationKey.Ads)} />
            <ITab label={t(TranslationKey.Deals)} />
          </Tabs>
          <TabPanel value={tabIndex} index={0}>
            <ClientSellShopsAds />
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <ClientSellShopsDeals />
          </TabPanel>
        </>
      )}
    </React.Fragment>
  )
})
