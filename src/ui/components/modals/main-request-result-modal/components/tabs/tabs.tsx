import { FC, memo, useState } from 'react'

import { CustomSwitcher } from '@components/shared/custom-switcher'
import { TabPanel } from '@components/shared/tab-panel'

import { IProposal } from '@typings/models/proposals/proposal'

import { useStyles } from './tabs.style'

import { FilesTab, LinksTab } from './components'
import { customSwitcherSettings } from './tabs.config'
import { MainRequestResultModalSwitcherConditions } from './tabs.type'

interface TabsProps {
  proposal: IProposal
}

export const Tabs: FC<TabsProps> = memo(props => {
  const { proposal } = props

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
        <FilesTab files={proposal?.media} />
      </TabPanel>

      <TabPanel value={switcherCondition} index={MainRequestResultModalSwitcherConditions.LINKS}>
        <LinksTab />
      </TabPanel>

      <TabPanel value={switcherCondition} index={MainRequestResultModalSwitcherConditions.REMARKS}>
        REMARKS
      </TabPanel>
    </div>
  )
})
