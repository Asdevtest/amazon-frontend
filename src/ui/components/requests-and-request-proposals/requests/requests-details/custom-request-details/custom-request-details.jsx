import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'

import React, {useState} from 'react'

import {Link, TextareaAutosize, Typography} from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'

import {TranslationKey} from '@constants/translations/translation-key'

import {Field} from '@components/field/field'
import {BigImagesModal} from '@components/modals/big-images-modal'

import {checkIsImageLink} from '@utils/checks'
import {t} from '@utils/translations'

import {useClassNames} from './custom-request-details.style'

export const CustomSearchRequestDetails = ({request}) => {
  const classNames = useClassNames()

  const [showDetails, setShowDetails] = useState(false)

  const [showImageModal, setShowImageModal] = useState(false)

  const [bigImagesOptions, setBigImagesOptions] = useState({images: [], imgIndex: 0})

  const images = request?.details.linksToMediaFiles.length
    ? request?.details.linksToMediaFiles.filter(el => checkIsImageLink(el))
    : []

  const files = request?.details.linksToMediaFiles.length
    ? request?.details.linksToMediaFiles.filter(el => !checkIsImageLink(el))
    : []

  return (
    <div className={classNames.root}>
      <Accordion
        classes={{root: classNames.accordion}}
        style={{borderRadius: '4px', boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)'}}
        expanded={showDetails}
        onChange={() => setShowDetails(!showDetails)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classNames.title}>{t(TranslationKey['Detailed application description'])}</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <div className={classNames.mainWrapper}>
            {images ? (
              <div className={classNames.photoWrapper}>
                <Field
                  multiline
                  label={t(TranslationKey['Task photos'])}
                  containerClasses={classNames.conditionsFieldWrapper}
                  inputComponent={
                    <Carousel autoPlay={false} timeout={100} animation="fade">
                      {images.map((el, index) => (
                        <div key={index}>
                          <img
                            alt=""
                            className={classNames.imgBox}
                            src={el}
                            onClick={() => {
                              setShowImageModal(!showImageModal)
                              setBigImagesOptions({images, imgIndex: index})
                            }}
                          />
                        </div>
                      ))}
                    </Carousel>
                  }
                />
              </div>
            ) : null}

            {files.length ? (
              <Field
                multiline
                label={t(TranslationKey.Files)}
                containerClasses={classNames.filesContainer}
                inputComponent={
                  <div className={classNames.filesWrapper}>
                    {files.map((file, index) => (
                      <Link key={index} target="_blank" href={file}>
                        <Typography className={classNames.linkText}>{file}</Typography>
                      </Link>
                    ))}
                  </div>
                }
              />
            ) : null}

            <Field
              multiline
              label={t(TranslationKey.Description)}
              containerClasses={classNames.conditionsFieldWrapper}
              inputComponent={
                <TextareaAutosize disabled className={classNames.conditionsField} value={request?.details.conditions} />
              }
            />
          </div>
        </AccordionDetails>
      </Accordion>

      <BigImagesModal
        isAmazone
        openModal={showImageModal}
        setOpenModal={() => setShowImageModal(!showImageModal)}
        images={bigImagesOptions.images}
        imgIndex={bigImagesOptions.imgIndex}
      />
    </div>
  )
}
