import { observer } from 'mobx-react'
import { ChangeEvent, FC, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field'

import { checkIsPositiveNum } from '@utils/checks'
import { getDaysHoursMinutesForMinuter } from '@utils/date-time'
import { clearEverythingExceptNumbers } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './set-duration.style'

interface SetDurationProps {
  duration: number
  setTotalTimeInMinute: (totalTimeInMinute: number) => void
  title?: string
  titleStyle?: string
}

interface FormFields {
  days: string | number
  hours: string | number
  minutes: string | number
  totalTimeInMinute: number
}

export const SetDuration: FC<SetDurationProps> = observer(props => {
  const { title, titleStyle, duration, setTotalTimeInMinute } = props
  const { classes: styles } = useStyles()

  const [formFields, setFormFields] = useState<FormFields>({
    days: '',
    hours: '',
    minutes: '',
    totalTimeInMinute: 0,
  })

  useEffect(() => {
    if (duration) {
      const { days, hours, minutes } = getDaysHoursMinutesForMinuter(duration)
      setFormFields({
        days,
        hours,
        minutes,
        totalTimeInMinute: duration,
      })
    }
  }, [duration])

  const onChangeField = (fieldName: keyof FormFields) => (event: ChangeEvent<HTMLInputElement>) => {
    const newFormFields = { ...formFields }

    if (fieldName === 'days') {
      if (Number(event.target.value) > 99) {
        newFormFields[fieldName] = 99
      } else {
        newFormFields[fieldName] = Number(clearEverythingExceptNumbers(event.target.value))
      }
    }

    if (fieldName === 'hours') {
      if (Number(event.target.value) > 23) {
        newFormFields[fieldName] = 23
      } else {
        newFormFields[fieldName] = Number(clearEverythingExceptNumbers(event.target.value))
      }
    }

    if (fieldName === 'minutes') {
      if (Number(event.target.value) > 59) {
        newFormFields[fieldName] = 59
      } else {
        newFormFields[fieldName] = Number(clearEverythingExceptNumbers(event.target.value))
      }
    }

    newFormFields.totalTimeInMinute =
      Number(newFormFields.days) * 24 * 60 + Number(newFormFields.hours) * 60 + Number(newFormFields.minutes)
    setFormFields(newFormFields)
  }

  useEffect(() => {
    setTotalTimeInMinute(formFields.totalTimeInMinute)
  }, [formFields])

  return (
    <div className={styles.wrapper}>
      {title && <p className={titleStyle}>{title ?? t(TranslationKey['Time to complete']) + '*'}</p>}

      <div className={styles.inputsWrapper}>
        <div className={styles.inputWrapper}>
          <Field
            oneLine
            placeholder="00"
            value={formFields.days}
            containerClasses={styles.inputField}
            inputClasses={styles.input}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (checkIsPositiveNum(event.target.value)) {
                onChangeField('days')(event)
              }
            }}
          />
          <p className={styles.inputLabel}>{t(TranslationKey.days)}</p>
        </div>

        <div className={styles.inputWrapper}>
          <Field
            oneLine
            placeholder="00"
            value={formFields.hours}
            containerClasses={styles.inputField}
            inputClasses={styles.input}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (checkIsPositiveNum(event.target.value)) {
                onChangeField('hours')(event)
              }
            }}
          />
          <p className={styles.inputLabel}>{t(TranslationKey.hour)}</p>
        </div>

        <div className={styles.inputWrapper}>
          <Field
            oneLine
            placeholder="00"
            value={formFields.minutes}
            containerClasses={styles.inputField}
            inputClasses={styles.input}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (checkIsPositiveNum(event.target.value)) {
                onChangeField('minutes')(event)
              }
            }}
          />
          <p className={styles.inputLabel}>{t(TranslationKey.minute)}</p>
        </div>
      </div>
    </div>
  )
})
