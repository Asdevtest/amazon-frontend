import {twitterTabsStylesHook} from '@mui-treasury/styles/tabs'

import React from 'react'

import {Typography, Tabs, Tab} from '@material-ui/core'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {t} from '@utils/translations'

import {ClientBuyShopsAds} from './client-buy-shops-ads'
import {useClassNames} from './client-buy-shops-content.style'
import {ClientBuyShopsDeals} from './client-buy-shops-deals'

const TabPanel = ({children, value, index, ...other}) => {
  const classNames = useClassNames()
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className={classNames.tabPanel}>
          <Typography>{children}</Typography>
        </div>
      )}
    </div>
  )
}
export const ClientBuyShopsContent = observer(() => {
  const classNames = useClassNames()

  const [tabIndex, setTabIndex] = React.useState(0)
  const tabItemStyles = twitterTabsStylesHook.useTabItem()

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
          <Tab classes={tabItemStyles} label={t(TranslationKey.Ads)} />
          <Tab classes={tabItemStyles} label={t(TranslationKey.Deals)} />
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
