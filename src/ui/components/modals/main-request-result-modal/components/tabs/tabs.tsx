import { FC, memo, useState } from 'react'

import { CustomSwitcher } from '@components/shared/custom-switcher'
import { TabPanel } from '@components/shared/tab-panel'

import { useStyles } from './tabs.style'

import { IFields, SetFields } from '../../main-request-result-modal.type'

import { FilesTab, LinksTab, RemarksTab } from './components'
import { customSwitcherSettings } from './tabs.config'
import { MainRequestResultModalSwitcherConditions } from './tabs.type'

interface TabsProps {
  isClient: boolean
  fields: IFields
  setFields: SetFields
  readOnly?: boolean
}

export const Tabs: FC<TabsProps> = memo(props => {
  const { isClient, fields, setFields, readOnly } = props

  const { classes: styles } = useStyles()

  const [switcherCondition, setSwitcherCondition] = useState(MainRequestResultModalSwitcherConditions.FILES)

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
        <FilesTab readOnly={readOnly} isClient={isClient} files={fields?.media} setFields={setFields} />
      </TabPanel>

      <TabPanel value={switcherCondition} index={MainRequestResultModalSwitcherConditions.LINKS}>
        <LinksTab readOnly={readOnly} isClient={isClient} fields={fields} setFields={setFields} />
      </TabPanel>

      <TabPanel value={switcherCondition} index={MainRequestResultModalSwitcherConditions.REMARKS}>
        <RemarksTab readOnly={readOnly} isClient={isClient} fields={fields} setFields={setFields} />
      </TabPanel>
    </div>
  )
})
