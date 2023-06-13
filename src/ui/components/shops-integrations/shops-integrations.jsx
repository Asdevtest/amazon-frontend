import { Box, Tabs } from '@mui/material'

import React from 'react'

import { observer } from 'mobx-react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { ITab } from '@components/shared/i-tab/i-tab'

import { t } from '@utils/translations'

import { GoodsDaysReport } from './goods-days-report'
import { useClassNames } from './shops-integrations.style'
import { ShopsView } from './shops-view'
import { StockReport } from './stock-report/stock-report'

const TabPanel = ({ children, value, index, ...other }) => (
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

export const ShopsIntegrations = observer(({ openModal }) => {
  const { classes: classNames } = useClassNames()

  const [tabIndex, setTabIndex] = React.useState(tabsValues.SHOPS)

  const [curShop, setCurShop] = React.useState('')

  return (
    <div className={classNames.shopWrapper}>
      {SettingsModel.languageTag && (
        <Tabs
          variant={'fullWidth'}
          classes={{
            root: classNames.root,
            indicator: classNames.indicator,
          }}
          value={tabIndex}
          onChange={(e, index) => setTabIndex(index)}
        >
          <ITab
            tooltipInfoContent={t(TranslationKey['List of your stores'])}
            label={t(TranslationKey.Shops)}
            value={tabsValues.SHOPS}
          />
          <ITab
            tooltipInfoContent={t(TranslationKey['Report for all stores'])}
            label={t(TranslationKey['Warehouse report'])}
            value={tabsValues.STOCK_REPORT}
          />
          <ITab
            tooltipInfoContent={t(TranslationKey['History on products from the stores'])}
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
    </div>
  )
})
