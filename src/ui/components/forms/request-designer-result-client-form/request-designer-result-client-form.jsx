/* eslint-disable react/jsx-indent */

/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import { nanoid } from 'nanoid'
import { useEffect, useRef, useState } from 'react'

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import { Avatar, Checkbox, ClickAwayListener, Link, Menu, Tooltip, Typography } from '@mui/material'
import Zoom from '@mui/material/Zoom'

import { RequestProposalStatus } from '@constants/requests/request-proposal-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ImageModal } from '@components/modals/image-modal/image-modal'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'
import { SetDuration } from '@components/shared/set-duration/set-duration'
import { DownloadArchiveIcon } from '@components/shared/svg-icons'

import { checkIsImageLink } from '@utils/checks'
import { reversedFormatDateWithoutTime } from '@utils/date-time'
import { getFileNameFromUrl } from '@utils/get-file-name-from-url'
import { checkAndMakeAbsoluteUrl, getShortenStringIfLongerThanCount, minsToTime } from '@utils/text'
import { t } from '@utils/translations'
import { downloadArchive, downloadFile, downloadFileByLink } from '@utils/upload-files'

import { useClassNames } from './request-designer-result-client-form.style'

const Slot = ({
  item,
  onChangeImageFileds,
  onClickCommentBtn,
  noShowActions,
  showImageModal,
  setShowImageModal,
  index,
  imagesForDownload,
  onClickAddDownload,
}) => {
  const { classes: classNames } = useClassNames()

  const menuAnchor = useRef()

  const handleClose = () => {
    onClickCommentBtn(item._id)
  }

  return (
    <div key={item._id} className={classNames.imageObjWrapper}>
      <div className={classNames.imageObjSubWrapper}>
        <Checkbox
          color="primary"
          checked={imagesForDownload.some(el => el._id === item._id)}
          onClick={() => onClickAddDownload(item)}
        />

        <Typography className={cx(classNames.imageObjIndex /* , classNames.textMargin */)}>{index + 1}</Typography>

        <Typography className={cx(classNames.imageObjTitle /* , classNames.textMargin */)}>
          {getShortenStringIfLongerThanCount(item.comment, 20)}
        </Typography>
      </div>
      <div
        className={cx(
          classNames.imageWrapper,

          { [classNames.isHaveImage]: !!item.image },
          { [classNames.mainImageWrapper]: index === 0 },
        )}
      >
        {index === 0 && <img src="/assets/icons/star-main.svg" className={classNames.mainStarIcon} />}

        <div className={classNames.imageListItem}>
          <Tooltip
            arrow
            title={getFileNameFromUrl(typeof item.image === 'string' ? item.image : item.image?.file.name)?.fullName}
            placement="right-end"
            TransitionComponent={Zoom}
            TransitionProps={{ timeout: 300 }}
          >
            <Avatar
              className={classNames.image}
              classes={{ img: classNames.image }}
              src={
                typeof item.image === 'string'
                  ? checkIsImageLink(item.image)
                    ? item.image
                    : '/assets/icons/file.png'
                  : item.image?.file.type.includes('image')
                  ? item.image?.data_url
                  : '/assets/icons/file.png'
              }
              alt={''}
              variant="square"
              onClick={() => {
                if (checkIsImageLink(item.image?.file?.name || item.image)) {
                  setShowImageModal(!showImageModal)
                } else {
                  window.open(item.image?.data_url || item.image, '__blank')
                }
              }}
            />
          </Tooltip>
        </div>
      </div>

      <div ref={menuAnchor}>
        {!item.isEditCommentOpen && !noShowActions && (
          <Button
            className={cx(classNames.commentBtn)}
            onClick={() => {
              onClickCommentBtn(item._id)
            }}
          >
            {t(TranslationKey.Comment)}
            <img
              src={item.commentByClient ? '/assets/icons/white-pencil.svg' : '/assets/icons/white-plus.svg'}
              className={classNames.commentIcon}
            />
          </Button>
        )}

        {item.isEditCommentOpen && !noShowActions && (
          <ClickAwayListener
            mouseEvent="onMouseDown"
            onClickAway={() => {
              handleClose()

              onClickCommentBtn(item._id)
            }}
          >
            <div className={cx(classNames.commentBtnWrapper)}>
              <div className={cx(classNames.commentHideBtn)} onClick={() => onClickCommentBtn(item._id)}>
                <Typography>{t(TranslationKey.Comment)}</Typography>

                <ArrowDropUpIcon />
              </div>

              <Menu
                open
                anchorEl={menuAnchor.current}
                autoFocus={false}
                classes={{ /* paper: classNames.menu, */ list: classNames.list }}
                onClose={handleClose}
              >
                <Input
                  autoFocus
                  multiline
                  type="text"
                  inputProps={{ maxLength: 500 }}
                  minRows={5}
                  maxRows={10}
                  variant="filled"
                  className={classNames.imageObjInput}
                  classes={{ input: classNames.subImageObjInput }}
                  value={item.commentByClient}
                  onChange={onChangeImageFileds('commentByClient', item._id)}
                />
              </Menu>
            </div>
          </ClickAwayListener>
        )}
      </div>

      {/* <div className={classNames.imageObjSubWrapper}>
      <Typography className={cx(classNames.clientComment )}>
        {getShortenStringIfLongerThanCount(item.commentByClient, 30)}
      </Typography>
    </div> */}
    </div>
  )
}

