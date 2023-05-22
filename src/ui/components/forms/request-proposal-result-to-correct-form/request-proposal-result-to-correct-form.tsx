import { Typography } from '@mui/material'

import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import { observer } from 'mobx-react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { useClassNames } from './request-proposal-result-to-correct-form.style'

interface Props {
  onPressSubmitForm: (formFields: FormFileds, images?: Array<{}>) => void
}

interface FormFileds {
  reason: string
  linksToMediaFiles: string[]
  timeLimitInMinutes: string
}

export const RequestProposalResultToCorrectForm: FC<Props> = observer(({ onPressSubmitForm }) => {
  const [formFields, setFormFields] = useState<FormFileds>({
    reason: '',
    linksToMediaFiles: [],
    timeLimitInMinutes: '',
  })
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const [images, setImages] = useState([])
  const { classes: classNames } = useClassNames()

  const onChangeHour = (value: string) => {
    const maxValue = 99
    if (+value < maxValue + 1) {
      setHour(value)
    } else {
      setHour(maxValue.toString())
    }
  }
  const onChangeMinute = (value: string) => {
    const maxValue = 59
    if (+value < maxValue + 1) {
      setMinute(value)
    } else {
      setMinute(maxValue.toString())
    }
  }

  const totalTimeInMinute = (+hour * 60 + +minute).toString()

  const onChangeField =
    (fieldName: keyof FormFileds) => (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const formFieldsNewState = { ...formFields }
      const value = event.target.value

      if (typeof formFieldsNewState[fieldName] === 'number') {
        formFieldsNewState[fieldName] = parseInt(value) as never
      } else {
        formFieldsNewState[fieldName] = value as never
      }

      setFormFields(formFieldsNewState)
    }

  useEffect(() => {
    setFormFields(prev => ({ ...prev, linksToMediaFiles: images, timeLimitInMinutes: totalTimeInMinute }))
  }, [totalTimeInMinute, images])

  return (
    <div className={classNames.root}>
      <div className={classNames.modalHeader}>
        <Typography className={classNames.modalTitle}>{t(TranslationKey['Send in for rework'])}</Typography>
        <Typography className={classNames.countTimes}>{t(TranslationKey['No more than 5 times'])}</Typography>
      </div>
      <div className={classNames.reasonWrapper}>
        <Field
          multiline
          className={classNames.reasonInput}
          inputProps={{ maxLength: 1100 }}
          minRows={6}
          maxRows={6}
          label={t(TranslationKey['Reason for rework']) + '*'}
          labelClasses={classNames.label}
          value={formFields.reason}
          onChange={onChangeField('reason')}
        />
      </div>
      <div className={classNames.totalTime}>
        <Typography className={classNames.time}>{t(TranslationKey['Time for rework']) + '*'}</Typography>
        <div className={classNames.inputsWrapper}>
          <div className={classNames.inputWrapper}>
            <Field
              oneLine
              // type="number"
              placeholder={'00'}
              value={hour}
              containerClasses={classNames.inputField}
              inputClasses={classNames.input}
              onChange={(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                onChangeHour(event.target.value)
              }
            />

            <Typography className={classNames.inputLabel}>{t(TranslationKey.hour)}</Typography>
          </div>
          <div className={classNames.inputWrapper}>
            <Field
              oneLine
              // type="number"
              placeholder={'00'}
              value={minute}
              containerClasses={classNames.inputField}
              inputClasses={classNames.input}
              onChange={(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                onChangeMinute(event.target.value)
              }
            />

            <Typography className={classNames.inputLabel}>{t(TranslationKey.minute)}</Typography>
          </div>
        </div>
      </div>
      <div>
        <UploadFilesInput images={images} setImages={setImages} maxNumber={50} />
      </div>

      <div className={classNames.btnWrapper}>
        <Button
          color="primary"
          className={classNames.btnSubmit}
          disabled={!formFields.reason || totalTimeInMinute === '0'}
          onClick={() => onPressSubmitForm(formFields, images)}
        >
          {t(TranslationKey['Send in for rework'])}
        </Button>
      </div>
    </div>
  )
})
