import { Tooltip } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { checkCurrentPeriodValid } from '@components/modals/report-modal/helpers/check-current-period-valid'

import { formatDateWithoutTime } from '@utils/date-time'
import { t } from '@utils/translations'

import { ILaunch } from '@typings/shared/launch'

import { getLaunchStyle } from './helpers/get-launch-style'
import { useStyles } from './launches.style'

import { getLaunchName } from './helpers/get-launch-name'
import { getLaunchValue } from './helpers/get-launch-value'

interface LaunchesProps {
  launches: ILaunch[]
  isCell?: boolean
}

export const Launches: FC<LaunchesProps> = memo(props => {
  const { launches, isCell } = props

  const { classes: styles, theme, cx } = useStyles()

  return (
    <div className={cx(styles.wrapper, { [styles.cell]: isCell })}>
      {launches.map((launch, index) => {
        const expired = checkCurrentPeriodValid(launch.dateTo)
        const dateFrom = formatDateWithoutTime(launch.dateFrom) || t(TranslationKey.Missing)
        const dateTo = formatDateWithoutTime(launch.dateTo) || t(TranslationKey.Missing)

        return (
          <Tooltip key={index} title={`${dateFrom} - ${dateTo}`}>
            <p style={getLaunchStyle(launch.type, theme)} className={cx(styles.text, { [styles.expired]: expired })}>
              {`${getLaunchName(launch.type, true)} ${getLaunchValue(launch.value)}`}
            </p>
          </Tooltip>
        )
      })}
    </div>
  )
})
