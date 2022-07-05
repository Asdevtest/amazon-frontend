import {twitterTabsStylesHook} from '@mui-treasury/styles/tabs'

import React from 'react'

import {
  Typography,
  /* Box,*/
  Tabs,
  Tab,
} from '@material-ui/core'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {t} from '@utils/translations'

import {GroupPermissions} from './group-permissions'
import {UserBalance} from './user-balance'
import {useClassNames} from './user-info-and-edit.style'

const TabPanel = ({children, value, index, ...other}) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && (
      <div p={3}>
        <Typography>{children}</Typography>
      </div>
    )}
  </div>
)

export const UserInfoAndEdit = observer(({user}) => {
  const classNames = useClassNames()

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
          <Tab classes={tabItemStyles} label={t(TranslationKey.Edit)} />
          <Tab classes={tabItemStyles} label={t(TranslationKey.Balance)} />
        </Tabs>
      )}

      <TabPanel value={tabIndex} index={0}>
        <GroupPermissions />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <UserBalance user={user} />
      </TabPanel>
    </React.Fragment>
  )
})
