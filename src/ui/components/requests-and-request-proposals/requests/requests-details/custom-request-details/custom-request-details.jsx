import { useEffect, useState } from 'react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Typography } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomTextEditor } from '@components/shared/custom-text-editor'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'

import { t } from '@utils/translations'

import { useStyles } from './custom-request-details.style'

export const CustomSearchRequestDetails = ({ request, isOpen = false }) => {
  const { classes: styles } = useStyles()

  const [showDetails, setShowDetails] = useState(isOpen)

  useEffect(() => setShowDetails(isOpen), [isOpen])

  const onClickToShowDetails = () => {
    setShowDetails(!showDetails)
  }

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
                <Typography className={styles.conditionsSubLabel}>{t(TranslationKey.Files)}</Typography>

                <SlideshowGallery files={request?.request?.media} />
              </div>
            </div>

            <div className={styles.conditionsFieldWrapper}>
              <Typography className={styles.conditionsLabel}>{t(TranslationKey.Description)}</Typography>

              {request?.details?.conditions ? (
                <CustomTextEditor readOnly value={request?.details?.conditions} editorClassName={styles.textEditor} />
              ) : null}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
