import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { Tabs } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { ITab } from '@components/shared/i-tab'
import { TabPanel } from '@components/shared/tab-panel'

import { t } from '@utils/translations'

import { useStyles } from './user-info-and-edit.style'

import { UserBalance } from './user-balance'
import { UserEdit } from './user-edit'

export const UserInfoAndEdit = observer(({ user }) => {
  const { classes: styles } = useStyles()

  const [tabIndex, setTabIndex] = useState(0)

  const [updatedUser, setUpdatedUser] = useState(user)

  useEffect(() => {
    setUpdatedUser(() => ({ ...user }))
  }, [SettingsModel.languageTag, user])

  return (
    <>
      {SettingsModel.languageTag && (
        <Tabs
          variant={'fullWidth'}
          classes={{
            root: styles.row,
            indicator: styles.indicator,
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
    </>
  )
})
