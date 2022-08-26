import CircleIcon from '@mui/icons-material/Circle'
import {Rating} from '@mui/material'

import React, {useState} from 'react'

import {Avatar, Checkbox, Link, List, ListItem, ListItemText, TextareaAutosize, Typography} from '@material-ui/core'
import clsx from 'clsx'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'
import {Field} from '@components/field'
import {UploadFilesInput} from '@components/upload-files-input'
import {UserLink} from '@components/user-link'

import {checkIsPositiveNummberAndNoMoreNCharactersAfterDot} from '@utils/checks'
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

  const sourceFormFields = {
    price: proposalToEdit?.price || request?.request.price,
    execution_time: proposalToEdit?.execution_time || '',
    comment: proposalToEdit?.comment || '',
    linksToMediaFiles: proposalToEdit?.linksToMediaFiles || [],
    title: proposalToEdit?.title || '',
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
    } else if (['title'].includes(fieldName)) {
      newFormFields[fieldName] = event.target.value.replace(/\n/g, '')
    } else {
      newFormFields[fieldName] = event.target.value
    }

    setFormFields(newFormFields)
  }
  console.log(formFields.price)
  const onClickCreateSubmit = () => {
    onCreateSubmit(formFields, images)
  }

  const onClickEditSubmit = () => {
    onEditSubmit(formFields, images)
  }

  const disableSubmit =
    formFields.execution_time === '' ||
    formFields.comment === '' ||
    formFields.comment.length > 2000 ||
    formFields.price < 0.01 ||
    formFields.price.toString().charAt(1) === '0' ||
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
            <Avatar
              src={getUserAvatarSrc(request?.request?.createdById || request?.createdById)}
              className={classNames.userPhoto}
            />
            <div>
              <UserLink
                blackText
                name={request?.request?.createdBy?.name || request.createdBy?.name}
                userId={request.createdBy?._id}
              />
              <div className={classNames.ratingWrapper}>
                <Typography>{t(TranslationKey.Rating)}</Typography>
                <Rating disabled value={request?.request.createdBy?.rating || request.createdBy?.rating} />
              </div>
            </div>
          </div>

          <Typography className={classNames.subTitle}>{` ${'0'} ${t(TranslationKey['out of'])} ${
            request?.request.maxAmountOfProposals || request.maxAmountOfProposals
          } ${t(TranslationKey['suggestions left'])}`}</Typography>
        </div>

        <Field
          multiline
          className={classNames.descriptionField}
          label={t(TranslationKey['Application details'])}
          labelClasses={classNames.spanLabel}
          inputComponent={
            <TextareaAutosize disabled className={classNames.conditionsField} value={request?.details.conditions} />
          }
        />

        {request.details.linksToMediaFiles?.length > 0 ? (
          <Field
            label={'Файлы'}
            inputComponent={<PhotoAndFilesCarousel small files={request.details.linksToMediaFiles} width="400px" />}
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
            <div className={classNames.nameFieldWrapper}>
              <Field
                multiline
                className={classNames.nameField}
                labelClasses={classNames.spanLabel}
                inputProps={{maxLength: 100}}
                minRows={1}
                rowsMax={2}
                label={t(TranslationKey['Proposal Name*'])}
                value={formFields.title}
                onChange={onChangeField('title')}
              />
              <span className={clsx(formFields.title.length > 80 && classNames.error)}>{`${formFields.title.length} ${t(
                TranslationKey.of,
              )} 80 ${t(TranslationKey.characters)}`}</span>
            </div>

            <div className={classNames.imageFileInputWrapper}>
              <Typography className={classNames.imageFileInputTitle}>
                {t(TranslationKey['Attach a file (link to your portfolio, examples of work)'])}
              </Typography>
              <UploadFilesInput images={images} setImages={setImages} maxNumber={50} />
              <PhotoAndFilesCarousel small files={formFields.linksToMediaFiles} />
            </div>
            <div className={classNames.descriptionWrapper}>
              <Field
                multiline
                className={classNames.descriptionField}
                labelClasses={classNames.spanLabel}
                inputProps={{maxLength: 2100}}
                minRows={5}
                rowsMax={5}
                label={t(TranslationKey['Describe your proposal'])}
                value={formFields.comment}
                onChange={onChangeField('comment')}
              />
              <span className={clsx(formFields.comment.length > 2000 && classNames.error)}>{`${
                formFields.comment.length
              } ${t(TranslationKey.of)} 2000 ${t(TranslationKey.characters)}`}</span>
            </div>
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
        </div>

        <div className={classNames.footerWrapper}>
          <div className={classNames.buttonsWrapper}>
            <Button
              success
              disabled={disableSubmit}
              className={classNames.successBtn}
              onClick={proposalToEdit ? onClickEditSubmit : onClickCreateSubmit}
            >
              {proposalToEdit ? t(TranslationKey.Edit) : t(TranslationKey.Suggest)}
            </Button>
          </div>
        </div>
      </div>

      {showProgress && <CircularProgressWithLabel value={progressValue} title="Загрузка фотографий..." />}
    </div>
  )
}
