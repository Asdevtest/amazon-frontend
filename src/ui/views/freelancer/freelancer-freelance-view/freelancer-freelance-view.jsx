import { memo } from 'react'
import { Link } from 'react-router-dom'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { useStyles } from './freelancer-freelance-view.style'

import { renderData } from './render-data'

export const FreelancerFreelanceView = memo(() => {
  const { classes: styles } = useStyles()

  return (
    <>
      <p className={styles.title}>{t(TranslationKey['Choose a section in Freelance'])}</p>

      <div className={styles.btnsWrapper}>
        {renderData.map(item => (
          <Link key={item.text} to={item.link}>
            <CustomButton variant="outlined">{t(TranslationKey[item.text])}</CustomButton>
          </Link>
        ))}
      </div>
    </>
  )
})
