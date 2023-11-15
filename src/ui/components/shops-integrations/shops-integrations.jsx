import { memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomSwitcher } from '@components/shared/custom-switcher'
import { TabPanel } from '@components/shared/tab-panel'

import { t } from '@utils/translations'

import { GoodsDaysReport } from './goods-days-report'
import { ShopsView } from './shops-view'
import { StockReport } from './stock-report/stock-report'

const tabsValues = {
  SHOPS: 'SHOPS',
  STOCK_REPORT: 'STOCK_REPORT',
  GOODS_DAYS_REPORT: 'GOODS_DAYS_REPORT',
}

export const ShopsIntegrations = memo(({ openModal }) => {
  const [tabIndex, setTabIndex] = useState(tabsValues.SHOPS)
  const [curShop, setCurShop] = useState('')

  return (
    <>
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
    </>
  )
})
