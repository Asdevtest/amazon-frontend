import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import clsx from 'clsx'

import {Button} from '@components/buttons/button'
// import {texts} from '@constants/texts'
import {SuccessButton} from '@components/buttons/success-button/success-button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {Field} from '@components/field'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {UploadFilesInput} from '@components/upload-files-input'

import {checkIsPositiveNummberAndNoMoreNCharactersAfterDot} from '@utils/checks'
import {formatNormDateTime} from '@utils/date-time'
import {toFixedWithDollarSign} from '@utils/text'

// import {getLocalizedTexts} from '@utils/get-localized-texts'
import {useClassNames} from './create-or-edit-proposal-content.style'

// const textConsts = getLocalizedTexts(texts, 'ru').CreateOrEditRequestContent

export const CreateOrEditProposalContent = ({
  onCreateSubmit,
  onEditSubmit,
  request,
  showProgress,
  progressValue,
  proposalToEdit,
}) => {
  const classNames = useClassNames()

  const [images, setImages] = useState([])
  const [showPhotosModal, setShowPhotosModal] = useState(false)

  const sourceFormFields = {
    price: proposalToEdit?.price || '',
    execution_time: proposalToEdit?.execution_time || '',
    comment: proposalToEdit?.comment || '',
    linksToMediaFiles: proposalToEdit?.linksToMediaFiles || [],
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

  const onClickCreateSubmit = () => {
    onCreateSubmit(formFields, images)
  }

  const onClickEditSubmit = () => {
    onEditSubmit(formFields, images)
  }

  const disableSubmit =
    formFields.execution_time === '' ||
    formFields.price === '' ||
    formFields.comment === '' ||
    JSON.stringify(sourceFormFields) === JSON.stringify(formFields)

  return (
    <div className={classNames.mainWrapper}>
      <div className={classNames.mainLeftWrapper}>
        <Field
          multiline
          className={classNames.descriptionField}
          label={'Детали заявки'}
          inputComponent={
            <Typography
              minRows={16}
              rowsMax={16}
              className={clsx(classNames.twoStepFieldResult, classNames.requestDescriptionField)}
            >
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
            className={classNames.descriptionField}
            inputProps={{maxLength: 255}}
            minRows={8}
            rowsMax={8}
            label={'Опишите свое предложение*'}
            value={formFields.comment}
            onChange={onChangeField('comment')}
          />

          <div className={classNames.middleSubWrapper}>
            <Field
              label={'Введите цену предложения $*'}
              inputProps={{maxLength: 8}}
              value={formFields.price}
              onChange={onChangeField('price')}
            />

            <Field
              label={'Время на выполнение мин.*'}
              inputProps={{maxLength: 8}}
              containerClasses={classNames.dateWrapper}
              value={formFields.execution_time}
              onChange={onChangeField('execution_time')}
            />
          </div>

          <div className={classNames.imageFileInputWrapper}>
            <UploadFilesInput images={images} setImages={setImages} maxNumber={50} />

            <Button
              disableElevation
              disabled={!formFields.linksToMediaFiles.length}
              color="primary"
              className={classNames.imagesButton}
              variant="contained"
              onClick={() => setShowPhotosModal(!showPhotosModal)}
            >
              {'Имеющиеся файлы'}
            </Button>
          </div>
        </div>

        <div className={classNames.footerWrapper}>
          <div className={classNames.buttonsWrapper}>
            <SuccessButton
              disabled={disableSubmit}
              className={classNames.successBtn}
              onClick={proposalToEdit ? onClickEditSubmit : onClickCreateSubmit}
            >
              {proposalToEdit ? 'Изменить' : 'Предложить'}
            </SuccessButton>
          </div>
        </div>
      </div>

      {showProgress && <CircularProgressWithLabel value={progressValue} title="Загрузка фотографий..." />}

      <BigImagesModal
        isAmazone
        openModal={showPhotosModal}
        setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
        images={formFields.linksToMediaFiles || []}
      />
    </div>
  )
}
