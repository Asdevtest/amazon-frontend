/* eslint-disable react/jsx-indent */

/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {Accordion, AccordionDetails, AccordionSummary, IconButton, Link, Typography, Avatar} from '@mui/material'

import React, {useEffect, useState} from 'react'

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

import {useClassNames} from './request-designer-result-form.style'

export const RequestDesignerResultForm = ({onClickSendAsResult, request, setOpenModal}) => {
  const {classes: classNames} = useClassNames()

  const isRework = !!request.request.media?.length

  const [showDetails, setShowDetails] = useState(false)

  const [showImageModal, setShowImageModal] = useState(false)

  const [curImageId, setCurImageId] = useState(null)

  const [sourceLink, setSourceLink] = useState('')

  const [comment, setComment] = useState('')

  const onClickToShowDetails = () => {
    setShowDetails(!showDetails)
  }

  console.log('request', request)

  const sourceImagesData = isRework
    ? request.request.media.map((el, index) => ({
        image: el.fileLink,
        comment: el.commentByPerformer,
        commentByClient: el.commentByClient,
        _id: `${Date.now()}${index}`,
      }))
    : [
        {image: null, comment: '', isMain: false, _id: `${Date.now()}1`},
        {image: null, comment: '', isMain: false, _id: `${Date.now()}2`},
        {image: null, comment: '', isMain: false, _id: `${Date.now()}3`},
      ]

  const [imagesData, setImagesData] = useState(sourceImagesData)

  const onChangeImageFileds = (field, imageId) => event => {
    const findImage = {...imagesData.find(el => el._id === imageId)}

    findImage[field] = event.target.value

    setImagesData(() => imagesData.map(el => (el._id === imageId ? findImage : el)))
  }

  // console.log('imagesData', imagesData)

  const onClickAddImageObj = () => {
    setImagesData(() => [...imagesData, {image: null, comment: '', isMain: false, _id: `${Date.now()}`}])
  }

  const onClickRemoveImageObj = () => {
    setImagesData(() => imagesData.filter(el => el._id !== curImageId))
    setCurImageId(() => null)
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

  const onClickDownloadBtn = () => {
    const imageObj = {...imagesData.find(el => el._id === curImageId)}

    // console.log('imageObj', imageObj)

    const aElement = document.createElement('a')
    aElement.setAttribute('download', /* `boxReceiveReport_${id}.xlsx` */ `${imageObj.comment || 'no-name'}`)
    const href = /* URL.createObjectURL(res.data) */ imageObj.image.data_url
    aElement.href = href
    aElement.setAttribute('target', '_blank')
    aElement.click()
    // URL.revokeObjectURL(href)
    aElement.remove()
  }

  // const [formFields, setFormFields] = useState(sourceFormFields)

  // const onChangeField = fieldName => event => {
  //   const newFormFields = {...formFields}

  //   newFormFields[fieldName] = event.target.value

  //   setFormFields(newFormFields)
  // }

  const disableSubmit = imagesData.every(el => !el.image)

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
                {minsToTime(1440)}
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
        {imagesData.map((item, index) => (
          <div key={item._id} className={classNames.imageObjWrapper}>
            <div
              className={cx(
                classNames.imageWrapper,

                {[classNames.isHaveImage]: !!item.image},
                {[classNames.mainImageWrapper]: index === 0},
              )}
            >
              {index === 0 && <img src="/assets/icons/star-main.svg" className={classNames.mainStarIcon} />}
              {item.image ? (
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
                    alt={isRework ? '' : item?.imageitem?.image?.file?.name}
                    variant="square"
                    onClick={() => {
                      setCurImageId(item._id)
                      setShowImageModal(!showImageModal)
                    }}
                  />
                </div>
              ) : (
                <div className={classNames.imageSubWrapper}>
                  <div className={classNames.cameraIconWrapper}>
                    <PhotoCameraWithPlus className={classNames.cameraIcon} />
                  </div>

                  <Typography className={cx(classNames.imageUploadText /* , classNames.textMargin */)}>
                    {'Upload'}
                  </Typography>

                  <input
                    type={'file'}
                    className={classNames.pasteInput}
                    defaultValue={''}
                    onPaste={onPasteFiles(item._id)}
                    onChange={onUploadFile(item._id)}
                  />
                </div>
              )}
            </div>

            <div className={classNames.imageObjSubWrapper}>
              <Typography className={cx(classNames.imageObjIndex /* , classNames.textMargin */)}>
                {index + 1}
              </Typography>

              <Input
                multiline
                inputProps={{maxLength: 128}}
                maxRows={3}
                variant="filled"
                className={classNames.imageObjInput}
                value={item.comment}
                onChange={onChangeImageFileds('comment', item._id)}
              />
            </div>

            <div className={classNames.imageObjSubWrapper}>
              <Typography className={cx(classNames.clientComment /* , classNames.textMargin */)}>
                {getShortenStringIfLongerThanCount(
                  item.commentByClient || 'Заменить, фото не соответствует качеству',
                  30,
                )}
              </Typography>
            </div>
          </div>
        ))}

        <div className={classNames.bigPlusWrapper}>
          <BigPlus className={classNames.bigPlus} onClick={onClickAddImageObj} />
        </div>
      </div>

      <div className={classNames.footerWrapper}>
        <Field
          labelClasses={classNames.fieldLabel}
          inputClasses={classNames.linkInput}
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

      <BigObjectImagesModal
        isRedImageComment
        openModal={showImageModal}
        setOpenModal={() => setShowImageModal(!showImageModal)}
        imagesData={imagesData.map(el => ({...el, imageComment: el.commentByClient || ''}))}
        curImageId={curImageId}
        renderBtns={() => (
          <div className={cx(classNames.imagesModalBtnsWrapper)}>
            <Button danger className={cx(classNames.imagesModalBtn)} onClick={onClickRemoveImageObj}>
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
            </Button>

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
