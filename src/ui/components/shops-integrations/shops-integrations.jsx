import { observer } from 'mobx-react'
import React from 'react'

import { Tabs } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { CustomSwitcher } from '@components/shared/custom-switcher'
import { ITab } from '@components/shared/i-tab'
import { TabPanel } from '@components/shared/tab-panel'

import { t } from '@utils/translations'

import { useClassNames } from './shops-integrations.style'

import { GoodsDaysReport } from './goods-days-report'
import { ShopsView } from './shops-view'
import { StockReport } from './stock-report/stock-report'

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
      <CustomSwitcher
        fullWidth
        switchMode={'big'}
        condition={tabIndex}
        switcherSettings={[
          { label: () => t(TranslationKey.Shops), value: tabsValues.SHOPS },
          { label: () => t(TranslationKey['Warehouse report']), value: tabsValues.STOCK_REPORT },
          { label: () => t(TranslationKey['Dashboard by goods/days']), value: tabsValues.GOODS_DAYS_REPORT },
        ]}
        changeConditionHandler={setTabIndex}
      />

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
