import { useEffect, useState } from 'react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
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
    <Accordion classes={{ root: styles.accordion }} expanded={showDetails} onChange={onClickToShowDetails}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <p className={styles.title}>{t(TranslationKey['Detailed application description'])}</p>
      </AccordionSummary>

      <AccordionDetails>
        <div className={styles.mainWrapper}>
          <div className={styles.filesWrapper}>
            <p className={styles.title}>{t(TranslationKey.Files)}</p>

            <SlideshowGallery slidesToShow={2} files={request?.request?.media} />
          </div>

          <div className={styles.filesWrapper}>
            <p className={styles.title}>{t(TranslationKey.Description)}</p>

            {request?.details?.conditions ? (
              <CustomTextEditor
                readOnly
                value={request?.details?.conditions}
                editorWrapperClassName={styles.editorWrapper}
              />
            ) : null}
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  )
}
