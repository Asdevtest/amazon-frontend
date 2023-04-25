/* eslint-disable react/jsx-indent */

/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import {Accordion, AccordionDetails, AccordionSummary, IconButton, Link, Typography, Avatar} from '@mui/material'

import React, {useCallback, useEffect, useRef, useState} from 'react'

import {DndProvider, useDrag, useDrop, DndContext} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'

import {freelanceRequestType, freelanceRequestTypeByKey} from '@constants/freelance-request-type'
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
import {UploadFilesInput} from '@components/upload-files-input'

import {getShortenStringIfLongerThanCount, minsToTime} from '@utils/text'
import {t} from '@utils/translations'
import {downloadFileByLink} from '@utils/upload-files'

import {ImageEditForm} from '../image-edit-form'
import {useClassNames} from './request-designer-result-form.style'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const Slot = ({
  slot,
  index,
  imagesData,
  setImagesData,
  setCurImageId,
  setShowImageModal,
  showImageModal,
  onPasteFiles,
  onUploadFile,
  onChangeImageFileds,
  isRework,
  onClickRemoveItem,
}) => {
  const {classes: classNames} = useClassNames()

  const [{isDragging}, drag] = useDrag({
    item: {type: 'slot', id: slot?._id, index},
    type: 'slot',
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: 'slot',
    drop: (item, monitor) => {
      if (!monitor.isOver({shallow: true})) {
        return
      }
      if (item.index === index) {
        return
      }

      const dropIndex = index
      slot.index = dropIndex

      const newSlots = reorder(imagesData, item.index, dropIndex)

      setImagesData(() => newSlots)
    },
  })

  const opacity = isDragging ? 0.4 : 1

  return (
    <div key={slot._id} ref={drop}>
      <div ref={drag} style={{opacity}} className={classNames.imageObjWrapper}>
        <div
          key={slot._id + 'comment3'}
          className={cx(
            classNames.imageWrapper,

            {[classNames.isHaveImage]: !!slot?.image},
            {[classNames.mainImageWrapper]: index === 0},
          )}
        >
          {index === 0 && <img src="/assets/icons/star-main.svg" className={classNames.mainStarIcon} />}
          {index !== 0 && (
            <div
              className={classNames.removeIconWrapper}
              onClick={e => {
                e.stopPropagation()

                onClickRemoveItem(slot._id)
              }}
            >
              <CloseOutlinedIcon className={classNames.removeIcon} />
            </div>
          )}
          {slot.image ? (
            <div className={classNames.imageListItem}>
              <Avatar
                className={classNames.image}
                classes={{img: classNames.image}}
                src={
                  typeof slot.image === 'string'
                    ? slot.image
                    : slot.image?.file.type.includes('image')
                    ? slot.image?.data_url
                    : '/assets/icons/file.png'
                }
                alt={isRework ? '' : slot?.imageitem?.image?.file?.name}
                variant="square"
                onClick={() => {
                  setCurImageId(slot._id)
                  setShowImageModal(!showImageModal)
                }}
              />
            </div>
          ) : (
            <div className={classNames.imageSubWrapper}>
              <div className={classNames.cameraIconWrapper}>
                <PhotoCameraWithPlus className={classNames.cameraIcon} />
              </div>

              <Typography className={cx(classNames.imageUploadText)}>{'Upload'}</Typography>
            </div>
          )}
          <input
            type={'file'}
            className={classNames.pasteInput}
            defaultValue={''}
            onPaste={onPasteFiles(slot._id)}
            onChange={onUploadFile(slot._id)}
            onClick={e => {
              if (slot.image) {
                e.preventDefault()

                setCurImageId(slot._id)
                setShowImageModal(!showImageModal)
              } else {
                return e
              }
            }}
          />
        </div>

        <div className={classNames.imageObjSubWrapper}>
          <Typography className={cx(classNames.imageObjIndex)}>{index + 1}</Typography>

          <Input
            multiline
            inputProps={{maxLength: 128}}
            maxRows={3}
            variant="filled"
            className={classNames.imageObjInput}
            value={slot.comment}
            onChange={e => {
              onChangeImageFileds('comment', slot._id)(e)
            }}
          />
        </div>

        <div className={classNames.imageObjSubWrapper}>
          <Typography className={cx(classNames.clientComment)}>
            {getShortenStringIfLongerThanCount(slot.commentByClient, 30)}
          </Typography>
        </div>
      </div>
    </div>
  )
}