export const RequestDesignerResultClientForm = ({
  onClickProposalResultAccept,
  onPressSubmitDesignerResultToCorrect,
  request,
  setOpenModal,
  proposal,
  userInfo,
  curResultMedia,
  onlyRead,
}) => {
  const { classes: classNames } = useClassNames()

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

  const sourceImagesData = (proposal.proposal.media ?? curResultMedia).map(el => ({
    image: el.fileLink,
    comment: el.commentByPerformer,
    commentByClient: el.commentByClient,
    isEditCommentOpen: false,
    _id: el._id ?? nanoid(),
  }))

  const [imagesData, setImagesData] = useState(sourceImagesData)
  const [filteredImages, setFilteredImages] = useState([])

  useEffect(() => {
    setFilteredImages(
      imagesData
        .filter(el => !!el.image && checkIsImageLink(el.image?.file?.name || el.image))
        .map(el => {
          const url = typeof el?.image === 'string' ? el?.image : el?.image?.data_url

          return {
            url,
            title: el.comment,
            comment: el.commentByClient,
            _id: el._id,
          }
        }),
    )
  }, [imagesData])

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

  const onClickDownloadArchive = () => {
    downloadArchive(
      imagesForDownload,
      `${reversedFormatDateWithoutTime(new Date(), true)}_${request?.request?.title?.replaceAll(' ', '_')}`,
    )
  }

  return (
    <div className={classNames.modalMainWrapper}>
      <div className={classNames.headerWrapper}>
        <div className={classNames.titleWrapper}>
          <Typography className={cx(classNames.headerLabel)}>{`${t(TranslationKey['Request result'])} /`}</Typography>

          <Typography className={cx(classNames.headerLabel)}>{`ID ${request?.request?.humanFriendlyId}`}</Typography>
        </div>
        <div className={classNames.headerRightSubWrapper}>
          <Field
            labelClasses={classNames.fieldLabel}
            label={t(TranslationKey['Source Files'])}
            containerClasses={classNames.containerField}
            inputComponent={
              proposal?.proposal?.sourceFiles?.[0]?.sourceFile ? (
                <div className={classNames.viewLinkWrapper}>
                  <Link href={checkAndMakeAbsoluteUrl(proposal.proposal.sourceFiles?.[0]?.sourceFile)} target="_blank">
                    {t(TranslationKey.View)}
                  </Link>
                  <CopyValue text={proposal.proposal.sourceFiles?.[0]?.sourceFile} />
                </div>
              ) : (
                <div className={classNames.shippingLabelWrapper}>
                  <Typography className={classNames.miss}>{t(TranslationKey['Not available'])}</Typography>
                </div>
              )
            }
          />

          <Field
            labelClasses={classNames.fieldLabel}
            label={t(TranslationKey['Time to check'])}
            containerClasses={classNames.containerField}
            inputComponent={
              <Typography className={cx(classNames.simpleSpan /* , classNames.textMargin */)}>
                {minsToTime(1440)}
              </Typography>
            }
          />
          <Field
            labelClasses={classNames.fieldLabel}
            label={t(TranslationKey['Number of illustrations'])}
            containerClasses={classNames.containerField}
            inputComponent={
              <Typography className={cx(classNames.simpleSpan /* , classNames.textMargin */)}>
                {(curResultMedia ?? proposal.proposal.media).length}
              </Typography>
            }
          />
          <Field
            labelClasses={classNames.fieldLabel}
            label={'ASIN'}
            containerClasses={classNames.containerField}
            inputComponent={
              <AsinOrSkuLink
                withCopyValue
                asin={proposal?.request?.asin || request?.request?.asin}
                textStyles={classNames.simpleSpan}
              />
            }
          />
        </div>
      </div>

      <div className={classNames.bodyWrapper}>
        {imagesData.map((item, index) => (
          <Slot
            key={item._id}
            item={item}
            noShowActions={noShowActions}
            showImageModal={showImageModal}
            setShowImageModal={setShowImageModal}
            index={index}
            imagesForDownload={imagesForDownload}
            onClickAddDownload={onClickAddDownload}
            onChangeImageFileds={onChangeImageFileds}
            onClickCommentBtn={onClickCommentBtn}
          />
        ))}
      </div>

      <div className={classNames.footerWrapper}>
        {!noShowActions && (
          <>
            <Field
              multiline
              className={cx(classNames.heightFieldAuto)}
              labelClasses={classNames.fieldLabel}
              containerClasses={classNames.containerField}
              inputProps={{ maxLength: 1000 }}
              minRows={4}
              maxRows={4}
              placeholder={t(TranslationKey['Enter remarks'])}
              label={t(TranslationKey.Remarks)}
              value={comment}
              onChange={e => setComment(e.target.value)}
            />

            <Field
              labelClasses={classNames.fieldLabel}
              label={t(TranslationKey['Time for rework'])}
              containerClasses={classNames.containerField}
              inputComponent={
                <SetDuration
                  duration={formFields.execution_time}
                  setTotalTimeInMinute={onChangeField('execution_time')}
                />
              }
            />
          </>
        )}

        <div className={classNames.downloadsWrapper}>
          <div className={classNames.downloadsCheckWrapper} onClick={onClickAllAddDownload}>
            <Checkbox color="primary" checked={imagesForDownload.length === imagesData.length} />
            <Typography>{t(TranslationKey['Select all'])}</Typography>
          </div>

          <Button
            disabled={!imagesForDownload.length}
            className={cx(classNames.imagesModalBtn)}
            onClick={onClickAllDownload}
          >
            <DownloadOutlinedIcon />
          </Button>

          <Button
            disabled={!imagesForDownload.length}
            className={cx(classNames.imagesModalBtn)}
            onClick={onClickDownloadArchive}
          >
            <DownloadArchiveIcon />
          </Button>
        </div>

        {!noShowActions && (
          <>
            <Button
              // disabled /* ={disableSubmit} */
              className={cx(classNames.button)}
              onClick={() =>
                onPressSubmitDesignerResultToCorrect({
                  reason: comment,
                  timeLimitInMinutes: formFields.execution_time /* .filter(el => el.image) */,
                  imagesData,
                })
              }
            >
              {t(TranslationKey['Send in for rework'])}
            </Button>
            <Button
              success
              // disabled /* ={disableSubmit} */
              className={cx(classNames.button)}
              onClick={() => {
                onClickProposalResultAccept(proposal.proposal._id)
                setOpenModal()
              }}
            >
              {t(TranslationKey.Accept)}
            </Button>
          </>
        )}

        <Button variant="text" className={cx(classNames.button, classNames.cancelButton)} onClick={setOpenModal}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>

      {showImageModal ? (
        <ImageModal
          showPreviews
          isOpenModal={showImageModal}
          handleOpenModal={() => setShowImageModal(!showImageModal)}
          imageList={filteredImages.map(el => el.fileLink)}
          photosTitles={filteredImages.map(el => el.title)}
          photosComments={filteredImages.map(el => el.comment)}
          currentImageIndex={curImageIndex}
          handleCurrentImageIndex={index => setCurImageIndex(index)}
        />
      ) : null}
    </div>
  )
}
