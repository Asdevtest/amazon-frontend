import {twitterTabsStylesHook} from '@mui-treasury/styles/tabs'

import React from 'react'

import {Typography, Box, Tabs, Tab} from '@material-ui/core'
import {observer} from 'mobx-react'

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
    {value === index && (
      <Box p={3}>
        <Typography>{children}</Typography>
      </Box>
    )}
  </div>
)

const tabsValues = {
  SHOPS: 'SHOPS',
  STOCK_REPORT: 'STOCK_REPORT',
  GOODS_DAYS_REPORT: 'GOODS_DAYS_REPORT',
}

export const ShopsIntegrations = observer(() => {
  const classNames = useClassNames()

  const [tabIndex, setTabIndex] = React.useState(tabsValues.SHOPS)

  const [curShop, setCurShop] = React.useState('')

  const tabItemStyles = twitterTabsStylesHook.useTabItem()

  return (
    <React.Fragment>
      <Tabs
        variant={'fullWidth'}
        classes={{
          root: classNames.row,
          indicator: classNames.indicator,
        }}
        value={tabIndex}
        onChange={(e, index) => setTabIndex(index)}
      >
        <Tab classes={tabItemStyles} label={'Магазины'} value={tabsValues.SHOPS} />
        <Tab classes={tabItemStyles} label={'Отчет со склада'} value={tabsValues.STOCK_REPORT} />
        <Tab classes={tabItemStyles} label={'Dashboard по товарам/дням'} value={tabsValues.GOODS_DAYS_REPORT} />
      </Tabs>

      <TabPanel value={tabIndex} index={tabsValues.SHOPS}>
        <ShopsView tabsValues={tabsValues} onChangeTabIndex={setTabIndex} onChangeCurShop={setCurShop} />
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
