/* eslint-disable import/no-unresolved */
import { cx } from '@emotion/css'
import { useEffect, useState } from 'react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Typography } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomTextEditor } from '@components/shared/custom-text-editor'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'

import { checkIsImageLink } from '@utils/checks'
import { t } from '@utils/translations'

import { useClassNames } from './custom-request-details.style'

export const CustomSearchRequestDetails = ({ request, isOpen = false }) => {
  const { classes: classNames } = useClassNames()

  const [showDetails, setShowDetails] = useState(isOpen)

  useEffect(() => setShowDetails(isOpen), [isOpen])

  const onClickToShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const requestMedia = request?.request?.media?.filter(el => checkIsImageLink(el.fileLink))
  const requestPhotos = requestMedia?.map(el => el.fileLink)
  const requestTitles = requestMedia?.map(el => el.commentByPerformer)
  const requestComments = requestMedia?.map(el => el.commentByClient)
  const requestDocuments = request?.request?.media.map(el => el.fileLink)

  return (
    <div className={classNames.root}>
      <Accordion classes={{ root: classNames.accordion }} expanded={showDetails} onChange={onClickToShowDetails}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classNames.title}>{t(TranslationKey['Detailed application description'])}</Typography>
        </AccordionSummary>

        <AccordionDetails classes={{ root: classNames.details }} style={{ padding: 0 }}>
          <div className={classNames.mainWrapper}>
            <div className={classNames.filesWrapper}>
              <Typography className={classNames.conditionsLabel}>{t(TranslationKey.Files)}</Typography>

              <div className={classNames.conditionsPhotosWraper}>
                <Typography className={classNames.conditionsSubLabel}>{t(TranslationKey.Photos)}</Typography>
                <PhotoAndFilesSlider
                  withoutFiles
                  showPreviews
                  files={requestPhotos}
                  photosTitles={requestTitles}
                  photosComments={requestComments}
                />
              </div>

              <div>
                <Typography className={cx(classNames.conditionsSubLabel, classNames.filesLabel)}>
                  {t(TranslationKey.Files)}
                </Typography>
                <PhotoAndFilesSlider withoutPhotos files={requestDocuments} />
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
