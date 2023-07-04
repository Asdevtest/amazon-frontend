import { Tabs } from '@mui/material'

import React from 'react'

import { observer } from 'mobx-react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { ITab } from '@components/shared/i-tab'
import { TabPanel } from '@components/shared/tab-panel'

import { t } from '@utils/translations'

import { ClientBuyShopsAds } from './client-buy-shops-ads'
import { useClassNames } from './client-buy-shops-content.style'
import { ClientBuyShopsDeals } from './client-buy-shops-deals'

export const ClientBuyShopsContent = observer(() => {
  const { classes: classNames } = useClassNames()

  const [tabIndex, setTabIndex] = React.useState(0)

  return (
    <React.Fragment>
      {SettingsModel.languageTag && (
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
      )}

      <TabPanel value={tabIndex} index={0}>
        <ClientBuyShopsAds />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <ClientBuyShopsDeals />
      </TabPanel>
    </React.Fragment>
  )
})
