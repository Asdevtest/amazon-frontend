import {useState, useEffect} from 'react'

import {Button, TextareaAutosize, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './request-proposal-custom-from.style'

const textConsts = getLocalizedTexts(texts, 'en').researcherRequestProposalCustomForm

export const RequestProposalCustomForm = observer(({onSubmit, isEdit, details}) => {
  const classNames = useClassNames()

  const sourceFormFields = {
    result: details?.result || '',
    comment: details?.conditions || '',
  }
  const [formFields, setFormFields] = useState(sourceFormFields)

  useEffect(() => {
    if (details) {
      setFormFields(details)
    }
  }, [details])

  const onChangeField = fieldName => event => {
    const newFormFields = {...formFields}
    newFormFields[fieldName] = event.target.value
    setFormFields(newFormFields)
  }

  const disableSubmitBtn = !formFields.result

  return (
    <div className={classNames.root}>
      <div className={classNames.form}>
        <Typography variant="h5" className={classNames.title}>
          {textConsts.title}
        </Typography>

        <Field
          multiline
          label={textConsts.result}
          inputComponent={
            <TextareaAutosize
              className={classNames.resultField}
              value={formFields.result}
              onChange={onChangeField('result')}
            />
          }
        />

        <Field
          multiline
          label={textConsts.comment}
          inputComponent={
            <TextareaAutosize
              className={classNames.commentField}
              value={formFields.comment}
              onChange={onChangeField('comment')}
            />
          }
        />
      </div>
      <div className={classNames.btnsWrapper}>
        <Button
          disableElevation
          disabled={disableSubmitBtn}
          color="primary"
          variant="contained"
          onClick={() => onSubmit(formFields)}
        >
          {isEdit ? textConsts.editBtn : textConsts.createBtn}
        </Button>
      </div>
    </div>
  )
})
