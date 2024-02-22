import { ChangeEvent, FC, memo, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SetFieldsToRework } from '@components/modals/main-request-result-modal/main-request-result-modal.type'
import { Field } from '@components/shared/field'
import { SetDuration } from '@components/shared/set-duration'
import { TooltipAttention } from '@components/shared/svg-icons'

import { getMinutesDifferenceFromNow } from '@utils/date-time'
import { t } from '@utils/translations'

import { useStyles } from './remarks-tab.style'

interface RemarksTabProps {
  isClient: boolean
  remark: string
  timeoutAt: number
  setFieldsToRework: SetFieldsToRework
}

export const RemarksTab: FC<RemarksTabProps> = memo(props => {
  const { isClient, remark, timeoutAt, setFieldsToRework } = props

  const { classes: styles, cx } = useStyles()

  const [timeLimitInMinutes, setTimeLimitInMinutes] = useState(getMinutesDifferenceFromNow(timeoutAt) || 0)
  const [reason, setReason] = useState(remark || '')

  useEffect(() => {
    if (isClient) {
      setFieldsToRework(prevFieldsToRework => ({
        ...prevFieldsToRework,
        reason,
        timeLimitInMinutes: Math.floor(timeLimitInMinutes),
      }))
    }
  }, [reason, timeLimitInMinutes])

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.flexContainer}>
          <TooltipAttention className={styles.icon} />
          <p className={cx(styles.text, styles.remarkText)}>{t(TranslationKey.Remarks)}</p>
        </div>

        {isClient ? (
          <div className={styles.flexContainer}>
            <p className={cx(styles.text, styles.reworkText)}>{t(TranslationKey['Time for rework'])}</p>
            <SetDuration duration={timeLimitInMinutes} setTotalTimeInMinute={setTimeLimitInMinutes} />
          </div>
        ) : null}
      </div>

      <Field
        multiline
        readOnly={!isClient}
        minRows={12}
        maxRows={12}
        value={reason}
        inputProps={{ maxLength: 2048 }}
        placeholder={`${t(TranslationKey.Remarks)}...`}
        inputClasses={styles.field}
        classes={{ input: styles.input }}
        containerClasses={styles.fieldContainer}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setReason(e.target.value)}
      />
    </div>
  )
})
