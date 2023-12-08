import { nanoid } from 'nanoid'
import { useCallback, useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend, NativeTypes } from 'react-dnd-html5-backend'

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Tooltip, Typography, Zoom } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { ImageModal } from '@components/modals/image-modal/image-modal'
import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'
import { BigPlus, CrossInRectangleIcon, PhotoCameraWithPlus } from '@components/shared/svg-icons'

import { checkIsImageLink, checkIsMediaFileLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getFileNameFromUrl } from '@utils/get-file-name-from-url'
import { getShortenStringIfLongerThanCount, minsToTime } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './request-designer-result-form.style'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const Slot = ({
  slot,
  index,
  setCurImageIndex,
  imagesData,
  setImagesData,
  setShowImageModal,
  showImageModal,
  onPasteFiles,
  onUploadFile,
  onChangeImageFileds,
  isRework,
  onClickRemoveItem,
}) => {
  const { classes: styles, cx } = useStyles()

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'slot', id: slot?._id, index },
    type: 'slot',
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: ['slot', NativeTypes.FILE],
    drop: (item, monitor) => {
      if (item.type === 'slot') {
        if (!monitor.isOver({ shallow: true })) {
          return
        }
        if (item.index === index) {
          return
        }

        const dropIndex = index
        slot.index = dropIndex

        const newSlots = reorder(imagesData, item.index, dropIndex)

        setImagesData(() => newSlots)
      } else {
        onPasteFiles(slot._id)(item.files)
      }
    },
  })

  const opacity = isDragging ? 0.4 : 1

  return (
    <div ref={drop}>
      <div style={{ opacity }} className={styles.imageObjWrapper}>
        <Tooltip
          arrow
          title={getFileNameFromUrl(typeof slot.image === 'string' ? slot.image : slot.image?.file.name)?.fullName}
          placement="right-end"
          TransitionComponent={Zoom}
          TransitionProps={{ timeout: 300 }}
        >
          <div
            ref={drag}
            className={cx(
              styles.imageWrapper,

              { [styles.isHaveImage]: !!slot?.image },
              { [styles.mainImageWrapper]: index === 0 },
            )}
          >
            {index === 0 && <img src="/assets/icons/star-main.svg" className={styles.mainStarIcon} />}

            <div
              className={styles.removeIconWrapper}
              onClick={e => {
                e.stopPropagation()

                onClickRemoveItem(slot)
              }}
            >
              {slot.image ? (
                // <DisabledByDefaultOutlinedIcon className={styles.removeIcon} />

                <CrossInRectangleIcon className={styles.removeIcon} />
              ) : (
                <CloseOutlinedIcon className={styles.removeIcon} />
              )}
            </div>
            {slot.image ? (
              <div className={styles.imageListItem}>
                {/* <Tooltip
                  arrow
                  title={getFileNameFromUrl(typeof slot.image === 'string' ? slot.image : slot.image?.file.name)?.name}
                  placement="right-end"
                  TransitionComponent={Zoom}
                  TransitionProps={{timeout: 300}}
                > */}
                <Avatar
                  className={styles.image}
                  classes={{ img: styles.image }}
                  src={
                    typeof slot.image === 'string'
                      ? checkIsMediaFileLink(slot.image)
                        ? getAmazonImageUrl(slot.image, false)
                        : '/assets/icons/file.png'
                      : slot.image?.file.type.includes('image')
                      ? slot.image?.data_url
                      : '/assets/icons/file.png'
                  }
                  alt={isRework ? '' : slot?.imageitem?.image?.file?.name}
                  variant="square"
                  onClick={() => {
                    setCurImageIndex(index)

                    if (checkIsMediaFileLink(slot.image?.file?.name || slot.image)) {
                      setShowImageModal(!showImageModal)
                    } else {
                      window.open(slot.image?.data_url || getAmazonImageUrl(slot.image), '__blank')
                    }
                  }}
                />
                {/* </Tooltip> */}
              </div>
            ) : (
              <div className={styles.imageSubWrapper}>
                <div className={styles.cameraIconWrapper}>
                  <PhotoCameraWithPlus className={styles.cameraIcon} />
                </div>

                <Typography className={cx(styles.imageUploadText)}>{'Upload'}</Typography>
              </div>
            )}
            <input
              multiple
              type={'file'}
              className={styles.pasteInput}
              defaultValue={''}
              // onPaste={e => {
              //   console.log('e', e)
              //   onPasteFiles(slot._id)(e)
              // }}
              onChange={onUploadFile(slot._id)}
              onClick={e => {
                setCurImageIndex(index)

                if (slot.image) {
                  e.preventDefault()

                  if (checkIsMediaFileLink(slot.image?.file?.name || slot.image)) {
                    setShowImageModal(!showImageModal)
                  } else {
                    window.open(slot.image?.data_url || slot.image, '__blank')
                  }
                } else {
                  return e
                }
              }}
            />
          </div>
        </Tooltip>

        <div className={styles.imageObjSubWrapper}>
          <Typography className={cx(styles.imageObjIndex)}>{index + 1}</Typography>

          <Input
            multiline
            inputProps={{ maxLength: 128 }}
            maxRows={2}
            variant="filled"
            className={styles.imageObjInput}
            classes={{ input: styles.inputComment }}
            value={slot.comment}
            onChange={e => onChangeImageFileds('comment', slot._id)(e)}
          />
        </div>

        <div className={styles.imageObjSubWrapper}>
          <Typography className={cx(styles.clientComment)}>
            {getShortenStringIfLongerThanCount(slot.commentByClient, 30)}
          </Typography>
        </div>
      </div>
    </div>
  )
}

