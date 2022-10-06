import {twitterTabsStylesHook} from '@mui-treasury/styles/tabs'
import {Typography, Box, Tabs, Tab} from '@mui/material'

import React from 'react'

import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {t} from '@utils/translations'

import {GroupPermissions} from './group-permissions'
import {SinglePermissions} from './single-permissions'
import {useClassNames} from './user-permissions.style'

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

export const UserPermissions = observer(() => {
  const {classes: classNames} = useClassNames()

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
          <Tab classes={tabItemStyles} label={t(TranslationKey['Permission Groups'])} />
          <Tab classes={tabItemStyles} label={t(TranslationKey.Permissions)} />
        </Tabs>
      )}

      <TabPanel value={tabIndex} index={0}>
        <GroupPermissions />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <SinglePermissions />
      </TabPanel>
    </React.Fragment>
  )
})
