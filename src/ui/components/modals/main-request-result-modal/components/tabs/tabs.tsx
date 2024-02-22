import { FC, memo, useState } from 'react'

import { CustomSwitcher } from '@components/shared/custom-switcher'
import { TabPanel } from '@components/shared/tab-panel'

import { useStyles } from './tabs.style'

import {
  IFieldsAfterRework,
  IFieldsToRework,
  IMediaRework,
  SetFieldsAfterRework,
  SetFieldsToRework,
} from '../../main-request-result-modal.type'

import { FilesTab, LinksTab, RemarksTab } from './components'
import { customSwitcherSettings } from './tabs.config'
import { MainRequestResultModalSwitcherConditions } from './tabs.type'

interface TabsProps {
  isClient: boolean
  media: IMediaRework[]
  fieldsToRework: IFieldsToRework
  fieldsAfterRework: IFieldsAfterRework
  setFieldsToRework: SetFieldsToRework
  setFieldsAfterRework: SetFieldsAfterRework
}

export const Tabs: FC<TabsProps> = memo(props => {
  const { isClient, media, fieldsToRework, fieldsAfterRework, setFieldsToRework, setFieldsAfterRework } = props

  const { classes: styles } = useStyles()

  const [switcherCondition, setSwitcherCondition] = useState(MainRequestResultModalSwitcherConditions.FILES)

  const displayedFiles = isClient ? fieldsToRework.media : fieldsAfterRework.media

  return (
    <div className={styles.tabs}>
      <CustomSwitcher
        fullWidth
        switchMode="medium"
        condition={switcherCondition}
        switcherSettings={customSwitcherSettings}
        changeConditionHandler={value => setSwitcherCondition(value as number)}
      />

      <TabPanel value={switcherCondition} index={MainRequestResultModalSwitcherConditions.FILES}>
        <FilesTab
          isClient={isClient}
          media={media}
          displayedFiles={displayedFiles}
          setFieldsToRework={setFieldsToRework}
          setFieldsAfterRework={setFieldsAfterRework}
        />
      </TabPanel>

      <TabPanel value={switcherCondition} index={MainRequestResultModalSwitcherConditions.LINKS}>
        <LinksTab
          isClient={isClient}
          links={fieldsAfterRework.publicationLinks}
          setFieldsAfterRework={setFieldsAfterRework}
        />
      </TabPanel>

      <TabPanel value={switcherCondition} index={MainRequestResultModalSwitcherConditions.REMARKS}>
        <RemarksTab
          isClient={isClient}
          remark={fieldsToRework.reason}
          timeoutAt={fieldsToRework.timeLimitInMinutes}
          setFieldsToRework={setFieldsToRework}
        />
      </TabPanel>
    </div>
  )
})
