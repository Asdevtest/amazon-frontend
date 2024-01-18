import { memo } from 'react'
import { Link } from 'react-router-dom'

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useStyles } from './freelancer-freelance-view.style'

import { renderData } from './render-data'

export const FreelancerFreelanceView = memo(() => {
  const { classes: styles } = useStyles()

  return (
    <div>
      <p className={styles.title}>{t(TranslationKey['Choose a section in Freelance'])}</p>

      <div className={styles.btnsWrapper}>
        {renderData.map(item => (
          <Link key={item.text} to={item.link}>
            <Button className={styles.button} color="primary" variant="outlined">
              <p>{t(TranslationKey[item.text])}</p>
              <ArrowRightAltIcon className={styles.primary} />
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
})
