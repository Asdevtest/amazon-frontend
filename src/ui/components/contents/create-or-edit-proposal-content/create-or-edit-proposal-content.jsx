import React, {useEffect, useState} from 'react'

import {Typography} from '@material-ui/core'
import clsx from 'clsx'
import Carousel from 'react-material-ui-carousel'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button/success-button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {Field} from '@components/field'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {UploadFilesInput} from '@components/upload-files-input'

import {checkIsPositiveNummberAndNoMoreNCharactersAfterDot} from '@utils/checks'
import {formatNormDateTime} from '@utils/date-time'
import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './create-or-edit-proposal-content.style'

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

  const [bigImagesOptions, setBigImagesOptions] = useState({images: [], imgIndex: 0})

  const sourceFormFields = {
    price: proposalToEdit?.price || '',
    execution_time: proposalToEdit?.execution_time || '',
    comment: proposalToEdit?.comment || '',
    linksToMediaFiles: proposalToEdit?.linksToMediaFiles || [],
  }

  const [formFields, setFormFields] = useState(sourceFormFields)
  const [error, setError] = useState(false)

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

  useEffect(() => {
    if (formFields.comment.length < 150) {
      setError(true)
    } else {
      setError(false)
    }
  }, [formFields.comment.length])

  const disableSubmit =
    formFields.execution_time === '' ||
    formFields.price === '' ||
    formFields.comment === '' ||
    formFields.comment.length < 150 ||
    JSON.stringify(sourceFormFields) === JSON.stringify(formFields)

  return (
    <div className={classNames.mainWrapper}>
      <div className={classNames.mainLeftWrapper}>
        <Field
          multiline
          className={classNames.descriptionField}
          label={t(TranslationKey['Application details'])}
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

        {request.details.linksToMediaFiles?.length > 0 ? (
          <Field
            label={'Файлы'}
            inputComponent={
              <div className={classNames.photoWrapper}>
                <Carousel autoPlay timeout={100} animation="fade">
                  {request.details.linksToMediaFiles.map((el, index) => (
                    <div key={index}>
                      <img
                        alt=""
                        className={classNames.imgBox}
                        src={el}
                        onClick={() => {
                          setShowPhotosModal(!showPhotosModal)

                          setBigImagesOptions({images: request.details.linksToMediaFiles, imgIndex: index})
                        }}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            }
          />
        ) : null}

        <div className={classNames.mainLeftSubWrapper}>
          <Field
            label={t(TranslationKey.Price)}
            inputComponent={
              <Typography className={clsx(classNames.twoStepFieldResult, classNames.price)}>
                {toFixedWithDollarSign(request?.request.price, 2)}
              </Typography>
            }
          />

          <Field
            label={t(TranslationKey.Deadline)}
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
          <div className={classNames.descriptionFieldWrapper}>
            <Field
              multiline
              className={classNames.descriptionField}
              inputProps={{maxLength: 1500}}
              minRows={8}
              rowsMax={8}
              label={t(TranslationKey['Describe your proposal'])}
              value={formFields.comment}
              onChange={onChangeField('comment')}
            />
            {error && <span className={classNames.error}>{t(TranslationKey['Minimum number of characters 150'])}</span>}
          </div>

          <div className={classNames.middleSubWrapper}>
            <Field
              label={t(TranslationKey['Enter the offer price'])}
              inputProps={{maxLength: 8}}
              value={formFields.price}
              onChange={onChangeField('price')}
            />

            <Field
              label={t(TranslationKey['Time to complete, min*'])}
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
              disabled={!formFields.linksToMediaFiles?.length}
              color="primary"
              className={classNames.imagesButton}
              variant="contained"
              onClick={() => {
                setShowPhotosModal(!showPhotosModal)
                setBigImagesOptions({images: formFields.linksToMediaFiles})
              }}
            >
              {t(TranslationKey['Available files'])}
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
              {proposalToEdit ? t(TranslationKey.Edit) : t(TranslationKey.Suggest)}
            </SuccessButton>
          </div>
        </div>
      </div>

      {showProgress && <CircularProgressWithLabel value={progressValue} title="Загрузка фотографий..." />}

      <BigImagesModal
        isAmazone
        openModal={showPhotosModal}
        setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
        images={bigImagesOptions.images || []}
      />
    </div>
  )
}
