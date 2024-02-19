import { nanoid } from 'nanoid'
import { memo, useState } from 'react'

import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import { Checkbox, Link, Typography } from '@mui/material'

import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ImageModal } from '@components/modals/image-modal/image-modal'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value'
import { Field } from '@components/shared/field'
import { SetDuration } from '@components/shared/set-duration/set-duration'
import { DownloadArchiveIcon } from '@components/shared/svg-icons'

import { reversedFormatDateWithoutTime } from '@utils/date-time'
import { checkAndMakeAbsoluteUrl, minsToTime } from '@utils/text'
import { t } from '@utils/translations'
import { downloadArchive, downloadFile, downloadFileByLink } from '@utils/upload-files'

import { ButtonVariant } from '@typings/types/button.type'

import { useStyles } from './request-designer-result-client-form.style'

import { Slot } from './slot/slot'

export const RequestDesignerResultClientForm = memo(props => {
  const {
    onClickProposalResultAccept,
    onPressSubmitDesignerResultToCorrect,
    request,
    setOpenModal,
    proposal,
    userInfo,
    curResultMedia,
    onlyRead,
  } = props
  const { classes: styles, cx } = useStyles()

  const isNotClient =
    userInfo._id !== request?.request?.createdBy?._id && userInfo.masterUser?._id !== request?.request?.createdBy?._id

  const proposalIsAccepted = [
    RequestProposalStatus.ACCEPTED_BY_CLIENT,
    RequestProposalStatus.ACCEPTED_BY_CREATOR_OF_REQUEST,
    RequestProposalStatus.ACCEPTED_BY_SUPERVISOR,
  ].includes(proposal?.proposal?.status)

  const noShowActions = isNotClient || proposalIsAccepted || onlyRead

  const [showImageModal, setShowImageModal] = useState(false)

  const [curImageIndex, setCurImageIndex] = useState(0)

  const [comment, setComment] = useState('')

  const [imagesForDownload, setImagesForDownload] = useState([])

  const mediaToShow = curResultMedia?.length ? curResultMedia : proposal.proposal.media

  const sourceImagesData = mediaToShow.map(el => ({
    image: el.fileLink,
    comment: el.commentByPerformer,
    commentByClient: el.commentByClient,
    isEditCommentOpen: false,
    _id: el._id ?? nanoid(),
  }))

  const [imagesData, setImagesData] = useState(sourceImagesData)

  const onChangeImageFileds = (field, imageId) => event => {
    const findImage = { ...imagesData.find(el => el._id === imageId) }

    findImage[field] = event.target.value

    setImagesData(() => imagesData.map(el => (el._id === imageId ? findImage : el)))
  }

  const onClickCommentBtn = imageId => {
    const findImage = { ...imagesData.find(el => el._id === imageId) }

    findImage.isEditCommentOpen = !findImage.isEditCommentOpen

    setImagesData(() => imagesData.map(el => (el._id === imageId ? findImage : el)))
  }

  const onClickAddDownload = item => {
    if (imagesForDownload.some(el => el._id === item._id)) {
      setImagesForDownload(() => imagesForDownload.filter(el => el._id !== item._id))
    } else {
      setImagesForDownload(() => [...imagesForDownload, item])
    }
  }

  const onClickAllAddDownload = () => {
    if (imagesForDownload.length) {
      setImagesForDownload(() => [])
    } else {
      setImagesForDownload(() => imagesData)
    }
  }

  const onClickAllDownload = () => {
    imagesForDownload.forEach(el =>
      typeof el.image === 'string' ? downloadFileByLink(el.image) : downloadFile(el.image.file),
    )
  }

  const sourceFormFields = {
    execution_time: '',
  }

  const [formFields, setFormFields] = useState(sourceFormFields)

  const onChangeField = fieldName => event => {
    const newFormFields = { ...formFields }
    if (['execution_time'].includes(fieldName)) {
      newFormFields[fieldName] = Number(event) || ''
    }

    setFormFields(newFormFields)
  }

  const [archiveButtonInactiveBeforeDownloading, setArchiveButtonInactiveBeforeDownloading] = useState(false)

  const onClickDownloadArchive = async () => {
    setArchiveButtonInactiveBeforeDownloading(true) // turn off the button until the files start downloading
    await downloadArchive(
      imagesForDownload,
      `${reversedFormatDateWithoutTime(new Date(), true)}_${request?.request?.title?.replaceAll(' ', '_')}`,
    )
    setArchiveButtonInactiveBeforeDownloading(false)
  }

  /* const filteredImagesData = imagesData.filter(el =>
    checkIsMediaFileLink(typeof el.image === 'string' ? el.image : el.image?.file.name),
  ) */
  const fileLinks = imagesData.map(el => el.image)
  const photosTitles = imagesData.map(el => el.comment)
  const photosComments = imagesData.map(el => el.commentByClient)

  return (
    <div className={styles.modalMainWrapper}>
      <div className={styles.headerWrapper}>
        <Typography className={styles.headerLabel}>{`${t(TranslationKey['Request result'])} / ID ${
          request?.request?.humanFriendlyId
        }`}</Typography>

        <div className={styles.headerRightSubWrapper}>
          <Field
            labelClasses={styles.fieldLabel}
            label={t(TranslationKey['Source Files'])}
            containerClasses={styles.containerField}
            inputComponent={
              proposal?.proposal?.sourceFiles?.[0]?.sourceFile ? (
                <div className={styles.viewLinkWrapper}>
                  <Link href={checkAndMakeAbsoluteUrl(proposal.proposal.sourceFiles?.[0]?.sourceFile)} target="_blank">
                    {t(TranslationKey.View)}
                  </Link>
                  <CopyValue text={proposal.proposal.sourceFiles?.[0]?.sourceFile} />
                </div>
              ) : (
                <div className={styles.shippingLabelWrapper}>
                  <Typography className={styles.miss}>{t(TranslationKey['Not available'])}</Typography>
                </div>
              )
            }
          />

          <Field
            labelClasses={styles.fieldLabel}
            label={t(TranslationKey['Time to check'])}
            containerClasses={styles.containerField}
            inputComponent={<Typography className={styles.simpleSpan}>{minsToTime(1440)}</Typography>}
          />
          <Field
            labelClasses={styles.fieldLabel}
            label={t(TranslationKey['Number of illustrations'])}
            containerClasses={styles.containerField}
            inputComponent={<Typography className={styles.simpleSpan}>{mediaToShow.length}</Typography>}
          />
          <Field
            labelClasses={styles.fieldLabel}
            label={'ASIN'}
            containerClasses={styles.containerField}
            inputComponent={
              <AsinOrSkuLink
                withCopyValue
                link={request?.request?.product?.asin || proposal?.request?.asin}
                textStyles={styles.simpleSpan}
              />
            }
          />
        </div>
      </div>

      <div className={styles.bodyWrapper}>
        {imagesData.map((item, index) => (
          <Slot
            key={item._id}
            item={item}
            noShowActions={noShowActions}
            showImageModal={showImageModal}
            setShowImageModal={setShowImageModal}
            index={index}
            setCurImageIndex={setCurImageIndex}
            imagesForDownload={imagesForDownload}
            onClickAddDownload={onClickAddDownload}
            onChangeImageFileds={onChangeImageFileds}
            onClickCommentBtn={onClickCommentBtn}
          />
        ))}
      </div>

      <div className={styles.footerWrapper}>
        {!noShowActions && (
          <>
            <Field
              multiline
              className={styles.heightFieldAuto}
              labelClasses={styles.fieldLabel}
              containerClasses={styles.fieldRemarks}
              inputProps={{ maxLength: 1000 }}
              minRows={3}
              maxRows={3}
              placeholder={t(TranslationKey['Enter remarks'])}
              label={t(TranslationKey.Remarks)}
              value={comment}
              onChange={e => setComment(e.target.value)}
            />

            <Field
              labelClasses={styles.fieldLabel}
              label={t(TranslationKey['Time for rework'])}
              containerClasses={styles.field}
              inputComponent={
                <SetDuration
                  duration={formFields.execution_time}
                  setTotalTimeInMinute={onChangeField('execution_time')}
                />
              }
            />
          </>
        )}

        <div className={styles.downloadsWrapper}>
          <div className={styles.downloadsCheckWrapper} onClick={onClickAllAddDownload}>
            <Checkbox color="primary" checked={imagesForDownload.length === imagesData.length} />
            <Typography>{t(TranslationKey['Select all'])}</Typography>
          </div>

          <Button disabled={!imagesForDownload.length} className={styles.imagesModalBtn} onClick={onClickAllDownload}>
            <DownloadOutlinedIcon />
          </Button>

          <Button
            disabled={!imagesForDownload.length || archiveButtonInactiveBeforeDownloading}
            className={styles.imagesModalBtn}
            onClick={onClickDownloadArchive}
          >
            <DownloadArchiveIcon />
          </Button>
        </div>

        {!noShowActions && (
          <>
            <Button
              className={styles.button}
              onClick={() =>
                onPressSubmitDesignerResultToCorrect({
                  reason: comment,
                  timeLimitInMinutes: formFields.execution_time,
                  imagesData,
                })
              }
            >
              {t(TranslationKey['Send in for rework'])}
            </Button>
            <Button
              success
              className={styles.button}
              onClick={() => {
                onClickProposalResultAccept(proposal.proposal._id)
                setOpenModal()
              }}
            >
              {t(TranslationKey.Accept)}
            </Button>
          </>
        )}

        <Button
          variant={ButtonVariant.OUTLINED}
          className={cx(styles.button, styles.cancelButton)}
          onClick={setOpenModal}
        >
          {t(TranslationKey.Cancel)}
        </Button>
      </div>

      {showImageModal && (
        <ImageModal
          showPreviews
          isRequestResult
          isOpenModal={showImageModal}
          files={fileLinks}
          photosTitles={photosTitles}
          photosComments={photosComments}
          currentFileIndex={curImageIndex}
          onOpenModal={() => setShowImageModal(!showImageModal)}
          onCurrentFileIndex={index => setCurImageIndex(index)}
        />
      )}
    </div>
  )
})
