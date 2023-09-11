/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import { useState } from 'react'

import CircleIcon from '@mui/icons-material/Circle'
import { Avatar, Checkbox, Link, List, ListItem, ListItemText, Rating, Typography } from '@mui/material'

import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CustomTextEditor } from '@components/shared/custom-text-editor'
import { Field } from '@components/shared/field'
import { PhotoAndFilesCarousel } from '@components/shared/photo-and-files-carousel'
import { SetDuration } from '@components/shared/set-duration/set-duration'
import { UploadFilesInput } from '@components/shared/upload-files-input'
import { UserLink } from '@components/user/user-link'

import { calcNumberMinusPercent } from '@utils/calculation'
import { checkIsPositiveNummberAndNoMoreNCharactersAfterDot } from '@utils/checks'
import { formatNormDateTime } from '@utils/date-time'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './create-or-edit-proposal-content.style'

export const CreateOrEditProposalContent = ({
  onCreateSubmit,
  onEditSubmit,
  request,
  showProgress,
  progressValue,
  proposalToEdit,
  onClickBackBtn,
}) => {
  const { classes: classNames } = useClassNames()

  const [images, setImages] = useState(
    proposalToEdit?.linksToMediaFiles.length ? proposalToEdit?.linksToMediaFiles : [],
  )

  const newProductPrice =
    calcNumberMinusPercent(request?.request?.priceAmazon, request?.request?.cashBackInPercent) || null

  const sourceFormFields = {
    price: proposalToEdit?.price || request?.request.price,
    execution_time: proposalToEdit?.execution_time || '',
    comment: proposalToEdit?.comment || '',
    linksToMediaFiles: proposalToEdit?.linksToMediaFiles.length ? proposalToEdit?.linksToMediaFiles : [],
    title: proposalToEdit?.title || '',
  }

  const [formFields, setFormFields] = useState(sourceFormFields)

  const [checked, setChecked] = useState(false)

  const onChangeField = fieldName => event => {
    const newFormFields = { ...formFields }
    if (['execution_time'].includes(fieldName)) {
      newFormFields[fieldName] = Number(event) || ''
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

  const onClickCreateSubmit = () => {
    onCreateSubmit(formFields, images)
  }

  const onClickEditSubmit = () => {
    onEditSubmit(formFields, images)
  }


  const disableSubmit =
    !formFields.title ||
    !formFields.execution_time ||
    !formFields.comment ||
    formFields.comment.length > 2000 ||
    +formFields.price <= 0 ||
    (JSON.stringify(sourceFormFields) === JSON.stringify(formFields) && !images.length)

  return (
    <div className={classNames.mainWrapper}>
      <div className={classNames.adviceWrapper}>
        <Typography className={classNames.adviceTitle}>
          {t(TranslationKey['Offering a Service to the Client:'])}
        </Typography>

        <List>
          <ListItem className={classNames.adviceListItem}>
            <CircleIcon color="primary" classes={{ root: classNames.listItemDot }} />

            <ListItemText className={classNames.adviceListItemText}>
              {t(TranslationKey['Specify exactly how you are going to perform this task. Describe the key points.'])}
            </ListItemText>
          </ListItem>
          <ListItem className={classNames.adviceListItem}>
            <CircleIcon color="primary" classes={{ root: classNames.listItemDot }} />

            <ListItemText className={classNames.adviceListItemText}>
              {t(TranslationKey['Compose unique feedback that shows your competence and interest in the project.'])}
            </ListItemText>
          </ListItem>
          <ListItem className={classNames.adviceListItem}>
            <CircleIcon color="primary" classes={{ root: classNames.listItemDot }} />

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
                userId={request?.request?.createdBy?._id}
              />
              <div className={classNames.ratingWrapper}>
                <Rating readOnly value={request?.request.createdBy?.rating || request.createdBy?.rating} />
              </div>
            </div>
          </div>

          <Typography className={classNames.subTitle}>
            {t(TranslationKey['The number of total successful transactions:']) + ' 0'}
          </Typography>

          <div className={classNames.infoBlockWrapper}>
            <div className={classNames.infoCellWrapper}>
              <Typography className={classNames.requestTitleName}>{t(TranslationKey['Request title'])}</Typography>
              <Typography className={classNames.requestTitle}>{request.request.title}</Typography>
            </div>

            <div className={classNames.infoCellWrapper}>
              <Typography className={cx(classNames.requestTitleName)}>{t(TranslationKey.ID)}</Typography>
              <Typography className={classNames.requestTitle}>{request.request.humanFriendlyId}</Typography>
            </div>

            <div className={cx(classNames.infoCellWrapper, classNames.lastInfoCellWrapper)}>
              <Typography className={classNames.requestTitleName}>{t(TranslationKey['Request type'])}</Typography>
              <Typography className={cx(classNames.requestTitle, classNames.requestInfoText)}>
                {freelanceRequestTypeTranslate(freelanceRequestTypeByCode[request.request.typeTask])}
              </Typography>
            </div>
          </div>

          {request?.details.conditions && (
            <>
              <Typography className={classNames.requestTitleName}>
                {t(TranslationKey['Request description'])}
              </Typography>
              {/* <Typography className={classNames.requestTitle}>{request?.details.conditions}</Typography> */}
              <CustomTextEditor
                readOnly
                conditions={request?.details.conditions}
                editorMaxHeight={classNames.editorMaxHeight}
              />
            </>
          )}

          <Typography className={classNames.subTitle}>{` ${'0'} ${t(TranslationKey['out of'])} ${
            request?.request.maxAmountOfProposals || request.maxAmountOfProposals
          } ${t(TranslationKey['suggestions left'])}`}</Typography>

          <div className={classNames.requestTitleAndInfo}>
            <div className={cx(classNames.blockInfoWrapper)}>
              <div className={classNames.blockInfoCell}>
                <Typography className={classNames.blockInfoCellTitle}>{t(TranslationKey['Request price'])}</Typography>
                <Typography className={cx(classNames.price, classNames.blockInfoCellText)}>
                  {toFixed(request?.request.price, 2) + '$'}
                </Typography>
              </div>

              {newProductPrice || request?.request?.priceAmazon ? (
                <div className={classNames.blockInfoCell}>
                  <Typography className={classNames.blockInfoCellTitle}>
                    {t(TranslationKey['Product price'])}
                  </Typography>
                  <div className={classNames.pricesWrapper}>
                    {newProductPrice && (
                      <Typography
                        className={cx(classNames.blockInfoCellText, { [classNames.newPrice]: newProductPrice })}
                      >
                        {'$ ' + toFixed(newProductPrice, 2)}
                      </Typography>
                    )}

                    <Typography
                      className={cx(classNames.blockInfoCellText, {
                        [classNames.oldPrice]: newProductPrice,
                      })}
                    >
                      {'$ ' + toFixed(request?.request?.priceAmazon, 2)}
                    </Typography>
                  </div>
                </div>
              ) : null}
            </div>

            <div className={cx(classNames.blockInfoWrapper)}>
              <div className={cx(classNames.blockInfoCell, classNames.blockInfoWrapperlast)}>
                <Typography className={classNames.blockInfoCellTitle}>
                  {t(TranslationKey['Performance time'])}
                </Typography>
                <Typography className={cx(classNames.blockInfoCellText)}>
                  {formatNormDateTime(request?.request.timeoutAt)}
                </Typography>
              </div>

              {request?.request?.cashBackInPercent ? (
                <div className={cx(classNames.blockInfoCell, classNames.blockInfoWrapperlast)}>
                  <Typography className={classNames.blockInfoCellTitle}>{t(TranslationKey.CashBack)}</Typography>
                  <Typography className={cx(classNames.blockInfoCellText)}>
                    {toFixed(request?.request?.cashBackInPercent, 2) + ' %'}
                  </Typography>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {request.details.linksToMediaFiles?.length > 0 ? (
          <Field
            label={t(TranslationKey.Files)}
            inputComponent={<PhotoAndFilesCarousel small files={request.details.linksToMediaFiles} width="400px" />}
          />
        ) : null}
      </div>

      <div className={classNames.mainRightWrapper}>
        <div className={classNames.middleWrapper}>
          <div className={classNames.descriptionFieldWrapper}>
            <div className={classNames.nameFieldWrapper}>
              <Field
                className={classNames.nameField}
                labelClasses={classNames.spanLabel}
                inputProps={{ maxLength: 100 }}
                label={t(TranslationKey['Proposal Name*'])}
                value={formFields.title}
                onChange={onChangeField('title')}
              />
              {/* <span className={cx(classNames.standartText, {[classNames.error]: formFields.title.length > 80})}>{`${
                formFields.title.length
              } ${t(TranslationKey.of)} 80 ${t(TranslationKey.characters)}`}</span> */}
            </div>

            <div className={classNames.descriptionWrapper}>
              <Field
                multiline
                className={classNames.descriptionField}
                containerClasses={classNames.conrainer}
                labelClasses={classNames.spanLabel}
                inputProps={{ maxLength: 2100 }}
                minRows={9}
                maxRows={9}
                label={t(TranslationKey['Describe your proposal'])}
                value={formFields.comment}
                onChange={onChangeField('comment')}
              />
              <span
                className={cx(classNames.standartText, { [classNames.error]: formFields.comment.length > 2000 })}
              >{`${formFields.comment.length} ${t(TranslationKey.of)} 2000 ${t(TranslationKey.characters)}`}</span>
            </div>

            <div className={classNames.imageFileInputWrapper}>
              <div className={classNames.inputTitleWrapper}>
                <Typography className={classNames.imageFileInputTitle}>{t(TranslationKey['Attach a file'])}</Typography>

                <Typography className={classNames.imageFileInputSubTitle}>
                  {`(${t(TranslationKey['link to your portfolio, examples of work'])})`}
                </Typography>
              </div>

              <UploadFilesInput
                minimized
                withoutTitle
                requestWidth
                images={images}
                setImages={setImages}
                maxNumber={50}
              />
              {/* <PhotoAndFilesCarousel small files={formFields.linksToMediaFiles} /> */}
            </div>
          </div>
        </div>

        <div className={classNames.footerWrapper}>
          <SetDuration
            title={t(TranslationKey['Time to complete']) + '*'}
            duration={formFields.execution_time}
            titleStyle={classNames.titleStyle}
            setTotalTimeInMinute={onChangeField('execution_time')}
          />

          <div className={classNames.buttonsWrapper}>
            <Button
              success
              disabled={disableSubmit}
              className={classNames.successBtn}
              onClick={proposalToEdit ? onClickEditSubmit : onClickCreateSubmit}
            >
              {proposalToEdit ? t(TranslationKey.Edit) : t(TranslationKey.Suggest)}
            </Button>

            <Button variant="contained" color="primary" className={classNames.backBtn} onClick={onClickBackBtn}>
              {t(TranslationKey.Back)}
            </Button>
          </div>
        </div>
      </div>

      {showProgress && <CircularProgressWithLabel value={progressValue} title="Загрузка фотографий..." />}
    </div>
  )
}
