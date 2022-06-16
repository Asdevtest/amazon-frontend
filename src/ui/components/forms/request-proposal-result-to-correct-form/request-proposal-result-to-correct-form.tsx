import React, {ChangeEvent, FC, useState} from 'react'

import {observer} from 'mobx-react'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'

import {checkIsPositiveNummberAndNoMoreNCharactersAfterDot} from '@utils/checks'

import {useClassNames} from './request-proposal-result-to-correct-form.style'

interface Props {
  onPressSubmitForm: (formFields: FormFileds) => void
}

interface FormFileds {
  reason: string
  linksToMediaFiles: string[]
  timeLimitInMinutes: string
}

export const RequestProposalResultToCorrectForm: FC<Props> = observer(({onPressSubmitForm}) => {
  const [formFields, setFormFields] = useState<FormFileds>({
    reason: '',
    linksToMediaFiles: [],
    timeLimitInMinutes: '',
  })
  const classNames = useClassNames()
  const onChangeField =
    (fieldName: keyof FormFileds) => (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const formFieldsNewState = {...formFields}
      const value = event.target.value
      if (fieldName === 'linksToMediaFiles' && typeof value === 'string') {
        if (formFields.linksToMediaFiles.includes(value)) {
          formFieldsNewState.linksToMediaFiles = formFields.linksToMediaFiles.filter(
            (linkToMediaFile: string) => linkToMediaFile !== value,
          )
        } else {
          formFieldsNewState.linksToMediaFiles.push(value)
        }
      } else if (fieldName === 'timeLimitInMinutes') {
        if (!checkIsPositiveNummberAndNoMoreNCharactersAfterDot(value, 0)) {
          return
        } else {
          formFieldsNewState[fieldName] = value as never
        }
      } else {
        if (typeof formFieldsNewState[fieldName] === 'number') {
          formFieldsNewState[fieldName] = parseInt(value) as never
        } else {
          formFieldsNewState[fieldName] = value as never
        }
      }
      setFormFields(formFieldsNewState)
    }
  return (
    <div className={classNames.root}>
      <div className={classNames.reasonInputWrapper}>
        <Field
          multiline
          className={classNames.reasonInput}
          inputProps={{maxLength: 255}}
          minRows={4}
          label={'Опишите причину'}
          value={formFields.reason}
          onChange={onChangeField('reason')}
        />
      </div>
      <div className={classNames.inputWrapper}>
        <Field
          inputProps={{inputMode: 'numeric'}}
          label={'Введите лимит времени (мин)'}
          value={formFields.timeLimitInMinutes}
          onChange={onChangeField('timeLimitInMinutes')}
        />
      </div>
      <div className={classNames.btnWrapper}>
        <Button
          disabled={!formFields.reason}
          onClick={() => {
            onPressSubmitForm(formFields)
          }}
        >
          {'Отправить'}
        </Button>
      </div>
    </div>
  )
})