export const RequestDesignerResultForm = ({onClickSendAsResult, request, setOpenModal, proposal}) => {
  const {classes: classNames} = useClassNames()

  const isRework = !!proposal.proposal.media?.length

  const [showDetails, setShowDetails] = useState(false)

  const [showImageModal, setShowImageModal] = useState(false)

  const [curImageId, setCurImageId] = useState(null)

  const [sourceLink, setSourceLink] = useState(proposal.proposal.sourceFiles?.[0]?.sourceFile || '')

  const [comment, setComment] = useState(proposal.details.result)

  const [imageEditOpen, setImageEditOpen] = useState(false)

  const onClickToShowDetails = () => {
    setShowDetails(!showDetails)
  }

  // console.log('request', request)

  const sourceImagesData = isRework
    ? proposal.proposal.media.map(el => ({
        image: el.fileLink,
        comment: el.commentByPerformer,
        commentByClient: el.commentByClient,
        _id: el._id,
      }))
    : [
        {image: null, comment: '', isMain: false, _id: `${Date.now()}1`},
        {image: null, comment: '', isMain: false, _id: `${Date.now()}2`},
        {image: null, comment: '', isMain: false, _id: `${Date.now()}3`},
      ]

  const [imagesData, setImagesData] = useState(sourceImagesData)

  const onChangeImageFileds = useCallback(
    (field, imageId) => event => {
      const findImage = {...imagesData.find(el => el._id === imageId)}

      findImage[field] = event.target.value

      setImagesData(() => imagesData.map(el => (el._id === imageId ? findImage : el)))
    },
    [imagesData],
  )

  // console.log('imagesData', imagesData)

  const onClickAddImageObj = () => {
    setImagesData(() => [...imagesData, {image: null, comment: '', isMain: false, _id: `${Date.now()}`}])
  }

  const onClickRemoveImageObj = () => {
    setImagesData(() => imagesData.filter(el => el._id !== curImageId))
    setCurImageId(() => null)
  }

  const onClickEditImageSubmit = image => {
    setImagesData(() => imagesData.map(el => (el._id === curImageId ? {...el, image} : el)))
  }

  const onClickEditImage = () => {
    setImageEditOpen(!imageEditOpen)
  }

  const onClickRemoveItem = imageId => {
    setImagesData(() => imagesData.filter(el => el._id !== imageId))
  }

  const onPasteFiles = imageId => async evt => {
    if (evt.clipboardData.files.length === 0) {
      return
    } else {
      const filesArr = Array.from(evt.clipboardData.files)

      evt.preventDefault()

      const readyFilesArr = filesArr.map(el => ({
        data_url: URL.createObjectURL(el),
        file: new File([el], el.name?.replace(/ /g, ''), {
          type: el.type,
          lastModified: el.lastModified,
        }),
      }))

      setImagesData(() => imagesData.map(el => (el._id === imageId ? {...el, image: readyFilesArr[0]} : el)))
    }
  }

  const onUploadFile = imageId => async evt => {
    console.log('sss')
    if (evt.target.files.length === 0) {
      return
    } else {
      const filesArr = Array.from(evt.target.files)

      evt.preventDefault()

      const readyFilesArr = filesArr.map(el => ({
        data_url: URL.createObjectURL(el),
        file: new File([el], el.name?.replace(/ /g, ''), {
          type: el.type,
          lastModified: el.lastModified,
        }),
      }))

      setImagesData(() => imagesData.map(el => (el._id === imageId ? {...el, image: readyFilesArr[0]} : el)))
    }
  }

  const disableSubmit = imagesData.every(el => !el.image)

  // console.log('imagesData', imagesData)

  return (
    <div className={classNames.modalMainWrapper}>
      <div className={classNames.headerWrapper}>
        <div className={classNames.headerLeftSubWrapper}>
          <Typography className={cx(classNames.headerLabel, classNames.mainTitleMargin)}>{`${t(
            TranslationKey['Request result'],
          )} / ID ${request.request.humanFriendlyId}`}</Typography>

          <Typography className={cx(classNames.headerLabel, classNames.labelMargin)}>
            {t(TranslationKey['Your image recommendations'])}
          </Typography>

          <Typography className={cx(classNames.headerSubText, classNames.textMargin)}>
            {t(TranslationKey['Upload your recommendations for product images.'])}
          </Typography>

          <Accordion
            disableGutters
            classes={{root: classNames.accordionMain}}
            // style={{borderRadius: '4px', boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)'}}
            expanded={showDetails}
            onChange={onClickToShowDetails}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              classes={{
                root: classNames.accordion,
                content: classNames.accordionContent,
                expandIconWrapper: classNames.expandIconWrapper,
              }}
            >
              <Typography className={cx(classNames.headerLabel /* , classNames.labelMargin */)}>
                {showDetails ? t(TranslationKey['Hide image guidelines']) : t(TranslationKey['Show image guidelines'])}
              </Typography>
            </AccordionSummary>

            <AccordionDetails classes={{root: classNames.details}} style={{padding: 0}}>
              <Typography className={cx(classNames.headerSubText, classNames.textMargin)}>
                {t(TranslationKey['Product images style guideline'])}
              </Typography>

              <Typography className={cx(classNames.headerSubText, classNames.textMargin)}>
                {t(
                  TranslationKey[
                    'Listings that are missing a main image will not appear in search or browse until you fix the listing.Choose images that are clear, information-rich, and attractive.'
                  ],
                )}
              </Typography>

              <Typography className={cx(classNames.headerSubText, classNames.textMargin)}>
                {t(
                  TranslationKey[
                    'Images must meet the following requirements:Products must fill at least 85% of the image. Images must show only the product that is for sale, with few or no props and with no logos, watermarks, or inset images. Images may only contain text that is a part of the product.Main images must have a pure white background, must be a photo (not a drawing), and must not contain excluded accessories.Images must be at least 1000 pixels on the longest side and at least 500 pixels on the shortest side to be zoom-able.Images must not exceed 10000 pixels on the longest side.JPEG is the preferred image format, but you also may use TIFF and GIF files.'
                  ],
                )}
              </Typography>

              <div className={cx(classNames.uploadGuidWrapper, classNames.labelMargin)}>
                <Typography className={cx(classNames.headerLabel, classNames.spanText)}>
                  {t(TranslationKey['Upload multiple files'])}
                </Typography>
                <Typography className={cx(classNames.headerLabel)}>
                  {t(TranslationKey['or drag and drop 1 or more files below']) + '.'}
                </Typography>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className={classNames.headerRightSubWrapper}>
          <Field
            labelClasses={classNames.fieldLabel}
            label={t(TranslationKey['Time till deadline'])}
            containerClasses={classNames.containerField}
            inputComponent={
              <Typography className={cx(classNames.simpleSpan /* , classNames.textMargin */)}>
                {minsToTime(proposal.proposal.execution_time)}
              </Typography>
            }
          />

          <Field
            multiline
            className={cx(classNames.heightFieldAuto)}
            labelClasses={classNames.fieldLabel}
            inputProps={{maxLength: 1000}}
            minRows={4}
            maxRows={4}
            label={t(TranslationKey["Performer's comment"])}
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </div>
      </div>

      <div className={classNames.bodyWrapper}>
        <DndProvider backend={HTML5Backend}>
          <div className={classNames.bodySubWrapper}>
            {imagesData.map((slot, index) => (
              <Slot
                key={slot?._id}
                slot={slot}
                index={index}
                imagesData={imagesData}
                setImagesData={setImagesData}
                setCurImageId={setCurImageId}
                setShowImageModal={setShowImageModal}
                showImageModal={showImageModal}
                isRework={isRework}
                onPasteFiles={onPasteFiles}
                onUploadFile={onUploadFile}
                onClickRemoveItem={onClickRemoveItem}
                onChangeImageFileds={onChangeImageFileds}
              />
            ))}
          </div>
        </DndProvider>

        {/* <div className={classNames.bigPlusWrapper}>
          <BigPlus className={classNames.bigPlus} onClick={onClickAddImageObj} />
        </div> */}
      </div>

      <div className={classNames.footerWrapper}>
        <div className={classNames.bigPlusWrapper}>
          <BigPlus className={classNames.bigPlus} onClick={onClickAddImageObj} />
        </div>

        <div className={classNames.footerWrapper}>
          <Field
            labelClasses={classNames.fieldLabel}
            inputClasses={classNames.linkInput}
            inputProps={{maxLength: 500}}
            label={t(TranslationKey['Link to sources']) + ':'}
            containerClasses={classNames.containerField}
            value={sourceLink}
            onChange={e => setSourceLink(e.target.value)}
          />

          <Button variant="text" className={cx(classNames.button, classNames.cancelButton)} onClick={setOpenModal}>
            {t(TranslationKey.Back)}
          </Button>

          <Button
            disabled={disableSubmit}
            className={cx(classNames.button)}
            onClick={() => {
              onClickSendAsResult({message: comment, files: imagesData.filter(el => el.image), sourceLink})
              setOpenModal()
            }}
          >
            {t(TranslationKey.Send)}
          </Button>
        </div>
      </div>

      <Modal openModal={imageEditOpen} setOpenModal={() => setImageEditOpen(!imageEditOpen)}>
        <ImageEditForm
          item={imagesData.find(el => el._id === curImageId)?.image || null}
          setOpenModal={() => setImageEditOpen(!imageEditOpen)}
          onSave={onClickEditImageSubmit}
        />
      </Modal>

      <BigObjectImagesModal
        isRedImageComment
        openModal={showImageModal}
        setOpenModal={() => setShowImageModal(!showImageModal)}
        imagesData={imagesData.map(el => ({...el, imageComment: el?.commentByClient || ''}))}
        curImageId={curImageId}
        renderBtns={() => (
          <>
            <Button className={cx(classNames.imagesModalBtn)} onClick={() => onClickEditImage()}>
              <ModeOutlinedIcon />
            </Button>

            <Button className={cx(classNames.imagesModalBtn)}>
              <AutorenewIcon />
              <input
                type={'file'}
                className={classNames.pasteInput}
                defaultValue={''}
                onChange={onUploadFile(curImageId)}
              />
            </Button>

            <Button danger className={cx(classNames.imagesModalBtn)} onClick={onClickRemoveImageObj}>
              <DeleteOutlineOutlinedIcon />
            </Button>
          </>
        )}
        setCurImageId={setCurImageId}
      />
    </div>
  )
}
