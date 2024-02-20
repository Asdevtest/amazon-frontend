import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { ButtonType } from '@typings/types/button.type'

import { useStyles } from './footer.style'

interface FooterProps {}

export const Footer: FC<FooterProps> = memo(() => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.flexContainer}>
      <Button styleType={ButtonType.DANGER}>{t(TranslationKey.Cancel)}</Button>

      <div className={styles.flexContainer}>
        <Button styleType={ButtonType.PRIMARY}>{t(TranslationKey['Send for revision'])}</Button>
        <Button styleType={ButtonType.SUCCESS}>{t(TranslationKey.Receive)}</Button>
      </div>
    </div>
  )
})
