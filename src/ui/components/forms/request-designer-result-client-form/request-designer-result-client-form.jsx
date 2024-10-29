import { memo, useState } from 'react'
import { MdOutlineDownload } from 'react-icons/md'

import { Checkbox, Link } from '@mui/material'

import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { SlideshowGalleryModal } from '@components/modals/slideshow-gallery-modal'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { CopyValue } from '@components/shared/copy-value'
import { CustomButton } from '@components/shared/custom-button'
import { Field } from '@components/shared/field'
import { SetDuration } from '@components/shared/set-duration/set-duration'
import { DownloadArchiveIcon } from '@components/shared/svg-icons'

import { reversedFormatDateWithoutTime } from '@utils/date-time'
import { checkAndMakeAbsoluteUrl, minsToTime } from '@utils/text'
import { t } from '@utils/translations'
import { downloadArchive, downloadFile, downloadFileByLink } from '@utils/upload-files'

import '@typings/enums/button-style'
import { isString } from '@typings/guards'

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

  const selectedSourceFile = proposal?.proposal?.sourceFiles?.[proposal.proposal.sourceFiles.length - 1]?.sourceFile

  const [showImageModal, setShowImageModal] = useState(false)
  const [curImageIndex, setCurImageIndex] = useState(0)
  const [comment, setComment] = useState('')
  const [imagesForDownload, setImagesForDownload] = useState([])

  const mediaToShow = curResultMedia?.length ? curResultMedia : proposal.proposal.media

  const sourceImagesData = mediaToShow.map(el => ({
    fileLink: el.fileLink,
    commentByPerformer: el.commentByPerformer,
    commentByClient: el.commentByClient,
    _id: el._id || null,
  }))

  const [imagesData, setImagesData] = useState(sourceImagesData)

  const onChangeImageFileds = (field, imageId) => event => {
    const findImage = { ...imagesData.find(el => el._id === imageId) }

    findImage[field] = event.target.value

    setImagesData(() => imagesData.map(el => (el._id === imageId ? findImage : el)))
  }

  const onClickCommentBtn = imageId => {
    const findImage = { ...imagesData.find(el => el._id === imageId) }

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
      isString(el.fileLink) ? downloadFileByLink(el.fileLink) : downloadFile(el.fileLink.file),
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

  return (
    <>
      <div className={styles.modalMainWrapper}>
        <div className={styles.headerWrapper}>
          <p className={styles.headerLabel}>{`${t(TranslationKey['Request result'])} / ID ${
            proposal?.request?.xid
          }`}</p>
          <div className={styles.headerRightSubWrapper}>
            <Field
              labelClasses={styles.fieldLabel}
              label={t(TranslationKey['Source Files'])}
              containerClasses={styles.containerField}
              inputComponent={
                proposal?.proposal?.sourceFiles?.[0]?.sourceFile ? (
                  <div className={styles.viewLinkWrapper}>
                    <Link href={checkAndMakeAbsoluteUrl(selectedSourceFile)} target="_blank">
                      {t(TranslationKey.View)}
                    </Link>
                    <CopyValue text={selectedSourceFile} />
                  </div>
                ) : (
                  <div className={styles.shippingLabelWrapper}>
                    <p className={styles.miss}>{t(TranslationKey['Not available'])}</p>
                  </div>
                )
              }
            />

            <Field
              labelClasses={styles.fieldLabel}
              label={t(TranslationKey['Time to check'])}
              containerClasses={styles.containerField}
              inputComponent={<p className={styles.simpleSpan}>{minsToTime(1440)}</p>}
            />
            <Field
              labelClasses={styles.fieldLabel}
              label={t(TranslationKey['Number of illustrations'])}
              containerClasses={styles.containerField}
              inputComponent={<p className={styles.simpleSpan}>{mediaToShow.length}</p>}
            />
            <Field
              labelClasses={styles.fieldLabel}
              label="ASIN"
              containerClasses={styles.containerField}
              inputComponent={
                <AsinOrSkuLink withCopyValue link={proposal?.request?.asin} textStyles={styles.simpleSpan} />
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
              <p>{t(TranslationKey['Select all'])}</p>
            </div>

            <CustomButton disabled={!imagesForDownload.length} onClick={onClickAllDownload}>
              <MdOutlineDownload size={24} />
            </CustomButton>

            <CustomButton
              disabled={!imagesForDownload.length || archiveButtonInactiveBeforeDownloading}
              onClick={onClickDownloadArchive}
            >
              <DownloadArchiveIcon />
            </CustomButton>
          </div>

          {!noShowActions && (
            <>
              <CustomButton
                onClick={() =>
                  onPressSubmitDesignerResultToCorrect({
                    reason: comment,
                    timeLimitInMinutes: formFields.execution_time,
                    imagesData,
                  })
                }
              >
                {t(TranslationKey['Send in for rework'])}
              </CustomButton>
              <CustomButton
                type="primary"
                onClick={() => {
                  onClickProposalResultAccept(proposal.proposal._id)
                  setOpenModal()
                }}
              >
                {t(TranslationKey.Accept)}
              </CustomButton>
            </>
          )}

          <CustomButton onClick={setOpenModal}>{t(TranslationKey.Close)}</CustomButton>
        </div>
      </div>

      {showImageModal ? (
        <SlideshowGalleryModal
          withoutMakeMainImage
          openModal={showImageModal}
          files={imagesData}
          currentFileIndex={curImageIndex}
          onOpenModal={() => setShowImageModal(!showImageModal)}
          onCurrentFileIndex={setCurImageIndex}
          onChangeImagesForLoad={setImagesData}
        />
      ) : null}
    </>
  )
})
