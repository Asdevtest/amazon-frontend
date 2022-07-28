import {twitterTabsStylesHook} from '@mui-treasury/styles/tabs'

import React, {useEffect, useState} from 'react'

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

import {UserBalance} from './user-balance'
import {UserEdit} from './user-edit'
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
      <div paddingTop={3}>
        <Typography>{children}</Typography>
      </div>
    )}
  </div>
)

export const UserInfoAndEdit = observer(({user}) => {
  const classNames = useClassNames()

  const [tabIndex, setTabIndex] = React.useState(0)
  const tabItemStyles = twitterTabsStylesHook.useTabItem()

  const [updatedUser, setUpdatedUser] = useState(user)

  useEffect(() => {
    setUpdatedUser(() => ({...user}))
  }, [SettingsModel.languageTag, user])

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
        <UserEdit user={updatedUser} />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <UserBalance userId={updatedUser._id} />
      </TabPanel>
    </React.Fragment>
  )
})
