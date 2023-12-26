import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ShareIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './footer.style'

interface FooterProps {
  onClickOpenNewTab: () => void
}

export const Footer: FC<FooterProps> = memo(({ onClickOpenNewTab }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.footer}>
      <button className={styles.linkToNewTab} onClick={onClickOpenNewTab}>
        <ShareIcon />
      </button>

      {/* Change button after refactor button */}
      <button className={styles.button}>{t(TranslationKey['Cancel order'])}</button>
    </div>
  )
})
