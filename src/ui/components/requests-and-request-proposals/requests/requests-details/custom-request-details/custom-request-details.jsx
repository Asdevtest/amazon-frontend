/* eslint-disable no-unused-vars */
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {TextareaAutosize, Typography} from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'

import React, {useState} from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'
import {Field} from '@components/field/field'

import {t} from '@utils/translations'

import {useClassNames} from './custom-request-details.style'

export const CustomSearchRequestDetails = ({request}) => {
  const {classes: classNames} = useClassNames()

  const [showDetails, setShowDetails] = useState(false)

  const onClickToShowDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div className={classNames.root}>
      <Accordion
        classes={{root: classNames.accordion}}
        style={{borderRadius: '4px', boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)'}}
        expanded={showDetails}
        onChange={onClickToShowDetails}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classNames.title}>{t(TranslationKey['Detailed application description'])}</Typography>
        </AccordionSummary>

        <AccordionDetails classes={{root: classNames.details}} style={{padding: 0}}>
          <div className={classNames.mainWrapper}>
            {/* <Field
              multiline
              labelClasses={classNames.conditionsLabel}
              label={t(TranslationKey.Files)}
              containerClasses={classNames.filesWrapper}
              inputComponent={<PhotoAndFilesCarousel small files={request?.details?.linksToMediaFiles} width="379px" />}
            /> */}

            <div className={classNames.filesWrapper}>
              <Typography className={classNames.conditionsLabel}>{t(TranslationKey.Files)}</Typography>

              <PhotoAndFilesCarousel
                small
                direction="column"
                files={request?.details?.linksToMediaFiles}
                width="379px"
              />
            </div>

            {/* <Field
              multiline
              labelClasses={classNames.conditionsLabel}
              label={t(TranslationKey.Description)}
              containerClasses={classNames.conditionsFieldWrapper}
              inputComponent={
                <TextareaAutosize disabled className={classNames.conditionsField} value={request?.details.conditions} />
              }
            /> */}

            <div className={classNames.conditionsFieldWrapper}>
              <Typography className={classNames.conditionsLabel}>{t(TranslationKey.Description)}</Typography>

              <Typography className={classNames.conditionsField}>{request?.details.conditions}</Typography>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
