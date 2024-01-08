import { FC, memo } from 'react'

import { StatusProgressBar } from '@components/shared/status-progress-bar'

import { useStyles } from './information.style'

import { Card } from '../../card'

import { InfoItem } from './info-item'
import { getInfoItems, negativeTrackedOrderStatuses, trackedOrderStatuses } from './information.config'

interface InformationProps {
  order: any
}

export const Information: FC<InformationProps> = memo(({ order }) => {
  const { classes: styles } = useStyles()

  return (
    <Card>
      <div className={styles.wrapper}>
        <StatusProgressBar
          currentStatus={order?.status}
          trackedStatuses={trackedOrderStatuses}
          negativeTrackedStatuses={negativeTrackedOrderStatuses}
        />

        <div className={styles.information}>
          {getInfoItems(order, styles.blueBackgroundForIcon).map(({ icon, title, value }, index) => (
            <InfoItem key={index} icon={icon} title={title} value={value} />
          ))}
        </div>
      </div>
    </Card>
  )
})
