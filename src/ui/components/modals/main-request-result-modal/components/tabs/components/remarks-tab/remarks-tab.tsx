import { ChangeEvent, FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { IFields, SetFields } from '@components/modals/main-request-result-modal/main-request-result-modal.type'
import { Field } from '@components/shared/field'
import { SetDuration } from '@components/shared/set-duration'
import { TooltipAttention } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './remarks-tab.style'

interface RemarksTabProps {
  isClient: boolean
  fields: IFields
  setFields: SetFields
  readOnly?: boolean
}

export const RemarksTab: FC<RemarksTabProps> = memo(props => {
  const { isClient, fields, setFields, readOnly } = props

  const { classes: styles, cx } = useStyles()

  const handleChangeField = (field: keyof IFields, value: string | number) => {
    if (isClient) {
      setFields(prevFields => ({
        ...prevFields,
        [field]: value,
      }))
    }
  }

  const handleChangeReason = (reasonValue: string) => {
    handleChangeField('reason', reasonValue)
  }

  const handleChangeTime = (timeValue: number) => {
    handleChangeField('timeLimitInMinutes', Math.floor(timeValue))
  }

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
            <SetDuration
              readOnly={readOnly}
              duration={fields?.timeLimitInMinutes || 0}
              setTotalTimeInMinute={handleChangeTime}
            />
          </div>
        ) : null}
      </div>

      <Field
        multiline
        readOnly={!isClient || readOnly}
        minRows={7}
        maxRows={7}
        value={fields?.reason}
        inputProps={{ maxLength: 2048 }}
        placeholder={`${t(TranslationKey.Remarks)}...`}
        inputClasses={cx(styles.field, { [styles.notFocuced]: !isClient || readOnly })}
        classes={{ input: styles.input }}
        containerClasses={styles.fieldContainer}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeReason(e.target.value)}
      />
    </div>
  )
})
