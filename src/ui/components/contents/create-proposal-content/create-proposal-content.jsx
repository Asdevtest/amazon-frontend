import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import clsx from 'clsx'

// import {texts} from '@constants/texts'
import {SuccessButton} from '@components/buttons/success-button/success-button'
import {Field} from '@components/field'
import {ImageFileInput} from '@components/image-file-input'

import {checkIsPositiveNummberAndNoMoreNCharactersAfterDot} from '@utils/checks'
import {formatNormDateTime} from '@utils/date-time'
import {toFixedWithDollarSign} from '@utils/text'

// import {getLocalizedTexts} from '@utils/get-localized-texts'
import {useClassNames} from './create-proposal-content.style'

// const textConsts = getLocalizedTexts(texts, 'ru').CreateOrEditRequestContent

export const CreateProposalContent = ({onSubmit, request}) => {
  const classNames = useClassNames()

  const [images, setImages] = useState([])

  const sourceFormFields = {
    price: '',
    execution_time: '',
    // comment: '',
    // linksToMediaFiles: [],
  }
  const [formFields, setFormFields] = useState(sourceFormFields)

  const onChangeField = fieldName => event => {
    const newFormFields = {...formFields}
    if (['execution_time'].includes(fieldName)) {
      newFormFields[fieldName] = parseInt(event.target.value) || ''
    } else if (
      ['price'].includes(fieldName) &&
      !checkIsPositiveNummberAndNoMoreNCharactersAfterDot(event.target.value, 2)
    ) {
      return
    } else {
      newFormFields[fieldName] = event.target.value
    }

    setFormFields(newFormFields)
  }

  const onSuccessSubmit = () => {
    onSubmit(formFields, images)
  }

  const disableSubmit = formFields.execution_time === '' || formFields.price === '' || formFields.comment === ''

  return (
    <div className={classNames.mainWrapper}>
      <div className={classNames.mainLeftWrapper}>
        <Field
          multiline
          className={classNames.descriptionField}
          minRows={4}
          rowsMax={4}
          label={'Детали заявки'}
          inputComponent={
            <Typography className={clsx(classNames.twoStepFieldResult, classNames.descriptionField)}>
              {request?.details.conditions}
            </Typography>
          }
        />

        <div className={classNames.mainLeftSubWrapper}>
          <Field
            label={'Цена'}
            inputComponent={
              <Typography className={clsx(classNames.twoStepFieldResult, classNames.price)}>
                {toFixedWithDollarSign(request?.request.price, 2)}
              </Typography>
            }
          />

          <Field
            label={'Срок выполнения'}
            inputComponent={
              <Typography className={classNames.twoStepFieldResult}>
                {request.request.timeoutAt && formatNormDateTime(request?.request.timeoutAt)}
              </Typography>
            }
          />
        </div>
      </div>

      <div className={classNames.mainRightWrapper}>
        <div className={classNames.middleWrapper}>
          <Field
            multiline
            disabled
            className={classNames.descriptionField}
            minRows={4}
            rowsMax={4}
            label={'Опишите свое предложение*'}
            value={formFields.comment}
            onChange={onChangeField('comment')}
          />

          <div className={classNames.middleSubWrapper}>
            <Field label={'Введите цену предложения*'} value={formFields.price} onChange={onChangeField('price')} />

            <Field
              label={'Время на выполнение мин.*'}
              containerClasses={classNames.dateWrapper}
              value={formFields.execution_time}
              onChange={onChangeField('execution_time')}
            />
          </div>

          <div className={classNames.imageFileInputWrapper}>
            <ImageFileInput images={images} setImages={setImages} maxNumber={50} />
          </div>
        </div>

        <div className={classNames.footerWrapper}>
          <div className={classNames.buttonsWrapper}>
            <SuccessButton disabled={disableSubmit} className={classNames.successBtn} onClick={onSuccessSubmit}>
              {'Предложить'}
            </SuccessButton>
          </div>
        </div>
      </div>
    </div>
  )
}
