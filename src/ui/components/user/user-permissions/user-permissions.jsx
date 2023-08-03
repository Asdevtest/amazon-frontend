import { observer } from 'mobx-react'
import React from 'react'

import { Tabs } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { ITab } from '@components/shared/i-tab'
import { TabPanel } from '@components/shared/tab-panel'

import { t } from '@utils/translations'

import { useClassNames } from './user-permissions.style'

import { GroupPermissions } from './group-permissions'
import { SinglePermissions } from './single-permissions'

export const UserPermissions = observer(() => {
  const { classes: classNames } = useClassNames()

  const [tabIndex, setTabIndex] = React.useState(0)

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
    </React.Fragment>
  )
})
