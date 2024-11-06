import { FC, memo, useState } from 'react'

import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { TabPanel } from '@components/shared/tab-panel'

import { ISpec } from '@typings/shared/spec'

import { useStyles } from './tabs.style'

import { IFields, SetFields } from '../../main-request-result-modal.type'

import { FilesTab, LinksTab, RemarksTab } from './components'
import { customSwitcherSettings } from './tabs.config'
import { MainRequestResultModalSwitcherConditions } from './tabs.type'

interface TabsProps {
  isClient: boolean
  productId: string
  spec: ISpec
  fields: IFields
  setFields: SetFields
  readOnly?: boolean
}

export const Tabs: FC<TabsProps> = memo(props => {
  const { isClient, productId, spec, fields, setFields, readOnly } = props

  const { classes: styles } = useStyles()

  const [switcherCondition, setSwitcherCondition] = useState(MainRequestResultModalSwitcherConditions.FILES)

  return (
    <div className={styles.tabs}>
      <CustomRadioButton
        size="large"
        options={customSwitcherSettings}
        value={switcherCondition}
        onChange={e => setSwitcherCondition(e.target.value)}
      />

      <TabPanel value={switcherCondition} index={MainRequestResultModalSwitcherConditions.FILES}>
        <FilesTab
          readOnly={readOnly}
          isClient={isClient}
          productId={productId}
          spec={spec}
          files={fields?.media}
          setFields={setFields}
        />
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
