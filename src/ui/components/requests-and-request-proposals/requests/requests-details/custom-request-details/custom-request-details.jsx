import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'

import React, {useState} from 'react'

import {TextareaAutosize, Typography} from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'

import {TranslationKey} from '@constants/translations/translation-key'

import {Field} from '@components/field/field'
import {BigImagesModal} from '@components/modals/big-images-modal'

import {t} from '@utils/translations'

import {useClassNames} from './custom-request-details.style'

export const CustomSearchRequestDetails = ({request}) => {
  const classNames = useClassNames()

  const [showDetails, setShowDetails] = useState(false)

  const [showImageModal, setShowImageModal] = useState(false)

  const [bigImagesOptions, setBigImagesOptions] = useState({images: [], imgIndex: 0})

  return (
    <div className={classNames.root}>
      <Accordion
        classes={{root: classNames.accordion}}
        expanded={showDetails}
        onChange={() => setShowDetails(!showDetails)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classNames.title}>{t(TranslationKey['Detailed application description'])}</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <div className={classNames.mainWrapper}>
            {request?.details.linksToMediaFiles.length ? (
              <div className={classNames.photoWrapper}>
                <Field
                  multiline
                  label={t(TranslationKey['Task photos'])}
                  containerClasses={classNames.conditionsFieldWrapper}
                  inputComponent={
                    <Carousel autoPlay={false} timeout={100} animation="fade">
                      {request.details.linksToMediaFiles.map((el, index) => (
                        <div key={index}>
                          <img
                            alt=""
                            className={classNames.imgBox}
                            src={el}
                            onClick={() => {
                              setShowImageModal(!showImageModal)
                              setBigImagesOptions({images: request.details.linksToMediaFiles, imgIndex: index})
                            }}
                          />
                        </div>
                      ))}
                    </Carousel>
                  }
                />
              </div>
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
