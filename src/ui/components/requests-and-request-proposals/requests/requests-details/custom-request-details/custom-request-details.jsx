/* eslint-disable import/no-unresolved */

/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Typography } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'

import React, { useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomImageGalleryList } from '@components/requests-and-request-proposals/custom-image-gallery-list'
import { CustomTextEditor } from '@components/shared/custom-text-editor'
import { FilesCarousel } from '@components/shared/files-carousel'

import { t } from '@utils/translations'

import { useClassNames } from './custom-request-details.style'

export const CustomSearchRequestDetails = ({ request, isOpen }) => {
  const { classes: classNames } = useClassNames()

  const [showDetails, setShowDetails] = useState(!!isOpen)

  useEffect(() => setShowDetails(isOpen), [isOpen])

  const onClickToShowDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div className={classNames.root}>
      <Accordion
        classes={{ root: classNames.accordion }}
        // style={{borderRadius: '4px', boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)'}}
        expanded={showDetails}
        onChange={onClickToShowDetails}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classNames.title}>{t(TranslationKey['Detailed application description'])}</Typography>
        </AccordionSummary>

        <AccordionDetails classes={{ root: classNames.details }} style={{ padding: 0 }}>
          <div className={classNames.mainWrapper}>
            <div className={classNames.filesWrapper}>
              <Typography className={classNames.conditionsLabel}>{t(TranslationKey.Files)}</Typography>

              <div className={classNames.conditionsPhotosWraper}>
                <Typography className={classNames.conditionsSubLabel}>{t(TranslationKey.Photos)}</Typography>
                <CustomImageGalleryList files={request?.request?.media} />
              </div>

              <div>
                <Typography className={cx(classNames.conditionsSubLabel, classNames.filesLabel)}>
                  {t(TranslationKey.Files)}
                </Typography>
                <FilesCarousel files={request?.request?.media?.map(el => el.fileLink)} />
              </div>
            </div>

            <div className={classNames.conditionsFieldWrapper}>
              <Typography className={classNames.conditionsLabel}>{t(TranslationKey.Description)}</Typography>

              <CustomTextEditor readOnly conditions={request?.details?.conditions} changeConditions={undefined} />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
