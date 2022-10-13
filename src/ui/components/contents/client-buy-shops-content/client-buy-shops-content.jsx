import {Tabs} from '@mui/material'

import React from 'react'

import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {ITab} from '@components/i-tab/i-tab'

import {t} from '@utils/translations'

import {ClientBuyShopsAds} from './client-buy-shops-ads'
import {useClassNames} from './client-buy-shops-content.style'
import {ClientBuyShopsDeals} from './client-buy-shops-deals'

const TabPanel = ({children, value, index, ...other}) => {
  const {classes: classNames} = useClassNames()
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div className={classNames.tabPanel}>{children}</div>}
    </div>
  )
}
export const ClientBuyShopsContent = observer(() => {
  const {classes: classNames} = useClassNames()

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
