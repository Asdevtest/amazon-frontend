import { Avatar } from 'antd'
import isEqual from 'lodash.isequal'
import { memo, useEffect, useState } from 'react'
import { FaCircle } from 'react-icons/fa'

import { Link, List, ListItem, ListItemText, Rating } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CustomTextEditor } from '@components/shared/custom-text-editor'
import { Field } from '@components/shared/field'
import { SetDuration } from '@components/shared/set-duration'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { UploadFilesInput } from '@components/shared/upload-files-input'
import { UserLink } from '@components/user/user-link'

import { calcNumberMinusPercent } from '@utils/calculation'
import { checkIsPositiveNummberAndNoMoreNCharactersAfterDot } from '@utils/checks'
import { formatNormDateTime } from '@utils/date-time'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

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
    (isEqual(getSourceFormFields(), formFields) && isEqual(proposalToEdit?.linksToMediaFiles, images))

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.adviceWrapper}>
        <p className={styles.adviceTitle}>{t(TranslationKey['Offering a Service to the Client:'])}</p>

        <List>
          <ListItem className={styles.adviceListItem}>
            <FaCircle size={8} className={styles.listItemDot} />

            <ListItemText className={styles.adviceListItemText}>
              {t(TranslationKey['Specify exactly how you are going to perform this task. Describe the key points.'])}
            </ListItemText>
          </ListItem>
          <ListItem className={styles.adviceListItem}>
            <FaCircle size={8} className={styles.listItemDot} />

            <ListItemText className={styles.adviceListItemText}>
              {t(TranslationKey['Compose unique feedback that shows your competence and interest in the project.'])}
            </ListItemText>
          </ListItem>
          <ListItem className={styles.adviceListItem}>
            <FaCircle size={8} className={styles.listItemDot} />

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
          <p className={styles.trainingText}>
            {t(TranslationKey['You can also take a free'])}
            <Link className={styles.trainingLink}>{t(TranslationKey.Training)}</Link>
            {t(TranslationKey['on our freelance exchange.'])}
          </p>
        </div>
      </div>

      <div className={styles.mainLeftWrapper}>
        <div className={styles.clientInfo}>
          <Avatar
            src={getUserAvatarSrc(request?.request?.createdById || request?.createdById)}
            className={styles.userPhoto}
          />

          <div>
            <UserLink
              blackText
              maxNameWidth={200}
              name={request?.request?.createdBy?.name || request?.createdBy?.name}
              userId={request?.request?.createdBy?._id}
            />

            <Rating
              readOnly
              size="small"
              value={request?.request?.createdBy?.rating || request?.createdBy?.rating || 0}
            />
          </div>
        </div>

        <p className={styles.subTitle}>{t(TranslationKey['The number of total successful transactions:']) + ' 0'}</p>

        <div className={styles.infoBlockWrapper}>
          <div className={styles.infoCellWrapper}>
            <p className={styles.requestTitleName}>{t(TranslationKey['Request title'])}</p>
            <p className={styles.requestTitle}>{request?.request?.title}</p>
          </div>

          <div className={styles.infoCellWrapper}>
            <p className={styles.requestTitleName}>{t(TranslationKey.ID)}</p>
            <p>{request?.request?.humanFriendlyId}</p>
          </div>

          <div className={cx(styles.infoCellWrapper, styles.lastInfoCellWrapper)}>
            <p className={styles.requestTitleName}>{t(TranslationKey['Request type'])}</p>
            <p>{request?.request?.spec?.title}</p>
          </div>
        </div>

        {request?.details.conditions && (
          <>
            <p className={styles.requestTitleName}>{t(TranslationKey['Request description'])}</p>
            <CustomTextEditor
              readOnly
              value={request?.details.conditions}
              editorClassName={styles.editor}
              editorWrapperClassName={styles.editorWrapper}
            />
          </>
        )}

        <div className={styles.infoBlockWrapper}>
          <div className={styles.infoCellWrapper}>
            <p className={styles.requestTitleName}>{t(TranslationKey['Request price'])}</p>
            <p>{toFixed(request?.request?.price, 2) + '$'}</p>
          </div>

          {newProductPrice || request?.request?.priceAmazon ? (
            <div className={styles.infoCellWrapper}>
              <p className={styles.requestTitleName}>{t(TranslationKey['Product price'])}</p>
              <div className={styles.pricesWrapper}>
                {newProductPrice && (
                  <p className={cx({ [styles.newPrice]: newProductPrice })}>{'$ ' + toFixed(newProductPrice, 2)}</p>
                )}
                <p
                  className={cx({
                    [styles.oldPrice]: newProductPrice,
                  })}
                >
                  {'$ ' + toFixed(request?.request?.priceAmazon, 2)}
                </p>
              </div>
            </div>
          ) : null}

          <div className={styles.infoCellWrapper}>
            <p className={styles.requestTitleName}>{t(TranslationKey['Performance time'])}</p>
            <p>{formatNormDateTime(request?.request?.timeoutAt)}</p>
          </div>

          {request?.request?.cashBackInPercent ? (
            <div className={styles.infoCellWrapper}>
              <p className={styles.requestTitleName}>{t(TranslationKey.CashBack)}</p>
              <p>{toFixed(request?.request?.cashBackInPercent, 2) + ' %'}</p>
            </div>
          ) : null}
        </div>

        <SlideshowGallery slidesToShow={2} files={request?.request?.media || []} />
      </div>

      <div className={styles.mainRightWrapper}>
        <div className={styles.proposalContainer}>
          <Field
            className={styles.nameField}
            labelClasses={styles.spanLabel}
            inputProps={{ maxLength: 100 }}
            label={t(TranslationKey['Proposal Name*'])}
            value={formFields.title}
            onChange={onChangeField('title')}
          />

          <SetDuration
            title={t(TranslationKey['Time to complete']) + '*'}
            duration={formFields.execution_time}
            titleStyle={styles.titleStyle}
            setTotalTimeInMinute={onChangeField('execution_time')}
          />
        </div>

        <div className={styles.descriptionWrapper}>
          <Field
            multiline
            className={styles.descriptionField}
            containerClasses={styles.descriptionConrainer}
            labelClasses={styles.spanLabel}
            inputProps={{ maxLength: 2000 }}
            minRows={7}
            maxRows={7}
            label={t(TranslationKey['Describe your proposal'])}
            value={formFields.comment}
            onChange={onChangeField('comment')}
          />
          <span className={cx(styles.standartText, { [styles.error]: formFields.comment.length > 2000 })}>{`${
            formFields.comment.length
          } ${t(TranslationKey.of)} 2000 ${t(TranslationKey.characters)}`}</span>
        </div>

        <div className={styles.inputTitleWrapper}>
          <p className={styles.imageFileInputTitle}>{t(TranslationKey['Attach a file'])}</p>
          <p className={styles.spanLabel}>{`(${t(TranslationKey['link to your portfolio, examples of work'])})`}</p>
        </div>

        <UploadFilesInput minimized withoutTitles images={images} setImages={setImages} />

        <div className={styles.footerWrapper}>
          <Button
            styleType={ButtonStyle.SUCCESS}
            disabled={disableSubmit}
            onClick={proposalToEdit ? onClickEditSubmit : onClickCreateSubmit}
          >
            {proposalToEdit ? t(TranslationKey.Edit) : t(TranslationKey.Suggest)}
          </Button>

          <Button onClick={onClickBackBtn}>{t(TranslationKey.Back)}</Button>
        </div>
      </div>

      {showProgress && <CircularProgressWithLabel value={progressValue} title={t(TranslationKey['Uploading...'])} />}
    </div>
  )
})
