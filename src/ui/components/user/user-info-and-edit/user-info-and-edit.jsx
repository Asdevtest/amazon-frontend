import { Tabs } from '@mui/material'

import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { ITab } from '@components/shared/i-tab'
import { TabPanel } from '@components/shared/tab-panel'

import { t } from '@utils/translations'

import { UserBalance } from './user-balance'
import { UserEdit } from './user-edit'
import { useClassNames } from './user-info-and-edit.style'

export const UserInfoAndEdit = observer(({ user }) => {
  const { classes: classNames } = useClassNames()

  const [tabIndex, setTabIndex] = React.useState(0)

  const [updatedUser, setUpdatedUser] = useState(user)

  useEffect(() => {
    setUpdatedUser(() => ({ ...user }))
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
          <ITab label={t(TranslationKey.Edit)} />
          <ITab label={t(TranslationKey.Balance)} />
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
