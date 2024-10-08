import { observer } from 'mobx-react'
import { Fragment, useState } from 'react'

import { Tabs } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { ITab } from '@components/shared/i-tab'
import { TabPanel } from '@components/shared/tab-panel'

import { t } from '@utils/translations'

import { useStyles } from './client-buy-shops-content.style'

import { ClientBuyShopsAds } from './client-buy-shops-ads'
import { ClientBuyShopsDeals } from './client-buy-shops-deals'

export const ClientBuyShopsContent = observer(() => {
  const { classes: styles } = useStyles()

  const [tabIndex, setTabIndex] = useState(0)

  return (
    <Fragment>
      {SettingsModel.languageTag && (
        <Tabs
          variant={'fullWidth'}
          classes={{
            root: styles.row,
            indicator: styles.indicator,
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
    </Fragment>
  )
})
