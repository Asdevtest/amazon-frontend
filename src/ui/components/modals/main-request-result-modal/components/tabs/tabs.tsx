import { FC, memo, useState } from 'react'

import { CustomSwitcher } from '@components/shared/custom-switcher'
import { TabPanel } from '@components/shared/tab-panel'

import { ICustomProposal } from '@typings/models/proposals/custom-proposal'

import { useStyles } from './tabs.style'

import { FilesTab, LinksTab, RemarksTab } from './components'
import { customSwitcherSettings } from './tabs.config'
import { MainRequestResultModalSwitcherConditions } from './tabs.type'

interface TabsProps {
  customProposal: ICustomProposal
}

export const Tabs: FC<TabsProps> = memo(({ customProposal }) => {
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
        <FilesTab media={customProposal?.proposal?.media} />
      </TabPanel>

      <TabPanel value={switcherCondition} index={MainRequestResultModalSwitcherConditions.LINKS}>
        <LinksTab links={customProposal?.details?.publicationLinks} />
      </TabPanel>

      <TabPanel value={switcherCondition} index={MainRequestResultModalSwitcherConditions.REMARKS}>
        <RemarksTab remark={customProposal?.details?.reasonToCorrect} timeoutAt={customProposal?.proposal?.timeoutAt} />
      </TabPanel>
    </div>
  )
})
