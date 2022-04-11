import {twitterTabsStylesHook} from '@mui-treasury/styles/tabs'

import React from 'react'

import {Typography, Box, Tabs, Tab} from '@material-ui/core'
import {observer} from 'mobx-react'

import {LogisticsTariffs} from './logistics-tariffs'
import {useClassNames} from './warehouse-management.style'
import {WarehouseTariffs} from './warehouse-tariffs'

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

export const WarehouseManagement = observer(() => {
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
        <Tab classes={tabItemStyles} label={'Тарифы на логистику'} />
        <Tab classes={tabItemStyles} label={'Тарифы на складские услуги'} />
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
        <LogisticsTariffs />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <WarehouseTariffs />
      </TabPanel>
    </React.Fragment>
  )
})
