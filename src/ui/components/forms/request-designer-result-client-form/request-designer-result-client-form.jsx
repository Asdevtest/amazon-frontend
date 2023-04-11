/* eslint-disable react/jsx-indent */

/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Link,
  Typography,
  Avatar,
  Checkbox,
} from '@mui/material'

import React, {useEffect, useState} from 'react'

import {freelanceRequestType, freelanceRequestTypeByKey} from '@constants/freelance-request-type'
import {RequestProposalStatus} from '@constants/request-proposal-status'
import {BigPlus, PhotoCameraWithPlus} from '@constants/svg-icons'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CopyValue} from '@components/copy-value'
import {CustomCarousel} from '@components/custom-carousel'
// import {PhotoCarousel} from '@components/custom-carousel/custom-carousel'
import {Field} from '@components/field'
import {Input} from '@components/input'
import {Modal} from '@components/modal'
import {BigObjectImagesModal} from '@components/modals/big-object-images-modal'
import {SetDuration} from '@components/set-duration/set-duration'
import {UploadFilesInput} from '@components/upload-files-input'

import {getShortenStringIfLongerThanCount, minsToTime} from '@utils/text'
import {t} from '@utils/translations'
import {downloadFileByLink} from '@utils/upload-files'

import {useClassNames} from './request-designer-result-client-form.style'

