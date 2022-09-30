import {twitterTabsStylesHook} from '@mui-treasury/styles/tabs'

import React from 'react'

import {Box, Tabs} from '@material-ui/core'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {ITab} from '@components/i-tab/i-tab'

import {t} from '@utils/translations'

import {GoodsDaysReport} from './goods-days-report'
import {useClassNames} from './shops-integrations.style'
import {ShopsView} from './shops-view'
import {StockReport} from './stock-report/stock-report'

const TabPanel = ({children, value, index, ...other}) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && <Box paddingTop={3}>{children}</Box>}
  </div>
)

const tabsValues = {
  SHOPS: 'SHOPS',
  STOCK_REPORT: 'STOCK_REPORT',
  GOODS_DAYS_REPORT: 'GOODS_DAYS_REPORT',
}

export const ShopsIntegrations = observer(({openModal}) => {
  const classNames = useClassNames()

  const [tabIndex, setTabIndex] = React.useState(tabsValues.SHOPS)

  const [curShop, setCurShop] = React.useState('')

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
          <ITab
            tooltipInfoContent={t(TranslationKey['List of your stores'])}
            classes={tabItemStyles}
            label={t(TranslationKey.Shops)}
            value={tabsValues.SHOPS}
          />
          <ITab
            tooltipInfoContent={t(TranslationKey['Report for all stores'])}
            classes={tabItemStyles}
            label={t(TranslationKey['Warehouse report'])}
            value={tabsValues.STOCK_REPORT}
          />
          <ITab
            tooltipInfoContent={t(TranslationKey['History on products from the stores'])}
            classes={tabItemStyles}
            label={t(TranslationKey['Dashboard by goods/days'])}
            value={tabsValues.GOODS_DAYS_REPORT}
          />
        </Tabs>
      )}

      <TabPanel value={tabIndex} index={tabsValues.SHOPS}>
        <ShopsView
          tabsValues={tabsValues}
          openModal={openModal}
          onChangeTabIndex={setTabIndex}
          onChangeCurShop={setCurShop}
        />
      </TabPanel>
      <TabPanel value={tabIndex} index={tabsValues.STOCK_REPORT}>
        <StockReport curShop={curShop} />
      </TabPanel>

      <TabPanel value={tabIndex} index={tabsValues.GOODS_DAYS_REPORT}>
        <GoodsDaysReport curShop={curShop} />
      </TabPanel>
    </React.Fragment>
  )
})
