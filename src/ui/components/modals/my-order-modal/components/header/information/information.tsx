import { FC, memo } from 'react'

import { IOrderWithAdditionalFields } from '@components/modals/my-order-modal/my-order-modal.type'
import { StatusProgressBar } from '@components/shared/status-progress-bar'

import { useStyles } from './information.style'

import { InfoItem } from './info-item'
import { getInfoItems, negativeTrackedOrderStatuses, trackedOrderStatuses } from './information.config'

interface InformationProps {
  formFields: IOrderWithAdditionalFields
}

export const Information: FC<InformationProps> = memo(({ formFields }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <StatusProgressBar
        currentStatus={formFields?.status}
        trackedStatuses={trackedOrderStatuses}
        negativeTrackedStatuses={negativeTrackedOrderStatuses}
      />

      <div className={styles.information}>
        {getInfoItems(formFields, styles.blueBackgroundForIcon).map(({ icon, title, value }, index) => (
          <InfoItem key={index} icon={icon} title={title} value={value} />
        ))}
      </div>
    </div>
  )
})
