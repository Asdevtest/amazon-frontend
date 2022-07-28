import {twitterTabsStylesHook} from '@mui-treasury/styles/tabs'

import React, {useEffect} from 'react'

import {Typography, Box, Tabs} from '@material-ui/core'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {ITab} from '@components/i-tab/i-tab'

import {t} from '@utils/translations'

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
      <Box paddingTop={3}>
        <Typography>{children}</Typography>
      </Box>
    )}
  </div>
)

export const WarehouseManagement = observer(() => {
  const classNames = useClassNames()

  const [tabIndex, setTabIndex] = React.useState(0)
  const tabItemStyles = twitterTabsStylesHook.useTabItem()

  useEffect(() => {
    setTabIndex(() => tabIndex)
  }, [SettingsModel.languageTag])

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
        <ITab
          tooltipInfoContent={t(TranslationKey['Rates for shipping boxes to Amazon warehouses'])}
          classes={tabItemStyles}
          label={t(TranslationKey['Logistics tariffs'])}
        />
        <ITab
          tooltipInfoContent={t(TranslationKey['Prices for additional warehouse services'])}
          classes={tabItemStyles}
          label={t(TranslationKey['Tariffs of warehouse services'])}
        />
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
