import { observer } from 'mobx-react'
import { useState } from 'react'

import { Tabs } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { ITab } from '@components/shared/i-tab'
import { TabPanel } from '@components/shared/tab-panel'

import { t } from '@utils/translations'

import { useStyles } from './user-permissions.style'

import { GroupPermissions } from './group-permissions'
import { SinglePermissions } from './single-permissions'

export const UserPermissions = observer(() => {
  const { classes: styles } = useStyles()

  const [tabIndex, setTabIndex] = useState(0)

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
          <ITab label={t(TranslationKey['Permission Groups'])} />
          <ITab label={t(TranslationKey.Permissions)} />
        </Tabs>
      )}

      <TabPanel value={tabIndex} index={0}>
        <GroupPermissions />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <SinglePermissions />
      </TabPanel>
    </>
  )
})
