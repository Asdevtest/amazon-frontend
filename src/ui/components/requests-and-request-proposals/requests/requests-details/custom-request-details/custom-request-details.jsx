/* eslint-disable import/no-unresolved */
import { useEffect, useState } from 'react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Typography } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomTextEditor } from '@components/shared/custom-text-editor'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'

import { checkIsMediaFileLink } from '@utils/checks'
import { t } from '@utils/translations'

import { useStyles } from './custom-request-details.style'

export const CustomSearchRequestDetails = ({ request, isOpen = false }) => {
  const { classes: styles, cx } = useStyles()

  const [showDetails, setShowDetails] = useState(isOpen)

  useEffect(() => setShowDetails(isOpen), [isOpen])

  const onClickToShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const requestMedia = request?.request?.media?.filter(el => checkIsMediaFileLink(el.fileLink))
  const requestPhotos = requestMedia?.map(el => el.fileLink)
  const requestTitles = requestMedia?.map(el => el.commentByPerformer)
  const requestComments = requestMedia?.map(el => el.commentByClient)
  const requestDocuments = request?.request?.media.map(el => el.fileLink)

  return (
    <div className={styles.root}>
      <Accordion classes={{ root: styles.accordion }} expanded={showDetails} onChange={onClickToShowDetails}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={styles.title}>{t(TranslationKey['Detailed application description'])}</Typography>
        </AccordionSummary>

        <AccordionDetails classes={{ root: styles.details }} style={{ padding: 0 }}>
          <div className={styles.mainWrapper}>
            <div className={styles.filesWrapper}>
              <Typography className={styles.conditionsLabel}>{t(TranslationKey.Files)}</Typography>

              <div className={styles.conditionsPhotosWraper}>
                <Typography className={styles.conditionsSubLabel}>{t(TranslationKey.Photos)}</Typography>
                <PhotoAndFilesSlider
                  withoutFiles
                  showPreviews
                  files={requestPhotos}
                  photosTitles={requestTitles}
                  photosComments={requestComments}
                />
              </div>

              <div>
                <Typography className={cx(styles.conditionsSubLabel, styles.filesLabel)}>
                  {t(TranslationKey.Files)}
                </Typography>
                <PhotoAndFilesSlider withoutPhotos files={requestDocuments} />
              </div>
            </div>

            <div className={styles.conditionsFieldWrapper}>
              <Typography className={styles.conditionsLabel}>{t(TranslationKey.Description)}</Typography>

              <CustomTextEditor readOnly value={request?.details?.conditions} editorClassName={styles.textEditor} />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
