/* eslint-disable react/jsx-indent */

/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {Accordion, AccordionDetails, AccordionSummary, IconButton, Link, Typography} from '@mui/material'

import React, {useEffect, useState} from 'react'

import {freelanceRequestType, freelanceRequestTypeByKey} from '@constants/freelance-request-type'
import {PhotoCameraWithPlus} from '@constants/svg-icons'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CopyValue} from '@components/copy-value'
// import {PhotoCarousel} from '@components/custom-carousel/custom-carousel'
import {Field} from '@components/field'
import {Input} from '@components/input'
import {UploadFilesInput} from '@components/upload-files-input'

import {minsToTime} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './request-designer-result-form.style'

export const RequestDesignerResultForm = ({onClickSendAsResult, request, setOpenModal}) => {
  const {classes: classNames} = useClassNames()

  const [showDetails, setShowDetails] = useState(false)

  const onClickToShowDetails = () => {
    setShowDetails(!showDetails)
  }

  console.log('request', request)

  const sourceImagesData = [
    {image: '', imageName: '', isMain: false},
    {image: '', imageName: '', isMain: false},
    {image: '', imageName: '', isMain: false},
  ]

  const [imagesData, setImagesData] = useState(sourceImagesData)

  const onClickAddImageObj = () => {
    setImagesData(() => [...imagesData, {image: '', imageName: '', isMain: false}])
  }

  // const [images, setImages] = useState([])

  // const sourceFormFields = {
  //   amazonOrderId: '',
  //   publicationLinks: [],
  //   result: '',
  //   // linksToMediaFiles: [],
  // }

  // const [formFields, setFormFields] = useState(sourceFormFields)

  // const onChangeField = fieldName => event => {
  //   const newFormFields = {...formFields}

  //   newFormFields[fieldName] = event.target.value

  //   setFormFields(newFormFields)
  // }

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
              <Typography className={cx(classNames.timeSpan /* , classNames.textMargin */)}>
                {minsToTime(1440)}
              </Typography>
            }
          />
        </div>
      </div>

      <div className={classNames.bodyWrapper}>
        {imagesData.map((item, index) => (
          <div key={index} className={classNames.imageObjWrapper}>
            <div className={classNames.imageWrapper}>
              <PhotoCameraWithPlus />
            </div>

            <div className={classNames.imageObjSubWrapper}>
              <Typography className={cx(classNames.imageObjIndex /* , classNames.textMargin */)}>
                {index + 1}
              </Typography>

              <Input multiline maxRows={3} variant="filled" className={classNames.imageObjInput} />
            </div>
          </div>
        ))}

        <div className={classNames.bigPlusWrapper}>
          <img src="/assets/icons/big-plus.svg" className={classNames.bigPlus} onClick={onClickAddImageObj} />
        </div>
      </div>

      <div className={classNames.footerWrapper}>
        <Field
          labelClasses={classNames.fieldLabel}
          inputClasses={classNames.linkInput}
          label={t(TranslationKey['Link to sources']) + ':'}
          containerClasses={classNames.containerField}
        />

        <Button variant="text" className={cx(classNames.button, classNames.cancelButton)} onClick={setOpenModal}>
          {t(TranslationKey.Back)}
        </Button>

        <Button disabled className={cx(classNames.button)}>
          {t(TranslationKey.Send)}
        </Button>
      </div>

      {/* {`${request?.request?.typeTask}` === `${freelanceRequestTypeByKey[freelanceRequestType.BLOGGER]}` && (
        <Field
          inputProps={{maxLength: 100}}
          labelClasses={classNames.label}
          label={'Amazon order ID*'}
          className={classNames.input}
          containerClasses={classNames.numberInputField}
          value={formFields.amazonOrderId}
          onChange={onChangeField('amazonOrderId')}
        />
      )}

      {`${request?.request?.typeTask}` === `${freelanceRequestTypeByKey[freelanceRequestType.BLOGGER]}` && (
        <Field
          labelClasses={classNames.label}
          label={t(TranslationKey['Link to publication']) + '*'}
          // containerClasses={classNames.input}
          inputComponent={
            <div className={classNames.linksWrapper}>
              <div className={classNames.inputWrapper}>
                <Input
                  inputProps={{maxLength: 1500}}
                  value={linkLine}
                  className={classNames.pubInput}
                  onChange={e => setLinkLine(e.target.value)}
                />
                <Button
                  disableElevation
                  disabled={!linkLine || disableFields}
                  className={classNames.button}
                  variant="contained"
                  color="primary"
                  onClick={onClickLinkBtn}
                >
                  {t(TranslationKey.Add)}
                </Button>
              </div>
              {formFields?.publicationLinks?.length ? (
                <div className={classNames.linksSubWrapper}>
                  {formFields?.publicationLinks.map((el, index) => (
                    <div key={index} className={classNames.linkWrapper}>
                      <Link target="_blank" href={el} className={classNames.linkTextWrapper}>
                        <Typography className={classNames.linkText}>{`${index + 1}. ${el}`}</Typography>
                      </Link>

                      <div className={classNames.linksBtnsWrapper}>
                        <CopyValue text={el} />
                        {!disableFields && (
                          <IconButton className={classNames.deleteBtnWrapper} onClick={() => onRemoveLink(index)}>
                            <DeleteOutlineOutlinedIcon className={classNames.deleteBtn} />
                          </IconButton>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          }
        />
      )}

      <Field
        multiline
        // disabled={disableFields}
        containerClasses={classNames.commentFieldWrapper}
        labelClasses={classNames.label}
        className={classNames.commentField}
        inputProps={{maxLength: 255}}
        minRows={4}
        maxRows={4}
        label={t(TranslationKey.Comments)}
        value={formFields.result}
        onChange={onChangeField('result')}
      />

      <div className={classNames.dragAndDropWrapper}>
        <UploadFilesInput
          title={t(TranslationKey.Files)}
          dragAndDropBtnHeight={55}
          images={images}
          setImages={setImages}
          maxNumber={50}
        />
      </div> */}

      {/* <div className={classNames.buttonsWrapper}>
        <Button
          success
          disabled={disabledBtn}
          className={cx(classNames.button)}
          // onClick={() => {
          //   onClickSendAsResult({
          //     message: formFields.result,
          //     files: images,
          //     amazonOrderId: formFields.amazonOrderId,
          //     publicationLinks: formFields.publicationLinks,
          //   })
          // }}
        >
          {t(TranslationKey.Send)}
        </Button>

        <Button
          variant="text"
          className={cx(classNames.button, classNames.cancelButton)}
          // onClick={setOpenModal}
        >
          {t(TranslationKey.Cancel)}
        </Button>
      </div> */}
    </div>
  )
}
