import CircleIcon from '@mui/icons-material/Circle'
import {Rating} from '@mui/material'

import React, {useState} from 'react'

import {Avatar, Checkbox, Link, List, ListItem, ListItemText, Typography} from '@material-ui/core'
import clsx from 'clsx'
import Carousel from 'react-material-ui-carousel'

import {TranslationKey} from '@constants/translations/translation-key'

// import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button/success-button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {UserLinkCell} from '@components/data-grid-cells/data-grid-cells'
import {Field} from '@components/field'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {UploadFilesInput} from '@components/upload-files-input'

import {checkIsImageLink, checkIsPositiveNummberAndNoMoreNCharactersAfterDot} from '@utils/checks'
import {formatNormDateTime} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
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
  const [checked, setChecked] = useState(false)

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

  const disableSubmit = formFields.execution_time === '' || formFields.comment === '' || images?.length === 0
  JSON.stringify(sourceFormFields) === JSON.stringify(formFields)

  return (
    <div className={classNames.mainWrapper}>
      <div className={classNames.adviceWrapper}>
        <Typography className={classNames.adviceTitle}>
          {t(TranslationKey['Offering a Service to the Client:'])}
        </Typography>

        <List>
          <ListItem className={classNames.adviceListItem}>
            <CircleIcon color="primary" style={{width: '8px'}} />

            <ListItemText className={classNames.adviceListItemText}>
              {t(TranslationKey['Specify exactly how you are going to perform this task. Describe the key points.'])}
            </ListItemText>
          </ListItem>
          <ListItem className={classNames.adviceListItem}>
            <CircleIcon color="primary" style={{width: '8px'}} />

            <ListItemText className={classNames.adviceListItemText}>
              {t(TranslationKey['Compose unique feedback that shows your competence and interest in the project.'])}
            </ListItemText>
          </ListItem>
          <ListItem className={classNames.adviceListItem}>
            <CircleIcon color="primary" style={{width: '8px'}} />

            <ListItemText className={classNames.adviceListItemText}>
              {t(
                TranslationKey[
                  'Try to research market prices and make your offer based on the amount of work and your skills.'
                ],
              )}
            </ListItemText>
          </ListItem>
        </List>
        <div className={classNames.trainingTextWrapper}>
          <Typography className={classNames.trainingText}>
            {t(TranslationKey['You can also take a free'])}
            <Link className={classNames.trainingLink}>{t(TranslationKey.Training)}</Link>
            {t(TranslationKey['on our freelance exchange.'])}
          </Typography>
        </div>
      </div>
      <div className={classNames.mainLeftWrapper}>
        <div className={classNames.clientInfoWrapper}>
          <div className={classNames.clientInfo}>
            <Avatar src={getUserAvatarSrc(request?.createdById)} className={classNames.userPhoto} />
            <div>
              <UserLinkCell name={request.createdBy?.name} userId={request.createdBy?._id} />
              <div className={classNames.ratingWrapper}>
                <Typography>{t(TranslationKey.Rating)}</Typography>
                <Rating disabled value={request.createdBy?.rating} />
              </div>
            </div>
          </div>

          <Typography className={classNames.subTitle}>{` ${'0'} ${t(TranslationKey['out of'])} ${
            request.maxAmountOfProposals
          } ${t(TranslationKey['suggestions left'])}`}</Typography>
        </div>

        <Field
          multiline
          className={classNames.descriptionField}
          label={t(TranslationKey['Application details'])}
          labelClasses={classNames.spanLabel}
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
                  {request.details.linksToMediaFiles
                    ?.filter(el => checkIsImageLink(el))
                    .map((el, index) => (
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
            labelClasses={classNames.spanLabel}
            inputComponent={
              <Typography className={clsx(classNames.twoStepFieldResult, classNames.price)}>
                {toFixedWithDollarSign(request?.request.price, 2)}
              </Typography>
            }
          />

          <Field
            label={t(TranslationKey.Deadline)}
            labelClasses={classNames.spanLabel}
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
              className={classNames.nameField}
              labelClasses={classNames.spanLabel}
              inputProps={{maxLength: 1500}}
              minRows={1}
              rowsMax={2}
              label={t(TranslationKey['Proposal Name*'])}
            />
            <div className={classNames.imageFileInputWrapper}>
              <Typography className={classNames.imageFileInputTitle}>
                {t(TranslationKey['Attach a file (link to your portfolio, examples of work)'])}
              </Typography>
              <UploadFilesInput images={images} setImages={setImages} maxNumber={50} />

              {/* <Button
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
            </Button> */}
            </div>
            <Field
              multiline
              className={classNames.descriptionField}
              labelClasses={classNames.spanLabel}
              inputProps={{maxLength: 1500}}
              minRows={5}
              rowsMax={5}
              label={t(TranslationKey['Describe your proposal'])}
              value={formFields.comment}
              onChange={onChangeField('comment')}
            />
          </div>

          <div className={classNames.checkboxWrapper}>
            <Typography className={classNames.checkboxLabel}>{t(TranslationKey['Offer your price?'])}</Typography>
            <Checkbox color="primary" checked={checked} onChange={() => setChecked(!checked)} />
          </div>

          <div className={classNames.middleSubWrapper}>
            <Field
              disabled={!checked}
              label={t(TranslationKey['Enter the offer price'])}
              inputProps={{maxLength: 8}}
              value={formFields.price || toFixedWithDollarSign(request?.request.price, 2)}
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
