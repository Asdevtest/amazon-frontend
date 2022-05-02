import {twitterTabsStylesHook} from '@mui-treasury/styles/tabs'

import React from 'react'

import {Typography, Box, Tabs, Tab} from '@material-ui/core'
import {observer} from 'mobx-react'

import {ClientShopsView} from './client-shop-view/client-shop-view'
import {GoodsDaysReport} from './goods-days-report'
import {useClassNames} from './shops-integrations.style'
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

export const ShopsIntegrations = observer(() => {
  const classNames = useClassNames()

  const [tabIndex, setTabIndex] = React.useState(0)
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
        <Tab classes={tabItemStyles} label={'Магазины'} />
        <Tab classes={tabItemStyles} label={'Отчет со склада'} />
        <Tab classes={tabItemStyles} label={'Dashboard по товарам/дням'} />
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
        <ClientShopsView />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <StockReport />
      </TabPanel>

      <TabPanel value={tabIndex} index={2}>
        <GoodsDaysReport />
      </TabPanel>
    </React.Fragment>
  )
})