export const RequestDesignerResultForm = ({ onClickSendAsResult, request, setOpenModal, proposal }) => {
  const { classes: styles, cx } = useStyles()

  const isRework = !!proposal.proposal.media?.length

  const [showDetails, setShowDetails] = useState(false)

  const [showImageModal, setShowImageModal] = useState(false)

  const [sourceLink, setSourceLink] = useState(proposal.proposal.sourceFiles?.[0]?.sourceFile || '')

  const [comment, setComment] = useState(proposal.details.result)

  const sourceImagesData = isRework
    ? proposal.proposal.media.map(el => ({
        image: el.fileLink,
        comment: el.commentByPerformer,
        commentByClient: el.commentByClient,
        _id: el._id,
      }))
    : [{ image: null, comment: '', commentByClient: '', _id: nanoid() }]

  const [curImageIndex, setCurImageIndex] = useState(0)
  const [imagesData, setImagesData] = useState(sourceImagesData)

  const onClickToShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const onChangeImageFileds = useCallback(
    (field, imageId) => event => {
      const findImage = { ...imagesData.find(el => el._id === imageId) }

      findImage[field] = event.target.value

      setImagesData(() => imagesData.map(el => (el._id === imageId ? findImage : el)))
    },
    [imagesData],
  )

  const onClickAddImageObj = () => {
    setImagesData(() => [...imagesData, { image: null, comment: '', commentByClient: '', _id: nanoid() }])
  }

  const onClickRemoveItem = slot => {
    if (slot.image) {
      setImagesData(() => imagesData.map(el => (el._id === slot._id ? { ...el, image: null } : el)))
    } else {
      setImagesData(() => imagesData.filter(el => el._id !== slot._id))
    }
  }

  const onPasteFiles = imageId => async files => {
    if (files.length === 0) {
      return
    }

    const readyFilesArr = files.map(el => ({
      data_url: URL.createObjectURL(el),
      file: new File([el], el.name?.replace(/ /g, ''), {
        type: el.type,
        lastModified: el.lastModified,
      }),
    }))

    const restNewSlots = readyFilesArr
      .slice(1)
      .map(el => ({ image: el, comment: el.file.name, commentByClient: '', _id: nanoid() }))

    setImagesData([
      ...imagesData.map(el =>
        el._id === imageId ? { ...el, image: readyFilesArr[0], comment: readyFilesArr[0]?.file.name } : el,
      ),
      ...restNewSlots,
    ])
  }

  const onUploadFile = imageId => async evt => {
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

      const restNewSlots = readyFilesArr
        .slice(1)
        .map(el => ({ image: el, comment: el.file.name, commentByClient: '', _id: nanoid() }))

      setImagesData([
        ...imagesData.map(el =>
          el._id === imageId ? { ...el, image: readyFilesArr[0], comment: readyFilesArr[0]?.file.name } : el,
        ),
        ...restNewSlots,
      ])
    }
  }

  const disableSubmit = imagesData.every(el => !el.image)

  const imageLinks = imagesData.filter(el => checkIsMediaFileLink(el.image)).map(el => el.image)
  const photosTitles = imagesData.filter(el => checkIsMediaFileLink(el.image)).map(el => el.comment)
  const photosComments = imagesData.filter(el => checkIsMediaFileLink(el.image)).map(el => el.commentByClient)

  return (
    <div className={styles.modalMainWrapper}>
      <div className={styles.headerWrapper}>
        <div className={styles.headerLeftSubWrapper}>
          <Typography className={cx(styles.headerLabel, styles.mainTitleMargin)}>{`${t(
            TranslationKey['Request result'],
          )} / ID ${request.request.humanFriendlyId}`}</Typography>

          <Typography className={cx(styles.headerLabel, styles.labelMargin)}>
            {t(TranslationKey['Your image recommendations'])}
          </Typography>

          <Typography className={cx(styles.headerSubText, styles.textMargin)}>
            {t(TranslationKey['Upload your recommendations for product images.'])}
          </Typography>

          <Accordion
            disableGutters
            classes={{ root: styles.accordionMain }}
            expanded={showDetails}
            onChange={onClickToShowDetails}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              classes={{
                root: styles.accordion,
                content: styles.accordionContent,
                expandIconWrapper: styles.expandIconWrapper,
              }}
            >
              <Typography className={styles.headerLabel}>
                {showDetails ? t(TranslationKey['Hide image guidelines']) : t(TranslationKey['Show image guidelines'])}
              </Typography>
            </AccordionSummary>

            <AccordionDetails classes={{ root: styles.details }} style={{ padding: 0 }}>
              <Typography className={cx(styles.headerSubText, styles.textMargin)}>
                {t(TranslationKey['Product images style guideline'])}
              </Typography>

              <Typography className={cx(styles.headerSubText, styles.textMargin)}>
                {t(
                  TranslationKey[
                    'Listings that are missing a main image will not appear in search or browse until you fix the listing.Choose images that are clear, information-rich, and attractive.'
                  ],
                )}
              </Typography>

              <Typography className={cx(styles.headerSubText, styles.textMargin)}>
                {t(
                  TranslationKey[
                    'Images must meet the following requirements:Products must fill at least 85% of the image. Images must show only the product that is for sale, with few or no props and with no logos, watermarks, or inset images. Images may only contain text that is a part of the product.Main images must have a pure white background, must be a photo (not a drawing), and must not contain excluded accessories.Images must be at least 1000 pixels on the longest side and at least 500 pixels on the shortest side to be zoom-able.Images must not exceed 10000 pixels on the longest side.JPEG is the preferred image format, but you also may use TIFF and GIF files.'
                  ],
                )}
              </Typography>

              <div className={cx(styles.uploadGuidWrapper, styles.labelMargin)}>
                <Typography className={cx(styles.headerLabel, styles.spanText)}>
                  {t(TranslationKey['Upload multiple files'])}
                </Typography>
                <Typography className={cx(styles.headerLabel)}>
                  {t(TranslationKey['or drag and drop 1 or more files below']) + '.'}
                </Typography>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className={styles.headerRightSubWrapper}>
          <Field
            labelClasses={styles.fieldLabel}
            label={t(TranslationKey['Time till deadline'])}
            containerClasses={styles.containerField}
            inputComponent={
              <Typography className={styles.simpleSpan}>{minsToTime(proposal.proposal.execution_time)}</Typography>
            }
          />

          <Field
            multiline
            className={cx(styles.heightFieldAuto)}
            labelClasses={styles.fieldLabel}
            containerClasses={styles.comment}
            inputProps={{ maxLength: 1000 }}
            minRows={4}
            maxRows={4}
            label={t(TranslationKey["Performer's comment"])}
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.bodyWrapper}>
        <DndProvider backend={HTML5Backend}>
          {imagesData.map((slot, index) => (
            <Slot
              key={slot._id}
              slot={slot}
              index={index}
              setCurImageIndex={setCurImageIndex}
              imagesData={imagesData}
              setImagesData={setImagesData}
              setShowImageModal={setShowImageModal}
              showImageModal={showImageModal}
              isRework={isRework}
              onPasteFiles={onPasteFiles}
              onUploadFile={onUploadFile}
              onClickRemoveItem={onClickRemoveItem}
              onChangeImageFileds={onChangeImageFileds}
            />
          ))}
        </DndProvider>
      </div>

      <div className={styles.footerWrapper}>
        <div className={styles.bigPlusWrapper}>
          <BigPlus className={styles.bigPlus} onClick={onClickAddImageObj} />
        </div>

        <div className={styles.flexContainer}>
          <Field
            labelClasses={styles.fieldLabel}
            inputClasses={styles.linkInput}
            inputProps={{ maxLength: 500 }}
            label={t(TranslationKey['Link to sources']) + ':'}
            containerClasses={styles.containerField}
            value={sourceLink}
            onChange={e => setSourceLink(e.target.value)}
          />

          <Button variant="text" className={cx(styles.button, styles.cancelButton)} onClick={setOpenModal}>
            {t(TranslationKey.Back)}
          </Button>

          <Button
            disabled={disableSubmit}
            className={cx(styles.button)}
            onClick={() => {
              onClickSendAsResult({ message: comment, files: imagesData.filter(el => el.image), sourceLink })
              setOpenModal()
            }}
          >
            {t(TranslationKey.Send)}
          </Button>
        </div>
      </div>

      {showImageModal && (
        <ImageModal
          showPreviews
          isRequestResult
          isOpenModal={showImageModal}
          handleOpenModal={() => setShowImageModal(!showImageModal)}
          files={imageLinks}
          photosTitles={photosTitles}
          photosComments={photosComments}
          currentFileIndex={curImageIndex}
          handleCurrentFileIndex={index => setCurImageIndex(index)}
        />
      )}
    </div>
  )
}
