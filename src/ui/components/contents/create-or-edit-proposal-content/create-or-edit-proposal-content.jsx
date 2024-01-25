import { memo, useEffect, useState } from 'react'

import CircleIcon from '@mui/icons-material/Circle'
import { Avatar, Link, List, ListItem, ListItemText, Rating, Typography } from '@mui/material'

import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CustomTextEditor } from '@components/shared/custom-text-editor'
import { Field } from '@components/shared/field'
import { PhotoAndFilesCarousel } from '@components/shared/photo-and-files-carousel'
import { SetDuration } from '@components/shared/set-duration'
import { UploadFilesInput } from '@components/shared/upload-files-input'
import { UserLink } from '@components/user/user-link'

import { calcNumberMinusPercent } from '@utils/calculation'
import { checkIsPositiveNummberAndNoMoreNCharactersAfterDot } from '@utils/checks'
import { formatNormDateTime } from '@utils/date-time'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './create-or-edit-proposal-content.style'

export const CreateOrEditProposalContent = memo(props => {
  const { onCreateSubmit, onEditSubmit, request, showProgress, progressValue, proposalToEdit, onClickBackBtn } = props
  const { classes: styles, cx } = useStyles()

  const [images, setImages] = useState([])

  useEffect(() => {
    if (proposalToEdit?.linksToMediaFiles?.length) {
      setImages(proposalToEdit?.linksToMediaFiles)
    }
  }, [proposalToEdit?.linksToMediaFiles])

  const newProductPrice =
    calcNumberMinusPercent(request?.request?.priceAmazon, request?.request?.cashBackInPercent) || null

  const getSourceFormFields = () => ({
    price: proposalToEdit?.price || request?.request?.price,
    execution_time: proposalToEdit?.execution_time || '',
    comment: proposalToEdit?.comment || '',
    linksToMediaFiles: proposalToEdit?.linksToMediaFiles?.length ? proposalToEdit?.linksToMediaFiles : [],
    title: proposalToEdit?.title || '',
  })

  const [formFields, setFormFields] = useState(getSourceFormFields())

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

  useEffect(() => {
    setFormFields(getSourceFormFields())
  }, [proposalToEdit, request])

  const disableSubmit =
    !formFields.title ||
    !formFields.execution_time ||
    !formFields.comment ||
    formFields.comment.length > 2000 ||
    +formFields.price <= 0 ||
    (JSON.stringify(getSourceFormFields()) === JSON.stringify(formFields) && !images.length)

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.adviceWrapper}>
        <Typography className={styles.adviceTitle}>{t(TranslationKey['Offering a Service to the Client:'])}</Typography>

        <List>
          <ListItem className={styles.adviceListItem}>
            <CircleIcon color="primary" classes={{ root: styles.listItemDot }} />

            <ListItemText className={styles.adviceListItemText}>
              {t(TranslationKey['Specify exactly how you are going to perform this task. Describe the key points.'])}
            </ListItemText>
          </ListItem>
          <ListItem className={styles.adviceListItem}>
            <CircleIcon color="primary" classes={{ root: styles.listItemDot }} />

            <ListItemText className={styles.adviceListItemText}>
              {t(TranslationKey['Compose unique feedback that shows your competence and interest in the project.'])}
            </ListItemText>
          </ListItem>
          <ListItem className={styles.adviceListItem}>
            <CircleIcon color="primary" classes={{ root: styles.listItemDot }} />

            <ListItemText className={styles.adviceListItemText}>
              {t(
                TranslationKey[
                  'Try to research market prices and make your offer based on the amount of work and your skills.'
                ],
              )}
            </ListItemText>
          </ListItem>
        </List>
        <div className={styles.trainingTextWrapper}>
          <Typography className={styles.trainingText}>
            {t(TranslationKey['You can also take a free'])}
            <Link className={styles.trainingLink}>{t(TranslationKey.Training)}</Link>
            {t(TranslationKey['on our freelance exchange.'])}
          </Typography>
        </div>
      </div>
      <div className={styles.mainLeftWrapper}>
        <div className={styles.clientInfoWrapper}>
          <div className={styles.clientInfo}>
            <Avatar
              src={getUserAvatarSrc(request?.request?.createdById || request?.createdById)}
              className={styles.userPhoto}
            />
            <div>
              <UserLink
                blackText
                name={request?.request?.createdBy?.name || request?.createdBy?.name}
                userId={request?.request?.createdBy?._id}
              />
              <div className={styles.ratingWrapper}>
                <Rating readOnly value={request?.request?.createdBy?.rating || request?.createdBy?.rating || 0} />
              </div>
            </div>
          </div>

          <Typography className={styles.subTitle}>
            {t(TranslationKey['The number of total successful transactions:']) + ' 0'}
          </Typography>

          <div className={styles.infoBlockWrapper}>
            <div className={styles.infoCellWrapper}>
              <Typography className={styles.requestTitleName}>{t(TranslationKey['Request title'])}</Typography>
              <Typography className={styles.requestTitle}>{request?.request?.title}</Typography>
            </div>

            <div className={styles.infoCellWrapper}>
              <Typography className={cx(styles.requestTitleName)}>{t(TranslationKey.ID)}</Typography>
              <Typography className={styles.requestTitle}>{request?.request?.humanFriendlyId}</Typography>
            </div>

            <div className={cx(styles.infoCellWrapper, styles.lastInfoCellWrapper)}>
              <Typography className={styles.requestTitleName}>{t(TranslationKey['Request type'])}</Typography>
              <Typography className={styles.requestTitle}>
                {freelanceRequestTypeTranslate(freelanceRequestTypeByCode[request?.request?.specType])}
              </Typography>
            </div>
          </div>

          {request?.details.conditions && (
            <>
              <Typography className={styles.requestTitleName}>{t(TranslationKey['Request description'])}</Typography>
              {/* <Typography className={styles.requestTitle}>{request?.details.conditions}</Typography> */}
              <CustomTextEditor readOnly value={request?.details.conditions} editorClassName={styles.editorClassName} />
            </>
          )}

          {/* <Typography className={styles.subTitle}>{` ${'0'} ${t(TranslationKey['out of'])} ${*/}
          {/*  request?.request?.maxAmountOfProposals || request?.maxAmountOfProposals*/}
          {/* } ${t(TranslationKey['suggestions left'])}`}</Typography>*/}
          <Typography className={styles.subTitle} />

          <div className={styles.requestTitleAndInfo}>
            <div className={cx(styles.blockInfoWrapper)}>
              <div className={styles.blockInfoCell}>
                <Typography className={styles.blockInfoCellTitle}>{t(TranslationKey['Request price'])}</Typography>
                <Typography className={cx(styles.price, styles.blockInfoCellText)}>
                  {toFixed(request?.request?.price, 2) + '$'}
                </Typography>
              </div>

              {newProductPrice || request?.request?.priceAmazon ? (
                <div className={styles.blockInfoCell}>
                  <Typography className={styles.blockInfoCellTitle}>{t(TranslationKey['Product price'])}</Typography>
                  <div className={styles.pricesWrapper}>
                    {newProductPrice && (
                      <Typography className={cx(styles.blockInfoCellText, { [styles.newPrice]: newProductPrice })}>
                        {'$ ' + toFixed(newProductPrice, 2)}
                      </Typography>
                    )}

                    <Typography
                      className={cx(styles.blockInfoCellText, {
                        [styles.oldPrice]: newProductPrice,
                      })}
                    >
                      {'$ ' + toFixed(request?.request?.priceAmazon, 2)}
                    </Typography>
                  </div>
                </div>
              ) : null}
            </div>

            <div className={cx(styles.blockInfoWrapper)}>
              <div className={cx(styles.blockInfoCell, styles.blockInfoWrapperlast)}>
                <Typography className={styles.blockInfoCellTitle}>{t(TranslationKey['Performance time'])}</Typography>
                <Typography className={cx(styles.blockInfoCellText)}>
                  {formatNormDateTime(request?.request?.timeoutAt)}
                </Typography>
              </div>

              {request?.request?.cashBackInPercent ? (
                <div className={cx(styles.blockInfoCell, styles.blockInfoWrapperlast)}>
                  <Typography className={styles.blockInfoCellTitle}>{t(TranslationKey.CashBack)}</Typography>
                  <Typography className={cx(styles.blockInfoCellText)}>
                    {toFixed(request?.request?.cashBackInPercent, 2) + ' %'}
                  </Typography>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {request?.details?.linksToMediaFiles?.length > 0 ? (
          <Field
            label={t(TranslationKey.Files)}
            inputComponent={<PhotoAndFilesCarousel small files={request?.details?.linksToMediaFiles} width="400px" />}
          />
        ) : null}
      </div>

      <div className={styles.mainRightWrapper}>
        <div className={styles.middleWrapper}>
          <div className={styles.descriptionFieldWrapper}>
            <div className={styles.nameFieldWrapper}>
              <Field
                className={styles.nameField}
                labelClasses={styles.spanLabel}
                inputProps={{ maxLength: 100 }}
                label={t(TranslationKey['Proposal Name*'])}
                value={formFields.title}
                onChange={onChangeField('title')}
              />
              {/* <span className={cx(styles.standartText, {[styles.error]: formFields.title.length > 80})}>{`${
                formFields.title.length
              } ${t(TranslationKey.of)} 80 ${t(TranslationKey.characters)}`}</span> */}
            </div>

            <div className={styles.descriptionWrapper}>
              <Field
                multiline
                className={styles.descriptionField}
                containerClasses={styles.conrainer}
                labelClasses={styles.spanLabel}
                inputProps={{ maxLength: 2100 }}
                minRows={9}
                maxRows={9}
                label={t(TranslationKey['Describe your proposal'])}
                value={formFields.comment}
                onChange={onChangeField('comment')}
              />
              <span className={cx(styles.standartText, { [styles.error]: formFields.comment.length > 2000 })}>{`${
                formFields.comment.length
              } ${t(TranslationKey.of)} 2000 ${t(TranslationKey.characters)}`}</span>
            </div>

            <div className={styles.imageFileInputWrapper}>
              <div className={styles.inputTitleWrapper}>
                <Typography className={styles.imageFileInputTitle}>{t(TranslationKey['Attach a file'])}</Typography>

                <Typography className={styles.imageFileInputSubTitle}>
                  {`(${t(TranslationKey['link to your portfolio, examples of work'])})`}
                </Typography>
              </div>

              <UploadFilesInput minimized withoutTitle fullWidth images={images} setImages={setImages} maxNumber={50} />
            </div>
          </div>
        </div>

        <div className={styles.footerWrapper}>
          <SetDuration
            title={t(TranslationKey['Time to complete']) + '*'}
            duration={formFields.execution_time}
            titleStyle={styles.titleStyle}
            setTotalTimeInMinute={onChangeField('execution_time')}
          />

          <div className={styles.buttonsWrapper}>
            <Button
              success
              disabled={disableSubmit}
              className={styles.successBtn}
              onClick={proposalToEdit ? onClickEditSubmit : onClickCreateSubmit}
            >
              {proposalToEdit ? t(TranslationKey.Edit) : t(TranslationKey.Suggest)}
            </Button>

            <Button variant="contained" color="primary" className={styles.backBtn} onClick={onClickBackBtn}>
              {t(TranslationKey.Back)}
            </Button>
          </div>
        </div>
      </div>

      {showProgress && <CircularProgressWithLabel value={progressValue} title="Загрузка фотографий..." />}
    </div>
  )
})