export const RequestDesignerResultClientForm = ({
  onClickProposalResultAccept,
  onPressSubmitDesignerResultToCorrect,
  request,
  setOpenModal,
  proposal,
  userInfo,
}) => {
  const {classes: classNames} = useClassNames()

  // console.log('request', request)

  // console.log('proposal', proposal)

  console.log('userInfo', userInfo)

  const isNotClient =
    userInfo._id !== request.request.createdBy._id && userInfo.masterUser?._id !== request.request.createdBy._id

  const proposalIsAccepted = [
    RequestProposalStatus.ACCEPTED_BY_CLIENT,
    RequestProposalStatus.ACCEPTED_BY_CREATOR_OF_REQUEST,
    RequestProposalStatus.ACCEPTED_BY_SUPERVISOR,
  ].includes(proposal.proposal.status)

  const noShowActions = isNotClient || proposalIsAccepted

  const [showImageModal, setShowImageModal] = useState(false)

  const [curImageId, setCurImageId] = useState(null)

  const [comment, setComment] = useState('')

  const [imagesForDownload, setImagesForDownload] = useState([])

  // console.log('imagesForDownload', imagesForDownload)

  const sourceImagesData = proposal.proposal.media.map(el => ({
    image: el.fileLink,
    comment: el.commentByPerformer,
    commentByClient: el.commentByClient,
    isEditCommentOpen: false,
    _id: el._id,
  }))

  const [imagesData, setImagesData] = useState(sourceImagesData)

  const onChangeImageFileds = (field, imageId) => event => {
    const findImage = {...imagesData.find(el => el._id === imageId)}

    findImage[field] = event.target.value

    setImagesData(() => imagesData.map(el => (el._id === imageId ? findImage : el)))
  }

  const onClickCommentBtn = imageId => {
    const findImage = {...imagesData.find(el => el._id === imageId)}

    findImage.isEditCommentOpen = !findImage.isEditCommentOpen

    setImagesData(() => imagesData.map(el => (el._id === imageId ? findImage : el)))
  }

  const onClickDownloadBtn = () => {
    const imageObj = {...imagesData.find(el => el._id === curImageId)}

    downloadFileByLink(typeof imageObj.image === 'string' ? imageObj.image : imageObj.image.data_url, imageObj.comment)
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
      downloadFileByLink(typeof el.image === 'string' ? el.image : el.image.data_url, el.comment),
    )
  }

  const sourceFormFields = {
    // price: proposalToEdit?.price || request?.request.price,
    execution_time: '',
    // comment: proposalToEdit?.comment || '',
    // linksToMediaFiles: proposalToEdit?.linksToMediaFiles || [],
    // title: proposalToEdit?.title || '',
  }

  const [formFields, setFormFields] = useState(sourceFormFields)

  const onChangeField = fieldName => event => {
    const newFormFields = {...formFields}
    if (['execution_time'].includes(fieldName)) {
      newFormFields[fieldName] = Number(event) || ''
    }
    // else if (
    //   ['price'].includes(fieldName) &&
    //   !checkIsPositiveNummberAndNoMoreNCharactersAfterDot(event.target.value, 2)
    // ) {
    //   return
    // } else if (['title'].includes(fieldName)) {
    //   newFormFields[fieldName] = event.target.value.replace(/\n/g, '')
    // } else {
    //   newFormFields[fieldName] = event.target.value
    // }

    setFormFields(newFormFields)
  }

  // const disableSubmit = imagesData.every(el => !el.image)

  return (
    <div className={classNames.modalMainWrapper}>
      <div className={classNames.headerWrapper}>
        <div className={classNames.titleWrapper}>
          <Typography className={cx(classNames.headerLabel)}>{`${t(TranslationKey['Request result'])} /`}</Typography>

          <Typography className={cx(classNames.headerLabel, classNames.secondSpanText)}>{`ID`}</Typography>

          <Typography className={cx(classNames.headerLabel)}>{`${request.request.humanFriendlyId}`}</Typography>
        </div>
        <div className={classNames.headerRightSubWrapper}>
          <Field
            labelClasses={classNames.fieldLabel}
            label={t(TranslationKey['Source Files'])}
            containerClasses={classNames.containerField}
            inputComponent={
              proposal.proposal.sourceFiles?.[0]?.sourceFile ? (
                <div className={classNames.viewLinkWrapper}>
                  <Link href={proposal.proposal.sourceFiles?.[0]?.sourceFile} target="_blank">
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
                {proposal.proposal.media.length}
              </Typography>
            }
          />
          <Field
            labelClasses={classNames.fieldLabel}
            label={'ASIN'}
            containerClasses={classNames.containerField}
            inputComponent={
              <Typography className={cx(classNames.simpleSpan /* , classNames.textMargin */)}>
                <a target="_blank" rel="noreferrer" href={`https://www.amazon.com/dp/${proposal.request.asin}`}>
                  <span className={classNames.linkSpan}>{proposal.request.asin}</span>
                </a>
              </Typography>
            }
          />
        </div>
      </div>

      <div className={classNames.bodyWrapper}>
        {imagesData.map((item, index) => (
          <div key={item._id} className={classNames.imageObjWrapper}>
            <div className={classNames.imageObjSubWrapper}>
              <Checkbox
                color="primary"
                checked={imagesForDownload.some(el => el._id === item._id)}
                onClick={() => onClickAddDownload(item)}
              />

              <Typography className={cx(classNames.imageObjIndex /* , classNames.textMargin */)}>
                {index + 1}
              </Typography>

              <Typography className={cx(classNames.imageObjTitle /* , classNames.textMargin */)}>
                {getShortenStringIfLongerThanCount(item.comment, 20)}
              </Typography>
            </div>
            <div
              className={cx(
                classNames.imageWrapper,

                {[classNames.isHaveImage]: !!item.image},
                {[classNames.mainImageWrapper]: index === 0},
              )}
            >
              {index === 0 && <img src="/assets/icons/star-main.svg" className={classNames.mainStarIcon} />}

              <div className={classNames.imageListItem}>
                <Avatar
                  className={classNames.image}
                  classes={{img: classNames.image}}
                  src={
                    typeof item.image === 'string'
                      ? item.image
                      : item.image?.file.type.includes('image')
                      ? item.image?.data_url
                      : '/assets/icons/file.png'
                  }
                  alt={''}
                  variant="square"
                  onClick={() => {
                    setCurImageId(item._id)
                    setShowImageModal(!showImageModal)
                  }}
                />
              </div>
            </div>

            {!item.isEditCommentOpen && !noShowActions && (
              <Button className={cx(classNames.commentBtn)} onClick={() => onClickCommentBtn(item._id)}>
                {t(TranslationKey.Comment)}
                <img
                  src={item.commentByClient ? '/assets/icons/white-pencil.svg' : '/assets/icons/white-plus.svg'}
                  className={classNames.commentIcon}
                />
              </Button>
            )}

            {item.isEditCommentOpen && !noShowActions && (
              <div>
                <div className={cx(classNames.commentHideBtn)} onClick={() => onClickCommentBtn(item._id)}>
                  <Typography>{t(TranslationKey.Comment)}</Typography>

                  <ArrowDropUpIcon />
                </div>

                <Input
                  multiline
                  inputProps={{maxLength: 128}}
                  maxRows={3}
                  variant="filled"
                  className={classNames.imageObjInput}
                  classes={{input: classNames.subImageObjInput}}
                  value={item.commentByClient}
                  onChange={onChangeImageFileds('commentByClient', item._id)}
                />
              </div>
            )}

            {/* <div className={classNames.imageObjSubWrapper}>
              <Typography className={cx(classNames.clientComment )}>
                {getShortenStringIfLongerThanCount(item.commentByClient, 30)}
              </Typography>
            </div> */}
          </div>
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
              inputProps={{maxLength: 1000}}
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

        {/* <Field
          labelClasses={classNames.fieldLabel}
          inputClasses={classNames.linkInput}
          label={t(TranslationKey['Link to sources']) + ':'}
          containerClasses={classNames.containerField}
          value={sourceLink}
          onChange={e => setSourceLink(e.target.value)}
        /> */}

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
        </div>

        {!noShowActions && (
          <>
            <Button
              // disabled /* ={disableSubmit} */
              className={cx(classNames.button)}
              onClick={() => {
                onPressSubmitDesignerResultToCorrect({
                  reason: comment,
                  timeLimitInMinutes: formFields.execution_time /* .filter(el => el.image) */,
                  imagesData,
                })
                setOpenModal()
              }}
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

      <BigObjectImagesModal
        // isRedImageComment
        openModal={showImageModal}
        setOpenModal={() => setShowImageModal(!showImageModal)}
        imagesData={imagesData.map(el => ({...el, imageComment: el.commentByClient || ''}))}
        curImageId={curImageId}
        renderBtns={() => (
          <div className={cx(classNames.imagesModalBtnsWrapper)}>
            {/* <Button danger className={cx(classNames.imagesModalBtn)} onClick={onClickRemoveImageObj}>
              <DeleteOutlineOutlinedIcon />
            </Button>

            <Button className={cx(classNames.imagesModalBtn)}>
              <AutorenewIcon />
              <input
                type={'file'}
                className={classNames.pasteInput}
                defaultValue={''}
                onChange={onUploadFile(curImageId)}
              />
            </Button> */}

            <Button className={cx(classNames.imagesModalBtn)} onClick={onClickDownloadBtn}>
              <DownloadOutlinedIcon />
            </Button>
          </div>
        )}
        setCurImageId={setCurImageId}
      />
    </div>
  )
}
