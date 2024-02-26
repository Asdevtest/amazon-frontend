/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MultilineTextCell } from '..'
import { CSSProperties, FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { secondsToTime } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './time-from-seconds-cell.style'

interface TimeFromSecondsCellProps {
  seconds: number
  color?: CSSProperties
}

export const TimeFromSecondsCell: FC<TimeFromSecondsCellProps> = memo(({ seconds, color }) => {
  const { classes: styles } = useStyles()

  const time = secondsToTime(seconds)

  return seconds >= 60 ? (
    // @ts-ignore
    <div className={styles.secondsTimeWrapper} style={color && { color }}>
      {time.days > 0 && (
        <p>
          {time.days} {t(TranslationKey.days)}
        </p>
      )}

      {time.hours > 0 && (
        <p>
          {time.hours} {t(TranslationKey.hour)}
        </p>
      )}

      {time.minutes > 0 && (
        <p>
          {time.minutes} {t(TranslationKey.minute)}
        </p>
      )}
    </div>
  ) : (
    <MultilineTextCell color={color} text={time.seconds > 0 ? `${time.seconds} ${t(TranslationKey.sec)}` : `${0}`} />
  )
})
