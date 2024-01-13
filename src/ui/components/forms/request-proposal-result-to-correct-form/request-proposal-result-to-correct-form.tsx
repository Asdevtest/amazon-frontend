import { observer } from 'mobx-react'
import { ChangeEvent, FC, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { useStyles } from './request-proposal-result-to-correct-form.style'

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
  const { classes: styles } = useStyles()

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
    <div className={styles.root}>
      <div className={styles.modalHeader}>
        <p className={styles.modalTitle}>{t(TranslationKey['Send in for rework'])}</p>
        <p className={styles.label}>{t(TranslationKey['No more than 5 times'])}</p>
      </div>

      <div className={styles.reasonWrapper}>
        <Field
          multiline
          className={styles.reasonInput}
          inputProps={{ maxLength: 1100 }}
          minRows={6}
          maxRows={6}
          label={t(TranslationKey['Reason for rework']) + '*'}
          labelClasses={styles.label}
          value={formFields.reason}
          onChange={onChangeField('reason')}
        />
      </div>

      <div className={styles.totalTime}>
        <p className={styles.time}>{t(TranslationKey['Time for rework']) + '*'}</p>
        <div className={styles.inputsWrapper}>
          <div className={styles.inputWrapper}>
            <Field
              oneLine
              placeholder={'00'}
              value={hour}
              containerClasses={styles.inputField}
              inputClasses={styles.input}
              onChange={(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                onChangeHour(event.target.value)
              }
            />

            <p className={styles.inputLabel}>{t(TranslationKey.hour)}</p>
          </div>

          <div className={styles.inputWrapper}>
            <Field
              oneLine
              placeholder={'00'}
              value={minute}
              containerClasses={styles.inputField}
              inputClasses={styles.input}
              onChange={(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                onChangeMinute(event.target.value)
              }
            />

            <p className={styles.inputLabel}>{t(TranslationKey.minute)}</p>
          </div>
        </div>
      </div>
      <div className={styles.uploadFilesInput}>
        <UploadFilesInput fullWidth images={images} setImages={setImages} maxNumber={50} />
      </div>

      <div className={styles.btnWrapper}>
        <Button
          color="primary"
          className={styles.btnSubmit}
          disabled={!formFields.reason || totalTimeInMinute === '0'}
          onClick={() => onPressSubmitForm(formFields, images)}
        >
          {t(TranslationKey['Send in for rework'])}
        </Button>
      </div>
    </div>
  )
})
