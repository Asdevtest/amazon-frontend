/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field'

import { checkIsPositiveNum } from '@utils/checks'
import { getDaysHoursMinutesForMinuter } from '@utils/date-time'
import { clearEverythingExceptNumbers } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './set-duration.style'

export const SetDuration = observer(({ title, titleStyle, setTotalTimeInMinute, duration }) => {
  const { classes: classNames } = useClassNames()

  const timeDuration = getDaysHoursMinutesForMinuter(duration)

  const initialState = {
    days: timeDuration.days || '',
    hours: timeDuration.hours || '',
    minutes: timeDuration.minutes || '',

    totalTimeInMinute: duration,
  }

  const [formFields, setFormFields] = useState(initialState)

  const onChangeField = fieldName => event => {
    const newFormFields = { ...formFields }

    if (['days'].includes(fieldName)) {
      if (event.target.value > 99) {
        newFormFields[fieldName] = 99
      } else {
        newFormFields[fieldName] = Number(clearEverythingExceptNumbers(event.target.value))
      }
    }

    if (['hours'].includes(fieldName)) {
      if (event.target.value > 23) {
        newFormFields[fieldName] = 23
      } else {
        newFormFields[fieldName] = Number(clearEverythingExceptNumbers(event.target.value))
      }
    }

    if (['minutes'].includes(fieldName)) {
      if (event.target.value > 59) {
        newFormFields[fieldName] = 59
      } else {
        newFormFields[fieldName] = Number(clearEverythingExceptNumbers(event.target.value))
      }
    }

    newFormFields.totalTimeInMinute = newFormFields.days * 24 * 60 + newFormFields.hours * 60 + newFormFields.minutes
    setFormFields(newFormFields)
  }

  useEffect(() => {
    setTotalTimeInMinute(formFields.totalTimeInMinute)
  }, [formFields])

  return (
    <div className={classNames.root}>
      <div className={classNames.durationMainWrapper}>
        {!!title && (
          <Typography className={cx(classNames.time, titleStyle)}>
            {title ?? t(TranslationKey['Time to complete']) + '*'}
          </Typography>
        )}
        <div className={classNames.inputsWrapper}>
          <div className={classNames.inputWrapper}>
            <Field
              oneLine
              placeholder={'00'}
              value={formFields.days}
              containerClasses={classNames.inputField}
              inputClasses={classNames.input}
              onChange={event => {
                if (checkIsPositiveNum(event.target.value)) {
                  onChangeField('days')(event)
                }
              }}
            />

            <Typography className={classNames.inputLabel}>{t(TranslationKey.days)}</Typography>
          </div>
          <div className={classNames.inputWrapper}>
            <Field
              oneLine
              placeholder={'00'}
              value={formFields.hours}
              containerClasses={classNames.inputField}
              inputClasses={classNames.input}
              onChange={event => {
                if (checkIsPositiveNum(event.target.value)) {
                  onChangeField('hours')(event)
                }
              }}
            />

            <Typography className={classNames.inputLabel}>{t(TranslationKey.hour)}</Typography>
          </div>
          <div className={classNames.inputWrapper}>
            <Field
              oneLine
              placeholder={'00'}
              value={formFields.minutes}
              containerClasses={classNames.inputField}
              inputClasses={classNames.input}
              onChange={event => {
                if (checkIsPositiveNum(event.target.value)) {
                  onChangeField('minutes')(event)
                }
              }}
            />

            <Typography className={classNames.inputLabel}>{t(TranslationKey.minute)}</Typography>
          </div>
        </div>
      </div>
    </div>
  )
})
