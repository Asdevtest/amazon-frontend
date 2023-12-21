import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ModalsModel } from '@models/model-with-modals'

import { CustomSwitcher } from '@components/shared/custom-switcher'
import { TabPanel } from '@components/shared/tab-panel'

import { getPropertiesToObject } from '@utils/object'
import { t } from '@utils/translations'

// import { useStyles } from './client-shops-view.style'
// import { ClientShopsViewModel } from './client-shops-view.model'
import { GoodsDaysReport, ShopsView, StockReport } from './components'
import { tabsValues } from './helpers/tabs-value'

export const ClientShopsView = observer(props => {
  // const [viewModel] = useState(() => new ClientShopsViewModel({ history: props.history, location: props.location }))

  const [classAvtovaz] = useState(() => new ModalsModel(props.history, getPropertiesToObject(['modal', 'moda2'])))

  console.log('classAvtovaz', classAvtovaz)

  // const { classes: styles } = useStyles()

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
          openModal={props?.location?.state?.openModal}
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
